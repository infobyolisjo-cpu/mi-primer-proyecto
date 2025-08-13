// app/productos/page.tsx
export const dynamic = 'force-dynamic';

type Item = {
  id: string;
  title: string;
  desc: string;
  price: string;
  ctaHref: string;
  ctaText: string;
};

export default function Productos() {
  const ui = {
    panelBg: '#f6eee2',
    panelBorder: '#e0d2bd',
    text: '#201810',
    btnBorder: '#b89e7a',
    btnHoverBorder: '#8e7759',
    btnHoverBg: '#fffaf2',
    cardShadow: '0 6px 18px rgba(0,0,0,0.06)',
  } as const;

  const items: Item[] = [
    {
      id: 'kit-canva',
      title: 'Kit Canva: Branding Express',
      desc: 'Plantillas premium + guía rápida para identidad visual.',
      price: 'USD 17',
      ctaHref: '#',
      ctaText: 'Ver detalles',
    },
    {
      id: 'prompts-ia',
      title: '25 Prompts IA para Emprendedoras',
      desc: 'Copy, ideas de reels y respuestas de WhatsApp listas.',
      price: 'USD 9',
      ctaHref: '#',
      ctaText: 'Ver detalles',
    },
    {
      id: 'mini-curso',
      title: 'Mini-curso: IA en tu Marca',
      desc: 'Workflow simple con herramientas gratuitas.',
      price: 'USD 29',
      ctaHref: '#',
      ctaText: 'Ver detalles',
    },
  ];

  const onBtnOver = (e: React.MouseEvent<HTMLAnchorElement>) => {
    Object.assign(e.currentTarget.style, {
      background: ui.btnHoverBg,
      borderColor: ui.btnHoverBorder,
      transform: 'translateY(-1px)',
      boxShadow: ui.cardShadow,
      cursor: 'pointer',
    });
  };
  const onBtnOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    Object.assign(e.currentTarget.style, {
      background: '#fff',
      borderColor: ui.btnBorder,
      transform: 'none',
      boxShadow: '0 1px 0 rgba(0,0,0,0.03)',
    });
  };

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: '0 auto', lineHeight: 1.6 }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', letterSpacing: '.2px', marginBottom: 8 }}>
        Productos
      </h1>
      <p style={{ marginTop: 0, opacity: 0.9 }}>
        Recursos digitales ByOlisJo (demo). Estilo premium, minimal — beige & gold.
      </p>

      {/* Grid */}
      <section
        style={{
          marginTop: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
        }}
      >
        {items.map((it) => (
          <article
            key={it.id}
            style={{
              border: `1px solid ${ui.panelBorder}`,
              background: ui.panelBg,
              borderRadius: 14,
              padding: 16,
              boxShadow: ui.cardShadow,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              minHeight: 190,
            }}
          >
            <h3 style={{ margin: 0, fontSize: 20 }}>{it.title}</h3>
            <p style={{ margin: 0, opacity: 0.95 }}>{it.desc}</p>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
              <strong>{it.price}</strong>
              <a
                href={it.ctaHref}
                style={{
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: `1px solid ${ui.btnBorder}`,
                  background: '#fff',
                  color: ui.text,
                  textDecoration: 'none',
                  fontWeight: 600,
                  boxShadow: '0 1px 0 rgba(0,0,0,0.03)',
                  transition: 'all .15s ease',
                }}
                onMouseOver={onBtnOver}
                onMouseOut={onBtnOut}
              >
                {it.ctaText}
              </a>
            </div>
          </article>
        ))}
      </section>

      <p style={{ marginTop: 20 }}>
        ¿Dudas?{' '}
        <a href="https://wa.me/00000000000" target="_blank" rel="noopener" style={{ textDecoration: 'underline' }}>
          Escríbeme por WhatsApp
        </a>
      </p>

      <p style={{ marginTop: 8 }}>
        <a href="/" style={{ textDecoration: 'underline' }}>← Volver al inicio</a>
      </p>
    </main>
  );
}

