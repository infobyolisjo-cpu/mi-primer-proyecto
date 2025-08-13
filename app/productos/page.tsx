// app/productos/page.tsx
export const dynamic = 'force-dynamic';

export default function Productos() {
  return (
    <main style={{ padding: 24, maxWidth: 720, margin: '0 auto', lineHeight: 1.5 }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', letterSpacing: '.2px' }}>Productos</h1>

      <p style={{ marginTop: 8 }}>
        Recursos digitales ByOlisJo (demo):
      </p>
      <ul style={{ marginTop: 8 }}>
        <li>Guía Express de Branding Visual (Canva + IA)</li>
        <li>25 Prompts Premium para Emprendedores</li>
      </ul>

      <p style={{ marginTop: 16 }}>
        <a href="/" style={{ textDecoration: 'underline' }}>← Volver al inicio</a>
      </p>
    </main>
  );
}
