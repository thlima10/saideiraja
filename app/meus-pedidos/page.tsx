"use client";

import Header from "@/components/Header";
import { useMockStore } from "@/components/MockStoreProvider";
import OrderCard from "@/components/OrderCard";

export default function MeusPedidosPage() {
  const { pedidos } = useMockStore();

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Meus pedidos"
        subtitle="Hist\u00f3rico de compras e status atual"
        backHref="/minha-conta"
      />

      <section className="mx-auto grid max-w-4xl gap-4 p-6">
        {pedidos.map((pedido) => (
          <OrderCard key={pedido.numero} pedido={pedido} />
        ))}
      </section>
    </main>
  );
}
