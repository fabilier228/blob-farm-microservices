FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY public ./public
COPY src ./src
COPY next.config.mjs ./
COPY postcss.config.mjs ./

RUN NEXT_TELEMETRY_DISABLED=1 npm run build


FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

ENV PORT=3001
EXPOSE ${PORT}

CMD ["node", "server.js"]
