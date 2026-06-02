import type { Produto } from "@/src/data/mock";
import { formatarMoeda } from "@/src/data/mock";
import Image from "next/image";
import type { ReactNode } from "react";
import StatusBadge from "./StatusBadge";

type ProductCardProps = {
  produto: Produto;
  onAdd?: () => void;
  children?: ReactNode;
};

export default function ProductCard({ produto, onAdd, children }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg">
      <div className="relative aspect-[4/3] bg-gray-100">
        <Image
          src={produto.imageUrl}
          alt={produto.nome}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold">{produto.nome}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {produto.emoji} {produto.categoria}
            </p>
          </div>
          <StatusBadge status={produto.ativo ? "Ativo" : "Inativo"} />
        </div>

        <p className="mt-3 text-lg font-bold text-orange-600">
          {formatarMoeda(produto.preco)}
        </p>

        {onAdd && (
          <button
            onClick={onAdd}
            className="mt-4 w-full rounded-lg bg-orange-500 px-4 py-3 font-bold text-white transition hover:bg-orange-600"
          >
            Adicionar
          </button>
        )}

        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
}
