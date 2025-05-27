"use client";

import { useEffect, useState } from "react";

export default function BlobFarm() {
  const [blobs, setBlobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlobs = () => {
    fetch("http://localhost:3000/get-blobs")
      .then((res) => res.json())
      .then((data) => {
        setBlobs(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlobs();
  }, []);

  const handleCreateBlob = (e) => {
    e.preventDefault();
    console.log("coistam");
    

    if (!name || !content) return alert("Uzupełnij wszystkie pola!");

    fetch("http://localhost:3000/create-blob", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, content }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Błąd dodawania bloba");
        return res.json();
      })
      .then(() => {
        setName("");
        setContent("");
        fetchBlobs();
      })
      .catch((err) => alert(err.message));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">🌿 Moja Farma Blobów</h1>

      {/* Formularz */}
      <form
        onSubmit={handleCreateBlob}
        className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg mb-10 text-gray-800"
      >
        <h2 className="text-2xl font-semibold mb-4">Dodaj nowego bloba</h2>
        <input
          type="text"
          placeholder="Nazwa bloba"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none"
        />
        <textarea
          placeholder="Treść bloba"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none"
          rows="3"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Dodaj Bloba 🚀
        </button>
      </form>

      {loading ? (
        <p className="text-center text-xl">Ładowanie blobów...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blobs.map((blob) => (
            <div
              key={blob.id}
              className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between"
            >
              <h2 className="text-2xl font-semibold mb-2">{blob.name}</h2>
              <p className="text-sm text-gray-600 mb-4">{blob.content}</p>
              <span className="text-xs text-gray-500">
                {new Date(blob.created_at).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
