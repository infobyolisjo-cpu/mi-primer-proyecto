'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { normalizeLang, t, type Lang } from '@/lib/i18n';

type FormState = {
  name: string;
  desc: string;
  client: string;
  colors: string; // CSV: "#C5B13B,#3BB044,#43C4A3"
  lang: Lang;
  slogan: string;       // opción elegida
  customSlogan: string; // si escribe uno propio
};

export default function HomePage() {
  const router = useRouter();
  const params = useSearchParams();

  const initialLang = normalizeLang(params.get('lang'));
  const [form, setForm] = useState<FormState>({
    name: '',
    desc: '',
    client: '',
    colors: '#C5B13B,#3BB044,#43C4A3',
    lang: initialLang,
    slogan: '',
    customSlogan: '',
  });

  // Traducciones según idioma
  const copy = useMemo(() => t(form.lang), [form.lang]);

  // Cuando cambia el lang del query, sincroniza
  useEffect(() => {
    const qLang = normalizeLang(params.get('lang'));
    if (qLang !== form.lang) {
      setForm((f) => ({ ...f, lang: qLang }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // slogan final preferirá el custom si existe, sino el elegido
  const finalSlogan = form.customSlogan.trim() || form.slogan.trim();

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const handleLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLang = normalizeLang(e.target.value);
    setForm((f) => ({ ...f, lang: nextLang }));
    // actualiza la URL con ?lang=
    const qs = new URLSearchParams(Array.from(params.entries()));
    qs.set('lang', nextLang);
    router.replace(`/?${qs.toString()}`);
  };

  const handleSuggestion = (s: string) => {
    setForm((f) => ({ ...f, slogan: s, customSlogan: '' }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.desc.trim()) {
      alert(copy.notices.required);
      return;
    }
    const qs = new URLSearchParams();
    qs.set('name', form.name);
    qs.set('slogan', finalSlogan || '');
    qs.set('colors', form.colors);
    qs.set('lang', form.lang);
    router.push(`/pay?${qs.toString()}`);
  };

  return (
    <main style={{ padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{copy.title}</h1>

      {/* Idioma */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
          {copy.labels.lang}
        </label>
        <select value={form.lang} onChange={handleLang}>
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Nombre */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
          {copy.labels.name}
        </label>
        <input
          value={form.name}
          onChange={handleChange('name')}
          placeholder="ByOlisJo"
          style={{ width: '100%' }}
        />
      </div>

      {/* Descripción */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
          {copy.labels.desc}
        </label>
        <input
          value={form.desc}
          onChange={handleChange('desc')}
          placeholder={
            form.lang === 'es'
              ? 'Joyería artesanal con piedras inspiradas en la luna'
              : 'Handcrafted jewelry with moon-inspired stones'
          }
          style={{ width: '100%' }}
        />
      </div>

      {/* Cliente */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
          {copy.labels.client}
        </label>
        <input
          value={form.client}
          onChange={handleChange('client')}
          placeholder={
            form.lang === 'es'
              ? 'Mujeres 25-45 que valoran el diseño artesanal'
              : 'Women 25-45 who value artisanal design'
          }
          style={{ width: '100%' }}
        />
      </div>

      {/* Colores */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
          {copy.labels.colors}
        </label>
        <input
          value={form.colors}
          onChange={handleChange('colors')}
          placeholder="#C5B13B,#3BB044,#43C4A3"
          style={{ width: '100%' }}
        />
        <small>
          {form.lang === 'es'
            ? 'Ejemplo: #C5B13B,#3BB044,#43C4A3'
            : 'Example: #C5B13B,#3BB044,#43C4A3'}
        </small>
      </div>

      {/* Slogan sugerido + personalizado */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
          {copy.labels.slogan}
        </label>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
          {copy.suggestions.slice(0, 4).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSuggestion(s)}
              style={{
                border: '1px solid #ddd',
                padding: '6px 10px',
                background: form.slogan === s ? '#f2f2f2' : 'white',
                cursor: 'pointer',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <input
          value={form.customSlogan}
          onChange={handleChange('customSlogan')}
          placeholder={copy.labels.customSlogan}
          style={{ width: '100%' }}
        />
      </div>

      {/* Botón crear */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #ccc',
            cursor: 'pointer',
          }}
        >
          {copy.actions.create}
        </button>

        <button
          type="button"
          onClick={() =>
            setForm({
              name: '',
              desc: '',
              client: '',
              colors: '#C5B13B,#3BB044,#43C4A3',
              lang: form.lang,
              slogan: '',
              customSlogan: '',
            })
          }
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #ccc',
            cursor: 'pointer',
            background: '#fafafa',
          }}
        >
          {copy.actions.clear}
        </button>
      </div>

      <p style={{ marginTop: 16, opacity: 0.7 }}>
        © 2025 ByOlisJo. {form.lang === 'es' ? 'Solo pruebas.' : 'For testing purposes only.'}
      </p>
    </main>
  );
}

