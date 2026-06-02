"use client";

import Header from "@/components/Header";
import { useMockStore } from "@/components/MockStoreProvider";
import { formatarMoeda } from "@/src/data/mock";
import Link from "next/link";

export default function CarrinhoPage() {
  const { carrinho, adicionarAoCarrinho, removerDoCarrinho } = useMockStore();
  const totalPedido = carrinho.reduce(
    (total, item) => total + item.quantidade * item.produto.preco,
    0,
  );

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Meu Carrinho"
        subtitle="Confira seus produtos antes de finalizar"
        backHref="/"
      />

      <section className="mx-auto max-w-6xl p-6">
        <div className="overflow-hidden rounded-xl bg-white shadow">
          {carrinho.length === 0 ? (
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold">Seu carrinho est\u00e1 vazio</h2>
              <p className="mt-2 text-gray-500">
                Adicione produtos em uma adega para simular o pedido.
              </p>
              <Link
                href="/"
                className="mt-5 inline-block rounded-lg bg-orange-500 px-5 py-3 font-bold text-white"
              >
                Ver adegas
              </Link>
            </div>
          ) : (
            <>
              <div className="hidden grid-cols-5 gap-4 border-b border-gray-200 bg-gray-50 p-5 font-bold text-gray-700 md:grid">
                <span>Produto</span>
                <span className="text-center">Quantidade</span>
                <span className="text-right">Valor unit\u00e1rio</span>
                <span className="text-right">Total</span>
                <span className="text-right">A\u00e7\u00f5es</span>
              </div>

              <div className="divide-y divide-gray-200">
                {carrinho.map((item) => {
                  const subtotal = item.quantidade * item.produto.preco;

                  return (
                    <div
                      key={item.produto.id}
                      className="grid gap-3 p-5 md:grid-cols-5 md:items-center md:gap-4"
                    >
                      <p className="font-bold text-gray-900">
                        {item.produto.emoji} {item.produto.nome}
                      </p>
                      <p className="text-gray-700 md:text-center">
                        Quantidade: {item.quantidade}
                      </p>
                      <p className="text-right font-bold text-orange-600">
                        {formatarMoeda(item.produto.preco)}
                      </p>
                      <p className="text-right text-lg font-bold text-orange-600">
                        {formatarMoeda(subtotal)}
                      </p>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => removerDoCarrinho(item.produto.id)}
                          className="rounded-lg border border-orange-500 px-3 py-2 font-bold text-orange-600"
                        >
                          -
                        </button>
                        <button
                          onClick={() => adicionarAoCarrinho(item.produto.id)}
                          className="rounded-lg bg-orange-500 px-3 py-2 font-bold text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {carrinho.length > 0 && (
          <div className="mt-6 rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xl font-bold">Total do pedido</span>
              <span className="text-2xl font-bold text-orange-600">
                {formatarMoeda(totalPedido)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-lg bg-orange-500 px-4 py-3 text-center font-bold text-white transition hover:bg-orange-600"
            >
              Finalizar Pedido
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
