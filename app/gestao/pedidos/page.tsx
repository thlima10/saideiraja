"use client";

import { useMockStore } from "@/components/MockStoreProvider";
import { formatarMoeda, type OrderStatus } from "@/src/data/mock";
import { useState } from "react";

const statusFiltros: OrderStatus[] = [
  "Novo",
  "Em preparo",
  "Saiu para entrega",
  "Entregue",
  "Cancelado",
];

const statusClasses: Record<OrderStatus, string> = {
  Novo: "bg-orange-100 text-orange-700",
  "Em preparo": "bg-blue-100 text-blue-700",
  "Saiu para entrega": "bg-purple-100 text-purple-700",
  Entregue: "bg-green-100 text-green-700",
  Cancelado: "bg-red-100 text-red-700",
};

export default function GestaoPedidosPage() {
  const { pedidos } = useMockStore();
  const [statusSelecionado, setStatusSelecionado] =
    useState<OrderStatus>("Novo");

  const pedidosFiltrados = pedidos.filter(
    (pedido) => pedido.status === statusSelecionado,
  );

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
            Painel administrativo
          </p>
          <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-bold">Gest\u00e3o de Pedidos</h1>
              <p className="mt-2 text-gray-500">
                Acompanhe pedidos, clientes, adegas e status em tempo real.
              </p>
            </div>

            <div className="rounded-xl bg-orange-500 px-5 py-3 text-white shadow">
              <p className="text-sm text-white/80">Pedidos filtrados</p>
              <p className="text-2xl font-bold">{pedidosFiltrados.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        <div className="grid gap-4 md:grid-cols-5">
          {statusFiltros.map((status) => {
            const total = pedidos.filter((pedido) => pedido.status === status).length;
            const ativo = statusSelecionado === status;

            return (
              <button
                key={status}
                onClick={() => setStatusSelecionado(status)}
                className={`rounded-xl border p-4 text-left shadow-sm transition ${
                  ativo
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-orange-300"
                }`}
              >
                <span className="text-sm font-bold">{status}</span>
                <span className="mt-3 block text-3xl font-bold">{total}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 overflow-hidden rounded-xl bg-white shadow">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="text-xl font-bold">Pedidos</h2>
            <p className="mt-1 text-sm text-gray-500">
              Filtro atual: {statusSelecionado}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-gray-50 text-sm text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-bold">N\u00famero do Pedido</th>
                  <th className="px-5 py-4 font-bold">Cliente</th>
                  <th className="px-5 py-4 font-bold">Telefone</th>
                  <th className="px-5 py-4 font-bold">Adega</th>
                  <th className="px-5 py-4 font-bold">Valor</th>
                  <th className="px-5 py-4 font-bold">Status</th>
                  <th className="px-5 py-4 font-bold">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pedidosFiltrados.map((pedido) => (
                  <tr key={pedido.numero} className="hover:bg-orange-50/50">
                    <td className="px-5 py-4 font-bold text-gray-900">
                      {pedido.numero}
                    </td>
                    <td className="px-5 py-4">{pedido.cliente}</td>
                    <td className="px-5 py-4 text-gray-600">
                      {pedido.telefone}
                    </td>
                    <td className="px-5 py-4 text-gray-600">{pedido.adega}</td>
                    <td className="px-5 py-4 font-bold text-orange-600">
                      {formatarMoeda(pedido.valor)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-bold ${statusClasses[pedido.status]}`}
                      >
                        {pedido.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{pedido.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
