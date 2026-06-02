"use client";

import Header from "@/components/Header";
import { useMockStore } from "@/components/MockStoreProvider";
import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";
import { useState } from "react";

const categorias = [
  "Todos",
  "Cervejas",
  "Destilados",
  "Gelo",
  "Carv\u00e3o",
  "Refrigerantes",
  "Energ\u00e9ticos",
  "Snacks",
];

export default function AdegaPage() {
  const params = useParams<{ id: string }>();
  const { adegas, produtos, carrinho, adicionarAoCarrinho } = useMockStore();
  const adega = adegas.find((item) => item.id === Number(params.id)) ?? adegas[0];
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const totalItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0,
  );
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const produtosFiltrados = produtos.filter((produto) => {
    const matchesCategory =
      selectedCategory === "Todos" || produto.categoria === selectedCategory;
    const matchesSearch = produto.nome.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="relative">
        <Header
          title={adega.nome}
          subtitle={`${"\u2B50"} ${adega.avaliacao} ${"\u2022"} ${"\u{1F69A}"} Entrega em ${adega.entrega}`}
          backHref="/"
        />
        {totalItens > 0 && (
          <span className="absolute right-8 top-6 rounded-full bg-gray-900 px-2 py-0.5 text-xs font-bold text-white">
            {totalItens}
          </span>
        )}
      </div>

      <section className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-2xl font-bold">Produtos</h2>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              type="text"
              placeholder="Buscar produto"
              className="w-full rounded-xl border border-gray-300 bg-white p-4 md:max-w-sm"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {categorias.map((categoria) => {
              const isSelected = selectedCategory === categoria;

              return (
                <button
                  key={categoria}
                  onClick={() => setSelectedCategory(categoria)}
                  className={`whitespace-nowrap rounded-full border px-5 py-3 font-bold transition ${
                    isSelected
                      ? "border-orange-500 bg-orange-500 text-white shadow"
                      : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-600"
                  }`}
                >
                  {categoria}
                </button>
              );
            })}
          </div>
        </div>

        {produtosFiltrados.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {produtosFiltrados.map((produto) => (
              <ProductCard
                key={produto.id}
                produto={produto}
                onAdd={() => adicionarAoCarrinho(produto.id)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white p-8 text-center shadow">
            <h3 className="text-xl font-bold">
              Nenhum produto encontrado nessa categoria.
            </h3>
            <p className="mt-2 text-gray-500">
              Tente selecionar outra categoria ou alterar a busca.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
