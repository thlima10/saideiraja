"use client";

import Header from "@/components/Header";
import { useMockStore } from "@/components/MockStoreProvider";
import StatusBadge from "@/components/StatusBadge";
import { formatarMoeda, type OrderStatus } from "@/src/data/mock";

const acoes: { label: string; status: OrderStatus }[] = [
  { label: "Aceitar pedido", status: "Novo" },
  { label: "Marcar como em preparo", status: "Em preparo" },
  { label: "Marcar como saiu para entrega", status: "Saiu para entrega" },
  { label: "Marcar como entregue", status: "Entregue" },
  { label: "Cancelar", status: "Cancelado" },
];

export default function AdegaPedidosPage() {
  const { pedidos, atualizarStatusPedido } = useMockStore();

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Pedidos recebidos"
        subtitle="Atualize o status dos pedidos da adega"
        backHref="/adega-dashboard"
        actionHref="/adega-dashboard/produtos"
        actionLabel="Produtos"
      />

      <section className="mx-auto grid max-w-6xl gap-4 p-6">
        {pedidos.map((pedido) => (
          <div key={pedido.numero} className="rounded-xl bg-white p-6 shadow">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
              <div>
                <p className="font-bold text-orange-600">{pedido.numero}</p>
                <h2 className="text-2xl font-bold">{pedido.cliente}</h2>
                <p className="text-gray-500">{pedido.telefone}</p>
                <p className="text-gray-500">{pedido.endereco}</p>
              </div>
              <StatusBadge status={pedido.status} />
            </div>

            <div className="mt-5 grid gap-2 text-gray-700 md:grid-cols-3">
              <p>Itens: {pedido.itens.join(", ")}</p>
              <p>Pagamento: {pedido.pagamento}</p>
              <p className="font-bold text-orange-600">
                Valor: {formatarMoeda(pedido.valor)}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {acoes.map((acao) => (
                <button
                  key={acao.label}
                  onClick={() => atualizarStatusPedido(pedido.numero, acao.status)}
                  className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  {acao.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
