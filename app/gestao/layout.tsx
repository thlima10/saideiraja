import ProtectedRoute from "@/components/ProtectedRoute";

export default function GestaoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
