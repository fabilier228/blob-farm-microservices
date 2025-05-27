FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY server.js ./

# --- PRODUCTION STAGE ---
FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache curl

COPY --from=builder /app/node_modules ./node_modules

COPY server.js ./

ENV PORT=3000

EXPOSE ${PORT}

CMD ["node", "server.js"]