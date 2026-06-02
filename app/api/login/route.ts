export async function POST(request: Request) {
  const { email, password } = await request.json();
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return Response.json(
      { error: "Credenciais administrativas nao configuradas." },
      { status: 500 },
    );
  }

  if (email === adminEmail && password === adminPassword) {
    return Response.json({ ok: true });
  }

  return Response.json(
    { error: "E-mail ou senha invalidos." },
    { status: 401 },
  );
}
