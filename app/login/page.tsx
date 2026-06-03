"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AUTH_KEY = "saideira_admin_auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(AUTH_KEY) === "true") {
      router.replace(getRedirectPath());
    }
  }, [router]);

  const entrar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.error || "N\u00e3o foi poss\u00edvel entrar.");
        return;
      }

      localStorage.setItem(AUTH_KEY, "true");
      router.replace(getRedirectPath());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <section className="grid min-h-screen place-items-center px-6 py-10">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">
          <Link href="/" className="text-sm font-bold text-orange-600">
            Saideira J{"\u00e1"}
          </Link>

          <h1 className="mt-4 text-3xl font-bold">Acesso privado</h1>
          <p className="mt-2 text-gray-500">
            Entre para acessar as {"\u00e1"}reas administrativas do MVP.
          </p>

          <form onSubmit={entrar} className="mt-6 grid gap-4">
            <label className="grid gap-2 font-bold">
              E-mail
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </label>

            <label className="grid gap-2 font-bold">
              Senha
              <input
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </label>

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-orange-500 px-4 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function getRedirectPath() {
  const redirect = new URLSearchParams(window.location.search).get("redirect");

  if (!redirect || !redirect.startsWith("/") || redirect.startsWith("//")) {
    return "/admin";
  }

  return redirect;
}
