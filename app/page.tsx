'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type Lang = 'es' | 'en';

const texts = {
  es: {
    title: 'Tu Identidad de Marca en Minutos',
    name: 'Nombre del negocio',
    desc: 'Descripción breve',
    client: '¿Para quién trabajas? / cliente ideal',
    pickSlogan: 'Elige un eslogan (o edítalo)',
    customSlogan: 'Eslogan personalizado (opcional)',
    generate: 'Generar kit',
    suggestions: [
      'Tu marca, lista en minutos.',
      'Diseña. Descarga. Deslumbra.',
      'Crea el kit de tu marca en un clic.',
      'Haz visible la esencia de tu negocio.',
    ],
    langLabel: 'Idioma',
  },
  en: {
    title: 'Your Brand Identity in Minutes',
    name: 'Business name',
    desc: 'Short description',
    client: 'Who do you work for? / ideal client',
    pickSlogan: 'Pick a tagline (or edit it)',
    customSlogan: 'Custom tagline (optional)',
    generate: 'Generate kit',
    suggestions: [
      'Your brand, ready in minutes.',
      'Design. Download. Dazzle.',
      'Create your brand kit in one click.',
      'Show the essence of your business.',
    ],
    langLabel: 'Language',
  },
} as const;

export default function HomePage() {
  const router = useRouter();

  // idioma
  const [lang, setLang] = useState<Lang>('es');
  useEffect(() => {
    const saved = (typeof window !== 'undefined' ? localStorage.getItem('lang') : null) as Lang | null;
    if (saved === 'es' || saved === 'en') setLang(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('lang', lang);
  }, [lang]);

  const t = texts[lang];

  // Campos
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [client, setClient] = useState('');

  // Slogans
  const suggestions = useMemo(() => t.suggestions, [t]);
  const [picked, setPicked] = useState<string>('');
  useEffect(() => {
    // cuando cambia el idioma, elegimos el primero por defecto
    setPicked(t.suggestions[0]);
    setCustom('');
  }, [lang]);  

  const [custom, setCustom] = useState('');
  const finalSlogan = custom.trim() ? custom.trim() : picked;

  function submit() {
    const colors = ['#8c6a43', '#e6dccf', '#fffaf3'].join(','); // cambia si ya tienes tus colores
    const qs = new URLSearchParams({
      name,
      slogan: finalSlogan,
      colors,
      lang, // <-- llevamos el idioma a /pay y /download
    });
    router.push(`/pay?${qs.toString()}`);
  }

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '1.25rem' }}>
      {/* Barra idioma */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8, gap: 8 }}>
        <label style={{ opacity: 0.7 }}>{t.langLabel}:</label>
        <select value={lang} onChange={e => setLang(e.target.value as Lang)}>
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>
      </div>

      <h1 className="font-serif text-2xl mb-2">{t.title}</h1>

      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <input
          placeholder={t.name}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder={t.desc}
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        <input
          placeholder={t.client}
          value={client}
          onChange={e => setClient(e.target.value)}
        />

        <div>
          <p style={{ marginBottom: 8 }}>{t.pickSlogan}</p>
          <div style={{ display: 'grid', gap: 6 }}>
            {suggestions.map((s, i) => (
              <label key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  type="radio"
                  name="slogan"
                  checked={!custom && picked === s}
                  onChange={() => { setPicked(s); setCustom(''); }}
                />
                <span>{s}</span>
              </label>
            ))}
            <label style={{ display: 'grid', gap: 6 }}>
              <span>{t.customSlogan}</span>
              <input
                placeholder={t.customSlogan}
                value={custom}
                onChange={e => setCustom(e.target.value)}
              />
            </label>
          </div>
        </div>

        <button onClick={submit} style={{ marginTop: 12 }}>{t.generate}</button>
      </div>
    </main>
  );
}

