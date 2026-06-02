import Header from "@/components/Header";
import Link from "next/link";

export default function MinhaContaPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Minha conta"
        subtitle="Dados principais do cliente"
        backHref="/"
        actionHref="/meus-pedidos"
        actionLabel="Pedidos"
      />

      <section className="mx-auto max-w-3xl p-6">
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="grid gap-4 text-gray-700">
            <p>
              <strong>Nome:</strong> Thiago Martins
            </p>
            <p>
              <strong>Telefone:</strong> (11) 98888-1234
            </p>
            <p>
              <strong>Endere\u00e7o principal:</strong> Rua X, 120
            </p>
          </div>

          <Link
            href="/meus-pedidos"
            className="mt-6 inline-block rounded-lg bg-orange-500 px-5 py-3 font-bold text-white"
          >
            Ver meus pedidos
          </Link>
        </div>
      </section>
    </main>
  );
}
