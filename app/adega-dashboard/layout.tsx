import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdegaDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
