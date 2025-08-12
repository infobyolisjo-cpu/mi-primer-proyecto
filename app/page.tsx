'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type Lang = 'es' | 'en';

const t = {
  es: {
    brand: 'ByOlisJoBrand Kit Lite',
    premium: 'Premium & minimal — beige & gold aesthetic',
    lang: 'Idioma',
    // Sección: datos
    title: 'Tu Identidad de Marca en Minutos',
    name: 'Nombre del negocio',
    desc: 'Descripción breve',
    client: '¿Para quién trabajas? / cliente ideal',
    helpTop: 'Completa tus datos y recibe tu kit listo para usar.',
    // Sección: eslóganes
    pickSlogan: 'Elige un eslogan (o edítalo)',
    customSlogan: 'Eslogan personalizado (opcional)',
    needData: 'Completa los campos para ver y seleccionar eslóganes.',
    suggestionsTitle: 'Ideas de eslogan',
    suggestions: [
      'Tu marca, lista en minutos.',
      'Diseña. Descarga. Deslumbra.',
      'Crea el kit de tu marca en un clic.',
      'Haz visible la esencia de tu negocio.',
    ],
    // Botón
    cta: 'Crear y descargar kit',
    // Vista previa (derecha)
    previewTitle: 'Vista previa',
  },
  en: {
    brand: 'ByOlisJoBrand Kit Lite',
    premium: 'Premium & minimal — beige & gold aesthetic',
    lang: 'Language',
    // Section: data
    title: 'Your Brand Identity in Minutes',
    name: 'Business name',
    desc: 'Short description',
    client: 'Who do you work for? / ideal client',
    helpTop: 'Fill in your details to get your ready-to-use kit.',
    // Section: slogans
    pickSlogan: 'Choose a slogan (or edit)',
    customSlogan: 'Custom slogan (optional)',
    needData: 'Fill the fields to view and choose slogans.',
    suggestionsTitle: 'Slogan ideas',
    suggestions: [
      'Your brand, ready in minutes.',
      'Design. Download. Dazzle.',
      'Your brand kit in one click.',
      'Make your essence visible.',
    ],
    // Button
    cta: 'Create & download kit',
    // Preview
    previewTitle: 'Preview',
  },
} as const;

