"use client";

import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

const AUTH_KEY = "saideira_admin_auth";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const isAuthorized = useSyncExternalStore(
    subscribeToAuthChanges,
    getAuthSnapshot,
    getServerAuthSnapshot,
  );

  useEffect(() => {
    if (isAuthorized === false) {
      const redirectPath = `${window.location.pathname}${window.location.search}`;
      router.replace(`/login?redirect=${encodeURIComponent(redirectPath)}`);
    }
  }, [isAuthorized, router]);

  const sair = () => {
    localStorage.removeItem(AUTH_KEY);
    router.replace("/login");
  };

  if (isAuthorized !== true) {
    return (
      <main className="grid min-h-screen place-items-center bg-gray-100 px-6 text-gray-900">
        <div className="rounded-lg bg-white p-6 text-center shadow">
          <p className="font-bold text-orange-600">Saideira Ja</p>
          <p className="mt-2 text-gray-500">Verificando acesso...</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={sair}
        className="fixed right-4 top-4 z-50 rounded-lg border border-orange-200 bg-white px-4 py-2 text-sm font-bold text-orange-600 shadow transition hover:bg-orange-50"
      >
        Sair
      </button>
      {children}
    </>
  );
}

function getAuthSnapshot() {
  return localStorage.getItem(AUTH_KEY) === "true";
}

function getServerAuthSnapshot() {
  return null;
}

function subscribeToAuthChanges(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
  };
}
