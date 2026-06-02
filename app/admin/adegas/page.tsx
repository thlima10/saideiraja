"use client";

import Header from "@/components/Header";
import { useMockStore } from "@/components/MockStoreProvider";
import StatusBadge from "@/components/StatusBadge";
import Link from "next/link";

export default function AdminAdegasPage() {
  const { adegas } = useMockStore();

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Adegas cadastradas"
        subtitle="Gerencie lojas parceiras do marketplace"
        backHref="/admin"
        actionHref="/admin/adegas/nova"
        actionLabel="Nova"
      />

      <section className="mx-auto max-w-6xl p-6">
        <div className="overflow-hidden rounded-xl bg-white shadow">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-gray-50 text-sm text-gray-500">
                <tr>
                  <th className="px-5 py-4">Nome da adega</th>
                  <th className="px-5 py-4">Bairro</th>
                  <th className="px-5 py-4">Cidade</th>
                  <th className="px-5 py-4">WhatsApp</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">A\u00e7\u00f5es</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {adegas.map((adega) => (
                  <tr key={adega.id} className="hover:bg-orange-50/50">
                    <td className="px-5 py-4 font-bold">{adega.nome}</td>
                    <td className="px-5 py-4 text-gray-600">{adega.bairro}</td>
                    <td className="px-5 py-4 text-gray-600">{adega.cidade}</td>
                    <td className="px-5 py-4 text-gray-600">
                      {adega.whatsapp}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={adega.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/adega/${adega.id}`}
                          className="rounded-lg border border-orange-500 px-3 py-2 text-sm font-bold text-orange-600"
                        >
                          Ver detalhes
                        </Link>
                        <Link
                          href="/admin/usuarios"
                          className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-bold text-white"
                        >
                          Criar acesso
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
