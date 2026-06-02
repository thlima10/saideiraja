"use client";

import Header from "@/components/Header";
import { useMockStore } from "@/components/MockStoreProvider";
import { FormEvent, useState } from "react";

const campos = [
  { label: "Nome da adega", name: "nome" },
  { label: "CNPJ ou CPF", name: "documento" },
  { label: "WhatsApp", name: "whatsapp" },
  { label: "Endere\u00e7o", name: "endereco" },
  { label: "Bairro", name: "bairro" },
  { label: "Cidade", name: "cidade" },
  { label: "Hor\u00e1rio de funcionamento", name: "horario" },
  { label: "Chave PIX", name: "pix" },
];

export default function NovaAdegaPage() {
  const [mensagem, setMensagem] = useState("");
  const { adicionarAdega } = useMockStore();

  const salvarAdega = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    adicionarAdega({
      nome: String(form.get("nome") || ""),
      documento: String(form.get("documento") || ""),
      whatsapp: String(form.get("whatsapp") || ""),
      endereco: String(form.get("endereco") || ""),
      bairro: String(form.get("bairro") || ""),
      cidade: String(form.get("cidade") || ""),
      horario: String(form.get("horario") || ""),
      pix: String(form.get("pix") || ""),
      status:
        String(form.get("status") || "Ativa") === "Inativa"
          ? "Inativa"
          : "Ativa",
    });

    setMensagem("Adega cadastrada com sucesso.");
    event.currentTarget.reset();
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Cadastrar adega"
        subtitle="Adicione uma nova loja parceira"
        backHref="/admin/adegas"
        actionHref="/admin"
        actionLabel="Admin"
      />

      <section className="mx-auto max-w-3xl p-6">
        <form onSubmit={salvarAdega} className="rounded-xl bg-white p-6 shadow">
          <div className="grid gap-5 md:grid-cols-2">
            {campos.map((campo) => (
              <label
                key={campo.name}
                className="grid gap-2 font-bold text-gray-900"
              >
                {campo.label}
                <input
                  required
                  name={campo.name}
                  className="rounded-xl border border-gray-300 p-4 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </label>
            ))}

            <label className="grid gap-2 font-bold text-gray-900">
              Status
              <select
                name="status"
                className="rounded-xl border border-gray-300 p-4 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              >
                <option>Ativa</option>
                <option>Inativa</option>
              </select>
            </label>
          </div>

          {mensagem && (
            <p className="mt-5 rounded-xl bg-green-100 p-4 font-bold text-green-700">
              {mensagem}
            </p>
          )}

          <button className="mt-6 w-full rounded-lg bg-orange-500 px-4 py-3 font-bold text-white transition hover:bg-orange-600">
            Salvar adega
          </button>
        </form>
      </section>
    </main>
  );
}
