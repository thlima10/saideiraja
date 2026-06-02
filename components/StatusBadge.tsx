import type { OrderStatus, StoreStatus } from "@/src/data/mock";

type StatusBadgeProps = {
  status: OrderStatus | StoreStatus | "Ativo" | "Inativo";
};

const classes: Record<string, string> = {
  Novo: "bg-orange-100 text-orange-700",
  "Em preparo": "bg-blue-100 text-blue-700",
  "Saiu para entrega": "bg-purple-100 text-purple-700",
  Entregue: "bg-green-100 text-green-700",
  Cancelado: "bg-red-100 text-red-700",
  Ativa: "bg-green-100 text-green-700",
  Inativa: "bg-gray-100 text-gray-600",
  Ativo: "bg-green-100 text-green-700",
  Inativo: "bg-gray-100 text-gray-600",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${
        classes[status] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
