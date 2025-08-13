return (
  <main style={{ padding: 24, maxWidth: 720, margin: '0 auto', lineHeight: 1.5 }}>
    <h1>Inicio</h1>
    <p>Bienvenida a ByOlisJo</p>

    {/* Formulario que actualiza ?q=... sin hooks de cliente */}
    <section style={{ marginTop: 24, padding: 16, border: '1px solid #ddd', borderRadius: 12 }}>
      <h2>Búsqueda rápida</h2>
      <form method="GET" style={{ display: 'flex', gap: 12 }}>
        <input
          name="q"
          defaultValue={q ?? ''}
          placeholder="Escribe una palabra clave…"
          style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #333' }}>
          Buscar
        </button>
      </form>
      <div style={{ marginTop: 12 }}>
        {q ? <p>Buscando: <strong>{q}</strong></p> : <p>Tip: prueba con <code>?q=branding</code></p>}
      </div>
    </section>

    <footer style={{ marginTop: 40, opacity: 0.8 }}>
      © 2025 ByOlisJo. For testing purposes only.
    </footer>
  </main>
);
