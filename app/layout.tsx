// app/layout.tsx
export const metadata = {
  title: 'ByOlisJo Brand Kit Lite',
  description: 'Premium & minimal — beige & gold aesthetic',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        style={{
          backgroundColor: '#efe6d8', // beige suave
          color: '#221b14',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
          margin: 0,
        }}
      >
        {/* Header global */}
        <header
          style={{
            borderBottom: '1px solid #d9cbb6',
            background: '#f5ede1',
          }}
        >
          <div
            style={{
              maxWidth: 1024,
              margin: '0 auto',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <a href="/" style={{ fontWeight: 700, textDecoration: 'none', color: '#221b14' }}>
              ByOlisJo<span style={{ fontWeight: 400 }}>Brand Kit Lite</span>
            </a>

            <nav style={{ display: 'flex', gap: 12 }}>
              <a
                href="/"
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid #b89e7a',
                  textDecoration: 'none',
                  color: '#221b14',
                  background: '#fff9f0',
                }}
              >
                Inicio
              </a>
              <a
                href="/productos"
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid #b89e7a',
                  textDecoration: 'none',
                  color: '#221b14',
                  background: '#fff9f0',
                }}
              >
                Productos
              </a>
              <a
                href="/download"
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid #b89e7a',
                  textDecoration: 'none',
                  color: '#221b14',
                  background: '#fff9f0',
                }}
              >
                Descargas
              </a>
            </nav>
          </div>
        </header>

        {/* Contenido de cada página */}
        <main style={{ minHeight: '70vh' }}>{children}</main>

        {/* Footer global */}
        <footer
          style={{
            borderTop: '1px solid #d9cbb6',
            background: '#f5ede1',
          }}
        >
          <div
            style={{
              maxWidth: 1024,
              margin: '0 auto',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
              flexWrap: 'wrap',
              fontSize: 14,
              opacity: 0.9,
            }}
          >
            <span>© {new Date().getFullYear()} ByOlisJo</span>
            <span>Premium & minimal — beige & gold aesthetic</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
