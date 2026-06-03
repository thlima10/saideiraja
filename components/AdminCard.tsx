import Link from "next/link";

type AdminCardProps = {
  title: string;
  value?: string;
  description?: string;
  href?: string;
};

export default function AdminCard({
  title,
  value,
  description,
  href,
}: AdminCardProps) {
  const content = (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
        {title}
      </p>
      {value && <p className="mt-3 text-3xl font-bold text-gray-900">{value}</p>}
      {description && <p className="mt-2 text-gray-500">{description}</p>}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
