import type { Pedido } from "@/src/data/mock";
import { formatarMoeda } from "@/src/data/mock";
import StatusBadge from "./StatusBadge";

type OrderCardProps = {
  pedido: Pedido;
};

export default function OrderCard({ pedido }: OrderCardProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
        <div>
          <p className="font-bold text-orange-600">Pedido {pedido.numero}</p>
          <h3 className="mt-1 text-xl font-bold">{pedido.adega}</h3>
          <p className="mt-1 text-gray-500">{pedido.data}</p>
        </div>
        <StatusBadge status={pedido.status} />
      </div>

      <div className="mt-4 grid gap-2 text-gray-600">
        <p>{pedido.itens.join(", ")}</p>
        <p className="font-bold text-gray-900">{formatarMoeda(pedido.valor)}</p>
      </div>
    </div>
  );
}
