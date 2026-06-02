"use client";

import Header from "@/components/Header";
import { useMockStore } from "@/components/MockStoreProvider";
import { formatarMoeda } from "@/src/data/mock";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { carrinho, criarPedido } = useMockStore();
  const total = carrinho.reduce(
    (valor, item) => valor + item.produto.preco * item.quantidade,
    0,
  );

  const finalizarPedido = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (carrinho.length === 0) {
      return;
    }

    const form = new FormData(event.currentTarget);
    const endereco = [
      String(form.get("endereco") || ""),
      String(form.get("complemento") || ""),
    ]
      .filter(Boolean)
      .join(" - ");

    criarPedido({
      cliente: String(form.get("nome") || "Cliente Saideira"),
      telefone: String(form.get("telefone") || ""),
      endereco,
      pagamento: String(form.get("pagamento") || "PIX no site"),
    });

    router.push("/pedido-sucesso");
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        title="Checkout"
        subtitle="Informe os dados de entrega"
        backHref="/carrinho"
      />

      <section className="mx-auto grid max-w-6xl gap-6 p-6 lg:grid-cols-[1fr_360px]">
        <form onSubmit={finalizarPedido} className="rounded-xl bg-white p-6 shadow">
          <div className="grid gap-5 md:grid-cols-2">
            <input name="nome" required placeholder="Nome" className="rounded-xl border border-gray-300 p-4" />
            <input name="telefone" required placeholder="Telefone" className="rounded-xl border border-gray-300 p-4" />
            <input name="endereco" required placeholder="Endere\u00e7o" className="rounded-xl border border-gray-300 p-4 md:col-span-2" />
            <input name="complemento" placeholder="Complemento" className="rounded-xl border border-gray-300 p-4 md:col-span-2" />
            <select name="pagamento" className="rounded-xl border border-gray-300 p-4 md:col-span-2">
              <option>PIX no site</option>
              <option>Cart\u00e3o na entrega</option>
              <option>Dinheiro</option>
            </select>
            <textarea
              name="observacao"
              rows={4}
              placeholder="Observa\u00e7\u00e3o"
              className="resize-none rounded-xl border border-gray-300 p-4 md:col-span-2"
            />
          </div>

          <button
            disabled={carrinho.length === 0}
            className="mt-6 w-full rounded-lg bg-orange-500 px-4 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Finalizar pedido
          </button>
        </form>

        <aside className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-2xl font-bold">Resumo do pedido</h2>
          {carrinho.length === 0 ? (
            <div className="mt-5 rounded-xl bg-gray-100 p-4 text-gray-600">
              <p className="font-bold">Carrinho vazio</p>
              <Link href="/" className="mt-3 inline-block text-orange-600 underline">
                Escolher produtos
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-5 grid gap-4">
                {carrinho.map((item) => (
                  <div key={item.produto.id} className="flex justify-between gap-4">
                    <div>
                      <p className="font-bold">{item.produto.nome}</p>
                      <p className="text-sm text-gray-500">
                        Quantidade: {item.quantidade}
                      </p>
                    </div>
                    <p className="font-bold text-orange-600">
                      {formatarMoeda(item.produto.preco * item.quantidade)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between border-t border-gray-200 pt-4 text-xl font-bold">
                <span>Total</span>
                <span className="text-orange-600">{formatarMoeda(total)}</span>
              </div>
            </>
          )}
        </aside>
      </section>
    </main>
  );
}
