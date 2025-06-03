import Link from "next/link";
import Backend2Button from "./components/Backend2Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 text-white p-8">
      <h1 className="text-5xl font-extrabold mb-6">👋 Witaj w Blob Farm!</h1>
      <p className="text-lg mb-8">Kliknij poniżej aby przejść do swojej farmy blobów.</p>
      <div className="flex flex-col gap-8 items-center">
        <Link
          href="/main"
          className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow-lg hover:bg-indigo-50 transition"
        >
          Przejdź do Farmy Blobów 🌱
        </Link>
        <Backend2Button />
      </div>
    </main>
  );
}
