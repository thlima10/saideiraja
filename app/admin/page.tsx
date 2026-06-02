"use client";

import AdminCard from "@/components/AdminCard";
import Header from "@/components/Header";
import { useMockStore } from "@/components/MockStoreProvider";
import { formatarMoeda } from "@/src/data/mock";
import Link from "next/link";

export default function AdminPage() {
  const { adegas, pedidos } = useMockStore();
  const pedidosPendentes = pedidos.filter(
    (pedido) => pedido.status === "Novo" || pedido.status === "Em preparo",
  ).length;
  const totalVendido = pedidos.reduce((total, pedido) => total + pedido.valor, 0);

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Admin Saideira J\u00e1"
        subtitle="Vis\u00e3o geral da opera\u00e7\u00e3o"
        backHref="/"
        actionHref="/gestao/pedidos"
        actionLabel="Pedidos"
      />

      <section className="mx-auto max-w-6xl p-6">
        <div className="grid gap-4 md:grid-cols-4">
          <AdminCard title="Adegas cadastradas" value={`${adegas.length}`} />
          <AdminCard title="Total de pedidos" value={`${pedidos.length}`} />
          <AdminCard title="Vendido hoje" value={formatarMoeda(totalVendido)} />
          <AdminCard title="Pedidos pendentes" value={`${pedidosPendentes}`} />
        </div>

        <h2 className="mb-4 mt-10 text-2xl font-bold">Navega\u00e7\u00e3o</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <AdminCard
            title="Adegas"
            description="Ver lojas cadastradas"
            href="/admin/adegas"
          />
          <AdminCard
            title="Criar nova adega"
            description="Cadastrar parceiro"
            href="/admin/adegas/nova"
          />
          <AdminCard
            title="Usu\u00e1rios/acessos"
            description="Gerenciar logins"
            href="/admin/usuarios"
          />
          <AdminCard
            title="Pedidos"
            description="Painel operacional"
            href="/gestao/pedidos"
          />
        </div>

        <div className="mt-10 rounded-xl bg-white p-6 shadow">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Adegas no marketplace</h2>
              <p className="mt-1 text-gray-500">
                Lista conectada ao mock central em estado local.
              </p>
            </div>
            <Link
              href="/admin/adegas/nova"
              className="rounded-lg bg-orange-500 px-4 py-2 font-bold text-white"
            >
              Nova adega
            </Link>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {adegas.map((adega) => (
              <div key={adega.id} className="rounded-xl border border-gray-200 p-4">
                <p className="font-bold">{adega.nome}</p>
                <p className="text-sm text-gray-500">
                  {adega.bairro} - {adega.cidade}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-xl bg-white p-6 shadow">
          <h2 className="text-2xl font-bold">Pedidos recentes</h2>
          <p className="mt-1 text-gray-500">
            Pedidos criados no checkout aparecem aqui automaticamente.
          </p>

          <div className="mt-5 grid gap-3">
            {pedidos.slice(0, 5).map((pedido) => (
              <div
                key={pedido.numero}
                className="grid gap-2 rounded-xl border border-gray-200 p-4 md:grid-cols-5 md:items-center"
              >
                <p className="font-bold text-orange-600">{pedido.numero}</p>
                <p>{pedido.cliente}</p>
                <p className="text-gray-500">{pedido.adega}</p>
                <p className="font-bold">{formatarMoeda(pedido.valor)}</p>
                <p className="text-gray-500">{pedido.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
