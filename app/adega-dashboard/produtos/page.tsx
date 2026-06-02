"use client";

import Header from "@/components/Header";
import { useMockStore } from "@/components/MockStoreProvider";
import ProductCard from "@/components/ProductCard";
import { formatarMoeda } from "@/src/data/mock";
import { FormEvent } from "react";

export default function AdegaProdutosPage() {
  const {
    produtos,
    adicionarProduto: adicionarProdutoNaStore,
    removerProduto,
  } = useMockStore();

  const handleAdicionarProduto = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    adicionarProdutoNaStore({
      nome: String(form.get("nome") || "Novo produto"),
      categoria: String(form.get("categoria") || "Geral"),
      preco: Number(form.get("preco") || 0),
      estoque: Number(form.get("estoque") || 0),
      ativo: form.get("ativo") === "Sim",
      emoji: String(form.get("emoji") || "\u{1F37A}"),
      imageUrl: String(form.get("imageUrl") || "/images/produto-padrao.jpg"),
    });

    event.currentTarget.reset();
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Meus produtos"
        subtitle="Cadastre e gerencie o card\u00e1pio da adega"
        backHref="/adega-dashboard"
        actionHref="/adega-dashboard/pedidos"
        actionLabel="Pedidos"
      />

      <section className="mx-auto grid max-w-6xl gap-6 p-6 lg:grid-cols-[380px_1fr]">
        <form onSubmit={handleAdicionarProduto} className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-5 text-2xl font-bold">Adicionar produto</h2>
          <div className="grid gap-4">
            <input name="nome" required placeholder="Nome do produto" className="rounded-xl border border-gray-300 p-4" />
            <input name="categoria" required placeholder="Categoria" className="rounded-xl border border-gray-300 p-4" />
            <input name="preco" required type="number" step="0.01" placeholder="Pre\u00e7o" className="rounded-xl border border-gray-300 p-4" />
            <input name="estoque" required type="number" placeholder="Estoque" className="rounded-xl border border-gray-300 p-4" />
            <select name="ativo" className="rounded-xl border border-gray-300 p-4">
              <option>Sim</option>
              <option>N\u00e3o</option>
            </select>
            <input name="emoji" placeholder="Emoji ou imagem simples" className="rounded-xl border border-gray-300 p-4" />
            <input
              name="imageUrl"
              placeholder="/images/heineken.jpg"
              className="rounded-xl border border-gray-300 p-4"
            />
          </div>
          <button className="mt-5 w-full rounded-lg bg-orange-500 px-4 py-3 font-bold text-white">
            Adicionar produto
          </button>
        </form>

        <div className="grid gap-5 md:grid-cols-2">
          {produtos.map((produto) => (
            <ProductCard key={produto.id} produto={produto}>
              <div className="grid gap-2 text-sm text-gray-600 md:grid-cols-2">
                <p>Categoria: {produto.categoria}</p>
                <p>Pre\u00e7o: {formatarMoeda(produto.preco)}</p>
                <p>Estoque: {produto.estoque}</p>
                <p>Status: {produto.ativo ? "ativo" : "inativo"}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="rounded-lg border border-orange-500 px-4 py-2 font-bold text-orange-600">
                  Editar
                </button>
                <button
                  onClick={() => removerProduto(produto.id)}
                  className="rounded-lg bg-red-500 px-4 py-2 font-bold text-white"
                >
                  Remover
                </button>
              </div>
            </ProductCard>
          ))}
        </div>
      </section>
    </main>
  );
}
