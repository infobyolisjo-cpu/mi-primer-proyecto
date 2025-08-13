// app/download/page.tsx
export const dynamic = 'force-dynamic';

type SearchParams = { [key: string]: string | string[] | undefined };

export default function Download({ searchParams }: { searchParams: SearchParams }) {
  const tokenParam = searchParams?.token;
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: '0 auto', lineHeight: 1.6 }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', letterSpacing: '.2px' }}>Descargas</h1>

      {token ? (
        <p>Token recibido: <code>{token}</code></p>
      ) : (
        <>
          <p>Agrega un token para probar: <code>/download?token=123</code></p>
          <form method="GET" style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <input name="token" placeholder="Escribe un token…" style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ccc' }} />
            <button type="submit" style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #333' }}>Enviar</button>
          </form>
        </>
      )}

      <p style={{ marginTop: 16 }}>
        <a href="/" style={{ textDecoration: 'underline' }}>← Volver al inicio</a>
      </p>
    </main>
  );
}

