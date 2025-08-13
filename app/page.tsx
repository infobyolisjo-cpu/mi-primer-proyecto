// app/page.tsx
export const dynamic = 'force-dynamic';

type SearchParams = { [key: string]: string | string[] | undefined };

export default function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const qParam = searchParams?.q;
  const q = Array.isArray(qParam) ? qParam[0] : qParam;

  // Paleta local para el panel y controles
  const ui = {
    panelBg: '#f6eee2',
    panelBorder: '#e0d2bd',
    inputBorder: '#d9cbb6',
    inputBg: '#fffdf8',
    text: '#201810',
    btnBorder: '#b89e7a',
    btnHoverBorder: '#8e7759',
    btnHoverBg: '#fffaf2',
    shadow: '0 6px 18px rgba(0,0,0,0.06)',
  } as const;

  // Handlers de hover (sin hooks, seguros en server)
  const onBtnOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    Object.assign(e.currentTarget.style, {
      background: ui.btnHoverBg,
      borderColor: ui.btnHoverBorder,
      transform: 'translateY(-1px)',
      boxShadow: ui.shadow,
      cursor: 'pointer',
    });
  };
  const onBtnOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    Object.assign(e.currentTarget.style, {
      background: '#fff',
      borderColor: ui.btnBorder,
      transform: 'none',
      boxShadow: '0 1px 0 rgba(0,0,0,0.03)',
    });
  };

  return (
    <main style={{ padding: 24, maxWidth: 820, margin: '0 auto', lineHeight: 1.6 }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', letterSpacing: '.2px', marginBottom: 4 }}>Inicio</h1>
      <p style={{ marginTop: 0, opacity: 0.9 }}>Bienvenida a ByOlisJo</p>

      {/* Panel del buscador, más premium */}
      <section
        style={{
          marginTop: 24,
          padding: 20,
          border: `1px solid ${ui.panelBorder}`,
          borderRadius: 14,
          background: ui.panelBg,
          boxShadow: ui.shadow,
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: 12 }}>Búsqueda rápida</h2>

        <form method="GET" style={{ display: 'flex', gap: 12 }}>
          <input
            name="q"
            defaultValue={q ?? ''}
            placeholder="Escribe una palabra clave…"
            style={{
              flex: 1,
              padding: '12px 14px',
              borderRadius: 12,
              border: `1px solid ${ui.inputBorder}`,
              background: ui.inputBg,
              outline: 'none',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = ui.btnBorder;
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(184,158,122,0.20)';
              e.currentTarget.style.background = '#fff';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = ui.inputBorder;
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = ui.inputBg;
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px 18px',
              borderRadius: 12,
              border: `1px solid ${ui.btnBorder}`,
              background: '#fff',
              color: ui.text,
              fontWeight: 600,
              boxShadow: '0 1px 0 rgba(0,0,0,0.03)',
              transition: 'all .15s ease',
            }}
            onMouseOver={onBtnOver}
            onMouseOut={onBtnOut}
          >
            Buscar
          </button>
        </form>

        <div style={{ marginTop: 14 }}>
          {q ? (
            <p style={{ margin: 0 }}>
              Buscando: <strong>{q}</strong>
            </p>
          ) : (
            <p style={{ margin: 0 }}>
              Tip: prueba con <code>?q=branding</code>
            </p>
          )}
        </div>
      </section>

      <footer style={{ marginTop: 40, opacity: 0.8 }}>
        © {new Date().getFullYear()} ByOlisJo. For testing purposes only.
      </footer>
    </main>
  );
}
