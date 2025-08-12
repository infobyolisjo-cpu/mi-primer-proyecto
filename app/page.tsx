'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Lang = 'es' | 'en';

const texts = {
  es: {
    title: 'Tu Identidad de Marca en Minutos',
    name: 'Nombre del negocio',
    desc: 'Descripción breve',
    client: '¿Para quién trabajas? / cliente ideal',
    pickSlogan: 'Elige un eslogan (o edítalo)',
    customSlogan: 'Eslogan personalizado (opcional)',
    needData: 'Escribe nombre, descripción y público objetivo para ver las sugerencias.',
    generate: 'Generar kit',
    langLabel: 'Idioma:',
    colorsLabel: 'Colores',
    fontLabel: 'Tipografía',
    previewTitle: 'Vista previa',
    suggestions: [
      'Tu marca, lista en minutos.',
      'Diseña. Descarga. Deslumbra.',
      'Crea el kit de tu marca en un clic.',
      'Haz visible la esencia de tu negocio.',
    ],
  },
  en: {
    title: 'Your Brand Identity in Minutes',
    name: 'Business name',
    desc: 'Short description',
    client: 'Who do you work for? / ideal client',
    pickSlogan: 'Pick a slogan (or edit it)',
    customSlogan: 'Custom slogan (optional)',
    needData: 'Fill in name, description and audience to see suggestions.',
    generate: 'Generate kit',
    langLabel: 'Language:',
    colorsLabel: 'Colors',
    fontLabel: 'Typeface',
    previewTitle: 'Preview',
    suggestions: [
      'Your brand, ready in minutes.',
      'Design. Download. Dazzle.',
      'Create your brand kit in one click.',
      'Make your essence visible.',
    ],
  },
} as const;

const FONT_CHOICES = [
  { value: 'system-ui, Arial, sans-serif', label: 'Sans (Sistema)' },
  { value: '"Poppins", system-ui, Arial, sans-serif', label: 'Poppins (Sans)' },
  { value: '"Montserrat", system-ui, Arial, sans-serif', label: 'Montserrat (Sans)' },
  { value: '"Merriweather", Georgia, serif', label: 'Merriweather (Serif)' },
  { value: '"Playfair Display", Georgia, serif', label: 'Playfair Display (Serif)' },
];

