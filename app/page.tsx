// app/page.tsx
export const dynamic = 'force-dynamic';

type SearchParams = { [key: string]: string | string[] | undefined };

type BrandProposal = {
  palette: { name: string; hex: string }[];
  typography: { heading: string; body: string };
  mood: string[];
  keywords: string[];
  elevatorPitch: string;
};

async function getBrandProposal(q: string): Promise<BrandProposal | null> {
  if (!process.env.OPENAI_API_KEY) return null;

  const schema = {
    type: "object",
    properties: {
      palette: {
        type: "array",
        minItems: 3,
        maxItems: 5,
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            hex: { type: "string", pattern: "^#([0-9a-fA-F]{6})$" }
          },
          required: ["name", "hex"],
          additionalProperties: false
        }
      },
      typography: {
        type: "object",
        properties: { heading: { type: "string" }, body: { type: "string" } },
        required: ["heading", "body"],
        additionalProperties: false
      },
      mood: { type: "array", minItems: 3, maxItems: 6, items: { type: "string" } },
      keywords: { type: "array", minItems: 3, maxItems: 8, items: { type: "string" } },
      elevatorPitch: { type: "string" }
    },
    required: ["palette", "typography", "mood", "keywords", "elevatorPitch"],
    additionalProperties: false
  };

  const prompt =
    `Eres una estratega de marca de ByOlisJo. Devuelve una propuesta breve y accionable en JSON siguiendo el esquema.
Colores HEX (#RRGGBB). Tipografías de Google (Playfair, Inter, Lora, Poppins, etc).
Descripción: """${q}"""`;

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: prompt,
      response_format: {
        type: "json_schema",
        json_schema: { name: "brand_proposal", schema, strict: true }
      }
    })
  });

  if (!res.ok) {
    console.error("OpenAI error:", await res.text());
    return null;
  }

  const data = await res.json();
  const text =
    data.output_text ??
    data.output?.[0]?.content?.[0]?.text ??
    data.choices?.[0]?.message?.content ?? "";

  try {
    return JSON.parse(text) as BrandProposal;
  } catch (e) {
    console.error("Parse JSON error:", e, text);
    return null;
  }
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const qParam = searchParams?.q;
  const q = Array.isArray(qParam) ? qParam[0] : qParam;

  const ui = {
    panelBg: '#f6eee2',
    panelBorder: '#e0d2bd',
    inputBorder: '#d9cbb6',
    inputBg: '#fffdf8',
    text: '#201810',
    btnBorder: '#b89e7a',
    shadow: '0 6px 18px rgba(0,0,0,0.06)',
  } as const;

  let proposal: BrandProposal | null = null;
  if (q) proposal = await getBrandProposal(q);

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: '0 auto', lineHeight: 1.6 }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', letterSpacing: '.2px', marginBottom: 4 }}>Inicio</h1>
      <p style={{ marginTop: 0, opacity: 0.9 }}>Bienvenida a ByOlisJo</p>

      {/* Panel buscador */}
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
            placeholder="Ej.: “moderna, femenina, elegante en beige y dorado”"
            style={{
              flex: 1,
              padding: '12px 14px',
              borderRadius: 12,
              border: `1px solid ${ui.inputBorder}`,
              background: ui.inputBg,
              outline: 'none',
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
            }}
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
              Tip: prueba con <code>moderna, femenina, elegante en beige y dorado</code>
            </p>
          )}
        </div>
      </section>

      {/* Resultados IA */}
      {q && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ marginTop: 0 }}>Propuesta de marca (IA)</h2>

          {!process.env.OPENAI_API_KEY && (
            <div style={{ padding: 12, border: '1px solid #e99', borderRadius: 10, background: '#fff5f5' }}>
              Falta configurar <code>OPENAI_API_KEY</code> en Vercel.
            </div>
          )}

          {process.env.OPENAI_API_KEY && !proposal && (
            <div style={{ padding: 12, border: '1px solid #e0d2bd', borderRadius: 10, background: '#fffaf2' }}>
              No se pudo generar la propuesta en este intento. Vuelve a intentar con otra descripción.
            </div>
          )}

          {proposal && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 1fr',
                gap: 16,
                alignItems: 'start',
              }}
            >
              {/* Paleta */}
              <div style={{ border: `1px solid ${ui.panelBorder}`, borderRadius: 14, padding: 16, background: ui.panelBg, boxShadow: ui.shadow }}>
                <h3 style={{ marginTop: 0 }}>Paleta</h3>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {proposal.palette.map((c) => (
                    <div key={c.hex} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span title={c.hex} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', background: c.hex, display: 'inline-block' }} />
                      <div style={{ fontSize: 14 }}>
                        <div><strong>{c.name}</strong></div>
                        <code>{c.hex}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tipografías */}
              <div style={{ border: `1px solid ${ui.panelBorder}`, borderRadius: 14, padding: 16, background: ui.panelBg, boxShadow: ui.shadow }}>
                <h3 style={{ marginTop: 0 }}>Tipografías</h3>
                <p style={{ margin: 0 }}>
                  <strong>Títulos:</strong> {proposal.typography.heading}<br />
                  <strong>Texto:</strong> {proposal.typography.body}
                </p>
              </div>

              {/* Mood */}
              <div style={{ border: `1px solid ${ui.panelBorder}`, borderRadius: 14, padding: 16, background: ui.panelBg, boxShadow: ui.shadow }}>
                <h3 style={{ marginTop: 0 }}>Mood</h3>
                <ul style={{ margin: '8px 0 0 18px' }}>
                  {proposal.mood.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>

              {/* Keywords */}
              <div style={{ border: `1px solid ${ui.panelBorder}`, borderRadius: 14, padding: 16, background: ui.panelBg, boxShadow: ui.shadow }}>
                <h3 style={{ marginTop: 0 }}>Keywords</h3>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {proposal.keywords.map((k, i) => (
                    <span key={i} style={{ border: `1px solid #b89e7a`, borderRadius: 999, padding: '6px 10px', background: '#fff', fontSize: 13 }}>
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pitch */}
              <div style={{ gridColumn: '1 / -1', border: `1px solid ${ui.panelBorder}`, borderRadius: 14, padding: 16, background: ui.panelBg, boxShadow: ui.shadow }}>
                <h3 style={{ marginTop: 0 }}>Elevator pitch</h3>
                <p style={{ margin: 0 }}>{proposal.elevatorPitch}</p>
              </div>
            </div>
          )}
        </section>
      )}

      <footer style={{ marginTop: 40, opacity: 0.8 }}>
        © {new Date().getFullYear()} ByOlisJo. For testing purposes only.
      </footer>
    </main>
  );
}
