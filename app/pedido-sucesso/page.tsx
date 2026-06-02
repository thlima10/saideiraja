"use client";

import Header from "@/components/Header";
import { useMockStore } from "@/components/MockStoreProvider";
import Link from "next/link";

export default function PedidoSucessoPage() {
  const { ultimoPedido } = useMockStore();

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Pedido recebido com sucesso!"
        subtitle="Sua adega j\u00e1 recebeu o pedido."
        actionHref="/meus-pedidos"
        actionLabel="Pedidos"
      />

      <section className="mx-auto max-w-3xl p-6">
        <div className="rounded-xl bg-white p-6 text-center shadow">
          <p className="text-5xl">{"\u2705"}</p>
          <h2 className="mt-4 text-2xl font-bold">
            Pedido {ultimoPedido?.numero ?? "#1004"}
          </h2>
          <p className="mt-2 font-bold text-orange-600">
            Status: {ultimoPedido?.status ?? "Novo"}
          </p>
          <p className="mt-2 text-gray-500">
            Sua adega est\u00e1 preparando a confirma\u00e7\u00e3o do pedido.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/meus-pedidos"
              className="rounded-lg bg-orange-500 px-5 py-3 font-bold text-white"
            >
              Acompanhar pedido
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-orange-500 px-5 py-3 font-bold text-orange-600"
            >
              Voltar para home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