export default function HomePage() {
  const router = useRouter();
  const search = useSearchParams();

  // idioma (sincronizado con ?lang)
  const [lang, setLang] = useState<Lang>('es');
  useEffect(() => {
    try {
      const q = search.get('lang');
      if (q === 'en' || q === 'es') setLang(q);
    } catch {}
  }, [search]);
  const t = texts[lang];

  // formulario
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [client, setClient] = useState('');

  // eslóganes
  const suggestions = t.suggestions;
  const [picked, setPicked] = useState<number | null>(null);
  const [custom, setCustom] = useState('');

  // si el usuario termina los 3 campos, auto-selecciona el primer eslogan si no hay uno elegido
  const canPickSlogan = useMemo(
    () => name.trim() !== '' && desc.trim() !== '' && client.trim() !== '',
    [name, desc, client]
  );
  useEffect(() => {
    if (canPickSlogan && picked === null) setPicked(0);
  }, [canPickSlogan, picked]);

  // colores (3) y tipografía
  const [color1, setColor1] = useState('#C8B28F');
  const [color2, setColor2] = useState('#8C745B');
  const [color3, setColor3] = useState('#E7DCC7');
  const [font, setFont] = useState(FONT_CHOICES[0].value);

  const chosenSlogan =
    custom.trim() !== ''
      ? custom.trim()
      : picked !== null
      ? suggestions[picked]
      : '';

  const canSubmit = canPickSlogan && chosenSlogan !== '';

  // actualizar ?lang en URL (solo UX)
  function handleLangChange(newLang: Lang) {
    setLang(newLang);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    router.replace(url.toString());
  }

  // enviar a /pay con datos
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const url = new URL('/pay', window.location.origin);
    url.searchParams.set('name', name.trim());
    url.searchParams.set('slogan', chosenSlogan);
    url.searchParams.set('colors', [color1, color2, color3].join(','));
    url.searchParams.set('font', font);
    url.searchParams.set('lang', lang);
    router.push(url.toString());
  }

  // mini “logo” textual con inicial (opcional)
  const initial = (name.trim()[0] || 'B').toUpperCase();

  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: '1.5rem' }}>
      {/* idioma */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <label style={{ opacity: 0.8 }}>{t.langLabel}</label>
        <select
          value={lang}
          onChange={(e) => handleLangChange(e.target.value as Lang)}
          style={{ padding: '0.4rem 0.6rem' }}
        >
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>
      </div>

      <h1 className="font-serif" style={{ fontSize: 28, marginBottom: 16 }}>{t.title}</h1>

      {/* layout 2 columnas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        {/* formulario */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: 12 }}>
            <input
              type="text"
              placeholder={t.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: '0.6rem', width: '100%' }}
            />
            <input
              type="text"
              placeholder={t.desc}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              style={{ padding: '0.6rem', width: '100%' }}
            />
            <input
              type="text"
              placeholder={t.client}
              value={client}
              onChange={(e) => setClient(e.target.value)}
              style={{ padding: '0.6rem', width: '100%' }}
            />

            {/* colores */}
            <div>
              <label className="font-serif" style={{ display: 'block', marginBottom: 6 }}>
                {t.colorsLabel}
              </label>
              <div style={{ display: 'flex', gap: 12 }}>
                <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} />
                <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} />
                <input type="color" value={color3} onChange={(e) => setColor3(e.target.value)} />
              </div>
            </div>

            {/* tipografía */}
            <div>
              <label className="font-serif" style={{ display: 'block', marginBottom: 6 }}>
                {t.fontLabel}
              </label>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                style={{ padding: '0.4rem 0.6rem' }}
              >
                {FONT_CHOICES.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            {/* eslóganes */}
            <h3 className="font-serif" style={{ fontSize: 18, margin: '12px 0 6px' }}>
              {t.pickSlogan}
            </h3>

            {!canPickSlogan ? (
              <p style={{ opacity: 0.7 }}>{t.needData}</p>
            ) : (
              <>
                <div role="radiogroup" aria-label="Sugerencias de eslogan" className="space-y-2">
                  {suggestions.map((s, i) => (
                    <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input
                        type="radio"
                        name="slogan"
                        value={i}
                        checked={picked === i}
                        onChange={() => {
                          setPicked(i);
                          setCustom('');
                        }}
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>

                <div style={{ marginTop: 12 }}>
                  <input
                    type="text"
                    placeholder={t.customSlogan}
                    value={custom}
                    onChange={(e) => {
                      setCustom(e.target.value);
                      if (e.target.value) setPicked(null);
                    }}
                    style={{ padding: '0.6rem', width: '100%' }}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              style={{
                marginTop: 16,
                padding: '0.7rem 1rem',
                opacity: canSubmit ? 1 : 0.5,
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                border: '1px solid #ccc',
                borderRadius: 6,
              }}
            >
              {t.generate}
            </button>
          </div>
        </form>

        {/* vista previa */}
        <aside
          style={{
            border: `1px solid ${color2}`,
            borderRadius: 12,
            padding: 16,
            background: color3,
          }}
        >
          <h4 className="font-serif" style={{ fontSize: 16, marginBottom: 10 }}>
            {t.previewTitle}
          </h4>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div
              aria-label="Logo"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: color1,
                color: '#222',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 700,
                border: `1px solid ${color2}`,
              }}
            >
              {initial}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontFamily: font, color: '#222' }}>
                {name || 'Brand Name'}
              </div>
              <div style={{ fontFamily: font, color: '#444', opacity: 0.8 }}>
                {chosenSlogan || 'Slogan'}
              </div>
            </div>
          </div>

          <div style={{ height: 4, background: color1, borderRadius: 4 }} />
        </aside>
      </div>
    </main>
  );
}

