export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (
    email === "admin@saideiraja.com.br" &&
    password === "Saideira@2026"
  ) {
    return Response.json({ ok: true });
  }

  return Response.json(
    { error: "E-mail ou senha invalidos." },
    { status: 401 },
  );
}
