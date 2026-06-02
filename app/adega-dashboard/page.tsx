"use client";

import AdminCard from "@/components/AdminCard";
import Header from "@/components/Header";
import { useMockStore } from "@/components/MockStoreProvider";
import { formatarMoeda } from "@/src/data/mock";

export default function AdegaDashboardPage() {
  const { adegas, pedidos, produtos } = useMockStore();
  const pedidosPendentes = pedidos.filter((pedido) => pedido.status === "Novo").length;
  const faturamento = pedidos.reduce((total, pedido) => total + pedido.valor, 0);
  const produtosAtivos = produtos.filter((produto) => produto.ativo).length;

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Adega dos Altos"
        subtitle="Dashboard da adega"
        backHref="/"
        actionHref="/adega-dashboard/pedidos"
        actionLabel="Pedidos"
      />

      <section className="mx-auto max-w-6xl p-6">
        <div className="grid gap-4 md:grid-cols-4">
          <AdminCard title="Pedidos de hoje" value={`${pedidos.length}`} />
          <AdminCard title="Faturamento estimado" value={formatarMoeda(faturamento)} />
          <AdminCard title="Produtos ativos" value={`${produtosAtivos}`} />
          <AdminCard title="Pedidos pendentes" value={`${pedidosPendentes}`} />
        </div>

        <h2 className="mb-4 mt-10 text-2xl font-bold">Atalhos</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <AdminCard title="Meus produtos" description="Cadastrar e gerenciar estoque" href="/adega-dashboard/produtos" />
          <AdminCard title="Pedidos recebidos" description="Atualizar status dos pedidos" href="/adega-dashboard/pedidos" />
          <AdminCard title="Hist\u00f3rico de pedidos" description="Consultar entregas anteriores" href="/adega-dashboard/pedidos" />
        </div>

        <div className="mt-10 rounded-xl bg-white p-6 shadow">
          <h2 className="text-2xl font-bold">Adegas conectadas ao mock</h2>
          <p className="mt-1 text-gray-500">
            As adegas cadastradas no admin tamb\u00e9m aparecem aqui.
          </p>
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
      </section>
    </main>
  );
}
