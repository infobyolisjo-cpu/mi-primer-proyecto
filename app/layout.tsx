// app/layout.tsx
import { Playfair_Display, Inter } from 'next/font/google';

export const metadata = {
  title: 'ByOlisJo Brand Kit Lite',
  description: 'Premium & minimal — beige & gold aesthetic',
};

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-serif',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const colors = {
  bg: '#efe6d8',         // beige base
  panel: '#f6eee2',      // panel suave
  text: '#201810',       // café oscuro
  line: '#e0d2bd',       // borde claro
  gold: '#b89e7a',       // dorado suave
  goldDark: '#8e7759',   // dorado más oscuro (hover)
  white: '#fff',
};

const btn = {
  base: {
    padding: '8px 14px',
    borderRadius: '12px',
    border: `1px solid ${colors.gold}`,
    background: colors.white,
    color: colors.text,
    textDecoration: 'none',
    boxShadow: '0 1px 0 rgba(0,0,0,0.03)',
    transition: 'all .15s ease',
    fontWeight: 600,
  } as React.CSSProperties,
  hover: {
    background: '#fffaf2',
    borderColor: colors.goldDark,
    transform: 'translateY(-1px)',
  } as React.CSSProperties,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${playfair.variable}`}
        style={{
          background: colors.bg,
          color: colors.text,
          fontFamily: 'var(--font-sans)',
          margin: 0,
        }}
      >
        {/* HEADER */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            borderBottom: `1px solid ${colors.line}`,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(246,238,226,0.9) 100%)',
            backdropFilter: 'saturate(140%) blur(4px)',
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            {/* Marca */}
            <a
              href="/"
              style={{
                fontWeight: 800,
                textDecoration: 'none',
                color: colors.text,
                letterSpacing: '.2px',
                fontFamily: 'var(--font-serif)',
              }}
              aria-label="Ir al inicio"
            >
              ByOlisJo<span style={{ fontWeight: 500, opacity: 0.85 }}> Brand Kit Lite</span>
            </a>

            {/* Nav */}
            <nav style={{ display: 'flex', gap: 10 }}>
              <a
                href="/"
                style={btn.base}
                onMouseOver={(e) =>
                  Object.assign((e.currentTarget as HTMLAnchorElement).style, btn.hover)
                }
                onMouseOut={(e) =>
                  Object.assign((e.currentTarget as HTMLAnchorElement).style, btn.base)
                }
              >
                Inicio
              </a>
              <a
                href="/productos"
                style={btn.base}
                onMouseOver={(e) =>
                  Object.assign((e.currentTarget as HTMLAnchorElement).style, btn.hover)
                }
                onMouseOut={(e) =>
                  Object.assign((e.currentTarget as HTMLAnchorElement).style, btn.base)
                }
              >
                Productos
              </a>
              <a
                href="/download"
                style={btn.base}
                onMouseOver={(e) =>
                  Object.assign((e.currentTarget as HTMLAnchorElement).style, btn.hover)
                }
                onMouseOut={(e) =>
                  Object.assign((e.currentTarget as HTMLAnchorElement).style, btn.base)
                }
              >
                Descargas
              </a>
            </nav>
          </div>
        </header>

        {/* CONTENIDO */}
        <main style={{ minHeight: '72vh' }}>{children}</main>

        {/* FOOTER */}
        <footer
          style={{
            borderTop: `1px solid ${colors.line}`,
            background: colors.panel,
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              padding: '18px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap',
              fontSize: 14,
            }}
          >
            <span>© {new Date().getFullYear()} ByOlisJo</span>
            <span style={{ opacity: 0.9 }}>Premium & minimal — beige & gold aesthetic</span>
          </div>
        </footer>
      </body>
    </html>
  );
}


