import Link from "next/link";

type HeaderProps = {
  title?: string;
  subtitle?: string;
  backHref?: string;
  actionHref?: string;
  actionLabel?: string;
};

export default function Header({
  title = "Saideira J\u00e1",
  subtitle = "Sua bebida em minutos",
  backHref,
  actionHref = "/carrinho",
  actionLabel = "\u{1F6D2}",
}: HeaderProps) {
  return (
    <header className="bg-orange-500 p-8 text-white">
      <div className="mx-auto flex max-w-6xl items-start justify-between gap-4">
        <div>
          {backHref && (
            <Link href={backHref} className="underline">
              Voltar
            </Link>
          )}
          <h1 className="mt-3 text-4xl font-bold">{title}</h1>
          <p className="mt-2 text-white/90">{subtitle}</p>
        </div>

        {actionHref && (
          <Link
            href={actionHref}
            className="rounded-full bg-white px-4 py-3 text-2xl text-orange-500 shadow transition hover:bg-orange-50"
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </header>
  );
}
