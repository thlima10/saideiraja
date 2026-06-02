import Link from "next/link";
import type { Adega } from "@/src/data/mock";
import StatusBadge from "./StatusBadge";

type StoreCardProps = {
  adega: Adega;
};

export default function StoreCard({ adega }: StoreCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold">{adega.nome}</h3>
          <p className="mt-1 text-gray-500">
            {adega.bairro} - {adega.cidade}
          </p>
        </div>
        <StatusBadge status={adega.status} />
      </div>

      <p className="mt-4 text-gray-500">
        {"\u2B50"} {adega.avaliacao} {"\u2022"} {"\u{1F69A}"} {adega.entrega}
      </p>

      <Link
        href={`/adega/${adega.id}`}
        className="mt-4 inline-block rounded-lg bg-orange-500 px-4 py-2 font-bold text-white transition hover:bg-orange-600"
      >
        Ver Produtos
      </Link>
    </div>
  );
}
