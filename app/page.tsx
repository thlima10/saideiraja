"use client";

import Header from "@/components/Header";
import { useMockStore } from "@/components/MockStoreProvider";
import StoreCard from "@/components/StoreCard";
import Link from "next/link";

const categorias = [
  { nome: "Cervejas", cor: "bg-orange-500", emoji: "\u{1F37A}" },
  { nome: "Destilados", cor: "bg-red-500", emoji: "\u{1F943}" },
  { nome: "Gelo", cor: "bg-blue-500", emoji: "\u{1F9CA}" },
  { nome: "Carv\u00e3o", cor: "bg-gray-800", emoji: "\u{1F525}" },
  { nome: "Refrigerantes", cor: "bg-green-600", emoji: "\u{1F964}" },
];

export default function Home() {
  const { adegas } = useMockStore();

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="mx-auto max-w-6xl p-6">
        <div className="mb-8 flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            placeholder={"O que voc\u00ea quer beber hoje?"}
            className="flex-1 rounded-xl border border-gray-300 bg-white p-4 text-lg"
          />
          <Link
            href="/minha-conta"
            className="rounded-xl bg-white px-5 py-4 text-center font-bold text-orange-600 shadow"
          >
            Minha conta
          </Link>
        </div>

        <h2 className="mb-4 text-2xl font-bold">Categorias</h2>
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-5">
          {categorias.map((categoria) => (
            <div
              key={categoria.nome}
              className={`${categoria.cor} rounded-xl p-6 text-center font-bold text-white`}
            >
              {categoria.emoji} {categoria.nome}
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold">
          Adegas Pr{"\u00f3"}ximas
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {adegas.map((adega) => (
            <StoreCard key={adega.id} adega={adega} />
          ))}
        </div>
      </section>
    </main>
  );
}
