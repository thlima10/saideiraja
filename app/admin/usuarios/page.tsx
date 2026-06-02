"use client";

import Header from "@/components/Header";
import { useMockStore } from "@/components/MockStoreProvider";
import { FormEvent, useState } from "react";

export default function AdminUsuariosPage() {
  const [mensagem, setMensagem] = useState("");
  const { adegas } = useMockStore();

  const criarAcesso = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMensagem("Acesso criado com sucesso para a adega.");
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Usu\u00e1rios e acessos"
        subtitle="Crie logins para donos e operadores"
        backHref="/admin"
        actionHref="/admin/adegas"
        actionLabel="Adegas"
      />

      <section className="mx-auto max-w-3xl p-6">
        <form onSubmit={criarAcesso} className="rounded-xl bg-white p-6 shadow">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 font-bold">
              Nome do respons\u00e1vel
              <input required className="rounded-xl border border-gray-300 p-4 font-normal" />
            </label>
            <label className="grid gap-2 font-bold">
              E-mail
              <input required type="email" className="rounded-xl border border-gray-300 p-4 font-normal" />
            </label>
            <label className="grid gap-2 font-bold">
              Telefone
              <input required type="tel" className="rounded-xl border border-gray-300 p-4 font-normal" />
            </label>
            <label className="grid gap-2 font-bold">
              Adega vinculada
              <select className="rounded-xl border border-gray-300 p-4 font-normal">
                {adegas.map((adega) => (
                  <option key={adega.id}>{adega.nome}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 font-bold">
              Tipo de acesso
              <select className="rounded-xl border border-gray-300 p-4 font-normal">
                <option>Dono da adega</option>
                <option>Operador</option>
              </select>
            </label>
            <label className="grid gap-2 font-bold">
              Senha tempor\u00e1ria
              <input required type="password" className="rounded-xl border border-gray-300 p-4 font-normal" />
            </label>
          </div>

          {mensagem && (
            <p className="mt-5 rounded-xl bg-green-100 p-4 font-bold text-green-700">
              {mensagem}
            </p>
          )}

          <button className="mt-6 w-full rounded-lg bg-orange-500 px-4 py-3 font-bold text-white">
            Criar acesso
          </button>
        </form>
      </section>
    </main>
  );
}
