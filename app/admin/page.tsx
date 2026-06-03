"use client";

import AdminCard from "@/components/AdminCard";
import { useMockStore } from "@/components/MockStoreProvider";
import { formatarMoeda } from "@/src/data/mock";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AUTH_KEY = "saideira_admin_auth";

const menuItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Adegas", href: "/admin/adegas" },
  { label: "Nova Adega", href: "/admin/adegas/nova" },
  { label: "Usuários", href: "/admin/usuarios" },
  { label: "Pedidos", href: "/gestao/pedidos" },
  { label: "Voltar para o site", href: "/" },
];

const quickActions = [
  {
    title: "Cadastrar nova adega",
    description: "Adicionar uma loja parceira ao marketplace.",
    href: "/admin/adegas/nova",
  },
  {
    title: "Criar acesso para adega",
    description: "Cadastrar usuário e senha para operadores.",
    href: "/admin/usuarios",
  },
  {
    title: "Ver pedidos",
    description: "Acompanhar o histórico operacional.",
    href: "/gestao/pedidos",
  },
  {
    title: "Ver site do cliente",
    description: "Abrir a experiência pública da Saideira Já.",
    href: "/",
  },
];

export default function AdminPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { adegas, pedidos } = useMockStore();
  const pedidosPendentes = pedidos.filter(
    (pedido) => pedido.status === "Novo" || pedido.status === "Em preparo",
  ).length;
  const faturamentoEstimado = pedidos.reduce(
    (total, pedido) => total + pedido.valor,
    0,
  );

  const sair = () => {
    localStorage.removeItem(AUTH_KEY);
    router.replace("/login");
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <button
        type="button"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Abrir menu administrativo"
        className="fixed left-4 top-4 z-40 rounded-lg bg-white px-4 py-3 text-2xl font-bold text-orange-600 shadow transition hover:bg-orange-50"
      >
        ☰
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-gray-900/40"
          />

          <aside className="relative flex h-full w-[min(86vw,320px)] flex-col bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
                  Saideira Já
                </p>
                <h2 className="mt-1 text-xl font-bold">Área administrativa</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Fechar menu administrativo"
                className="rounded-lg border border-gray-200 px-3 py-2 font-bold text-gray-600 transition hover:bg-gray-100"
              >
                X
              </button>
            </div>

            <nav className="mt-8 grid gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-4 py-3 font-bold text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              onClick={sair}
              className="mt-auto rounded-lg bg-orange-500 px-4 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              Sair
            </button>
          </aside>
        </div>
      )}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-24 md:pt-20">
          <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
            Admin Saideira Já
          </p>
          <div className="mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-4xl font-bold">Dashboard Administrativo</h1>
              <p className="mt-2 max-w-2xl text-gray-500">
                Visão geral da operação Saideira Já
              </p>
            </div>

            <Link
              href="/gestao/pedidos"
              className="w-fit rounded-lg bg-orange-500 px-5 py-3 font-bold text-white shadow transition hover:bg-orange-600"
            >
              Ver pedidos
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AdminCard title="Adegas cadastradas" value={`${adegas.length}`} />
          <AdminCard title="Pedidos de hoje" value={`${pedidos.length}`} />
          <AdminCard
            title="Faturamento estimado"
            value={formatarMoeda(faturamentoEstimado)}
          />
          <AdminCard title="Pedidos pendentes" value={`${pedidosPendentes}`} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-gray-100 pb-4 md:flex-row md:items-end">
              <div>
                <h2 className="text-2xl font-bold">Últimos pedidos</h2>
                <p className="mt-1 text-gray-500">
                  Pedidos criados no checkout aparecem aqui automaticamente.
                </p>
              </div>
              <Link
                href="/gestao/pedidos"
                className="text-sm font-bold text-orange-600 transition hover:text-orange-700"
              >
                Ver todos
              </Link>
            </div>

            <div className="mt-5 grid gap-3">
              {pedidos.slice(0, 5).map((pedido) => (
                <div
                  key={pedido.numero}
                  className="grid gap-3 rounded-lg border border-gray-200 p-4 md:grid-cols-[110px_1fr_1fr_120px_120px] md:items-center"
                >
                  <p className="font-bold text-orange-600">{pedido.numero}</p>
                  <p className="font-bold">{pedido.cliente}</p>
                  <p className="text-gray-500">{pedido.adega}</p>
                  <p className="font-bold">{formatarMoeda(pedido.valor)}</p>
                  <p className="text-gray-500">{pedido.status}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Ações rápidas</h2>
            <p className="mt-1 text-gray-500">
              Atalhos para as principais tarefas administrativas.
            </p>

            <div className="mt-5 grid gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="rounded-lg border border-gray-200 p-4 transition hover:border-orange-300 hover:bg-orange-50"
                >
                  <p className="font-bold text-gray-900">{action.title}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {action.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