export default function HomePage() {
  const router = useRouter();

  // idioma (se sincroniza con ?lang si llega)
  const [lang, setLang] = useState<Lang>('es');

  // datos del formulario
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [client, setClient] = useState('');

  // eslóganes
  const suggestions = t[lang].suggestions;
  const [picked, setPicked] = useState<number>(0); // índice de suggestions
  const [custom, setCustom] = useState('');

  // colores por defecto (si luego los haces configurables, pásalos aquí)
  const colors = ['#C5B28F', '#8C7A5B', '#E7DCC7'];

  // lee ?lang si llega
  useEffect(() => {
    try {
      const u = new URL(window.location.href);
      const ql = u.searchParams.get('lang');
      if (ql === 'en' || ql === 'es') setLang(ql);
    } catch {}
  }, []);

  // “listo” cuando los 3 campos base están completos
  const isReady = useMemo(
    () => name.trim() && desc.trim() && client.trim(),
    [name, desc, client]
  );

  // eslogan final = custom (si hay), sino el elegido por radio
  const finalSlogan = useMemo(() => {
    if (custom.trim()) return custom.trim();
    return suggestions[picked] ?? suggestions[0];
  }, [custom, picked, suggestions]);

  // submit → vamos a /pay con los params
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isReady) return;

    const params = new URLSearchParams({
      name: name.trim(),
      slogan: finalSlogan,
      colors: colors.join(','), // ej: #C5B28F,#8C7A5B,#E7DCC7
      lang,
    });

    router.push(`/pay?${params.toString()}`);
  };

  // pequeños estilos para mantener tu estética sin tocar CSS global
  const card: React.CSSProperties = {
    border: '1px solid #d9cdb4',
    background: '#fbf7ee',
    borderRadius: 8,
    padding: '1.25rem',
  };
  const label: React.CSSProperties = {
    fontSize: '0.9rem',
    marginBottom: 6,
    display: 'block',
    color: '#6b5b45',
  };
  const input: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d9cdb4',
    borderRadius: 6,
    background: '#fffdf8',
  };
  const hint: React.CSSProperties = {
    fontSize: '0.85rem',
    color: '#6b5b45',
    opacity: 0.8,
  };
  const h2: React.CSSProperties = {
    fontFamily: 'serif',
    fontWeight: 600,
    fontSize: '1.6rem',
    margin: '0 0 12px',
    color: '#3f3427',
  };
  const rightNote: React.CSSProperties = {
    borderLeft: '1px dashed #d9cdb4',
    paddingLeft: '1rem',
    color: '#5a4d3b',
  };

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '1.25rem' }}>
      {/* encabezado */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 22, fontWeight: 700 }}>{t[lang].brand}</div>
        <div style={{ fontSize: 14, color: '#6b5b45' }}>{t[lang].premium}</div>
      </div>

      {/* selector idioma */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ ...label, marginBottom: 4 }}>{t[lang].lang}:</label>
        <select
          value={lang}
          onChange={(e) => setLang((e.target.value as Lang) ?? 'es')}
          style={{ ...input, width: 140 }}
        >
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>
      </div>

      {/* título + ayuda */}
      <h1 style={{ fontFamily: 'serif', fontSize: 28, margin: '16px 0' }}>
        {t[lang].title}
      </h1>
      <p style={{ ...hint, margin: '0 0 16px' }}>{t[lang].helpTop}</p>

      {/* layout 2 columnas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '1rem',
        }}
      >
        {/* izquierda: formulario */}
        <form onSubmit={onSubmit}>
          <div style={{ ...card, marginBottom: 12 }}>
            <div style={{ marginBottom: 12 }}>
              <label style={label}>{t[lang].name}</label>
              <input
                style={input}
                placeholder={lang === 'es' ? 'Ej. ByOlisJo' : 'e.g. ByOlisJo'}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={label}>{t[lang].desc}</label>
              <input
                style={input}
                placeholder={
                  lang === 'es'
                    ? 'Ej. Joyería artesanal con piedras lunares'
                    : 'e.g. Handmade jewelry with moon-inspired stones'
                }
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div>
              <label style={label}>{t[lang].client}</label>
              <input
                style={input}
                placeholder={
                  lang === 'es'
                    ? 'Ej. Mujeres 25–45 que valoran el diseño artesanal'
                    : 'e.g. Women 25–45 who value artisanal design'
                }
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />
            </div>
          </div>

          <div style={{ ...card, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={h2}>{t[lang].pickSlogan}</h2>
              {!isReady && (
                <div style={{ ...hint, textAlign: 'right' }}>{t[lang].needData}</div>
              )}
            </div>

            {/* radios de eslóganes: ocultos si no está listo */}
            {isReady && (
              <div style={{ display: 'grid', gap: 10, marginBottom: 10 }}>
                {suggestions.map((s, i) => (
                  <label
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="slogan"
                      checked={!custom && picked === i}
                      onChange={() => {
                        setCustom('');
                        setPicked(i);
                      }}
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            )}

            <div>
              <label style={label}>{t[lang].customSlogan}</label>
              <input
                style={input}
                placeholder={
                  lang === 'es'
                    ? 'Escribe tu propio eslogan (opcional)'
                    : 'Write your own slogan (optional)'
                }
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isReady}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 8,
              border: '1px solid #bfae8e',
              background: isReady ? '#e8dcc7' : '#eee7d9',
              cursor: isReady ? 'pointer' : 'not-allowed',
              fontWeight: 600,
            }}
          >
            {t[lang].cta}
          </button>
        </form>

        {/* derecha: vista previa */}
        <div style={{ ...card }}>
          <h2 style={h2}>{t[lang].previewTitle}</h2>
          <div style={rightNote}>
            <div style={{ marginBottom: 8, fontWeight: 600 }}>{name || '—'}</div>
            <div style={{ marginBottom: 6 }}>{desc || '—'}</div>
            <div style={{ marginBottom: 6, fontSize: 13, opacity: 0.85 }}>
              {client || '—'}
            </div>
            <hr style={{ border: 0, borderTop: '1px dashed #d9cdb4', margin: '10px 0' }} />
            <div style={{ fontStyle: 'italic' }}>
              {custom.trim() ? custom.trim() : suggestions[picked]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

