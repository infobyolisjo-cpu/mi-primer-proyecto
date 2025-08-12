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
    suggestions: [
      'Tu marca, lista en minutos.',
      'Diseña. Descarga. Deslumbra.',
      'Crea el kit de tu marca en un clic.',
      'Haz visible la esencia de tu negocio.',
    ],
    previewTitle: 'Vista previa',
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
    suggestions: [
      'Your brand, ready in minutes.',
      'Design. Download. Dazzle.',
      'Create your brand kit in one click.',
      'Make your essence visible.',
    ],
    previewTitle: 'Preview',
  },
} as const;

export default function HomePage() {
  const router = useRouter();
  const search = useSearchParams();

  // idioma (se sincroniza con ?lang si llega)
  const [lang, setLang] = useState<Lang>('es');
  useEffect(() => {
    try {
      const q = search.get('lang');
      if (q === 'en' || q === 'es') setLang(q);
    } catch {}
  }, [search]);

  const t = texts[lang];

  // datos del formulario
  const [name, setName]   = useState('');
  const [desc, setDesc]   = useState('');
  const [client, setClient] = useState('');

  // eslóganes
  const suggestions = t.suggestions;
  const [picked, setPicked] = useState<number | null>(0); // por defecto el primero
  const [custom, setCustom] = useState('');

  // colores por defecto (si luego los haces configurables, pásalos aquí)
  const colors = ['#C8B28F', '#8C745B', '#E7DCC7'];

  // reglas de habilitación
  const canPickSlogan = useMemo(() => {
    return name.trim() !== '' && desc.trim() !== '' && client.trim() !== '';
  }, [name, desc, client]);

  const chosenSlogan = (custom.trim() !== '' ? custom.trim()
                    : picked !== null ? suggestions[picked] : '');

  const canSubmit = canPickSlogan && chosenSlogan !== '';

  // al cambiar idioma, actualizamos la URL (?lang=)
  function handleLangChange(newLang: Lang) {
    setLang(newLang);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    router.replace(url.toString());
  }

  // submit → ir a /pay con datos
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const url = new URL('/pay', window.location.origin);
    url.searchParams.set('name', name.trim());
    url.searchParams.set('slogan', chosenSlogan);
    url.searchParams.set('colors', colors.join(',')); // CSV
    url.searchParams.set('lang', lang);
    router.push(url.toString());
  }

  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: '1.5rem' }}>
      {/* Cabecera + selector de idioma */}
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

      <h1 className="font-serif" style={{ fontSize: 28, marginBottom: 16 }}>
        {t.title}
      </h1>

      {/* Layout principal: formulario + panel lateral */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Formulario */}
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
                        onChange={() => setPicked(i)}
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
                    onChange={(e) => setCustom(e.target.value)}
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

        {/* Panel lateral simple (puedes personalizarlo) */}
        <aside style={{ opacity: 0.9 }}>
          <h4 className="font-serif" style={{ fontSize: 16, marginBottom: 8 }}>
            {t.previewTitle}
          </h4>
          <ul style={{ lineHeight: 1.8 }}>
            {t.suggestions.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}

