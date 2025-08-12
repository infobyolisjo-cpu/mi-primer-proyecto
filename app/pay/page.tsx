'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Lang = 'es' | 'en';

const copy = {
  es: {
    title: 'Pago',
    preparing: (n: string) => `Preparando tu checkout para “${n}”…`,
    missing: 'Faltan datos. Te llevamos a la descarga para volver a generar.',
  },
  en: {
    title: 'Payment',
    preparing: (n: string) => `Preparing checkout for “${n}”…`,
    missing: 'Missing data. We’ll take you to download to re-generate.',
  },
} as const;

export default function PayPage() {
  const params = useSearchParams();
  const router = useRouter();

  // idioma
  const lang = (params.get('lang') === 'en' ? 'en' : 'es') as Lang;
  const t = copy[lang];

  // datos que vienen de / (home)
  const name = (params.get('name') || '').trim();
  const slogan = (params.get('slogan') || '').trim();
  const colors = (params.get('colors') || '').trim();

  // destino /download (siempre incluimos lang)
  const downloadQS = useMemo(() => {
    const qs = new URLSearchParams({
      file: 'brand-kit-lite.zip',
      lang,
    });
    // si faltan datos, avisamos para mostrar mensaje en /download
    if (!name || !slogan || !colors) qs.set('error', 'missing');
    return qs.toString();
  }, [lang, name, slogan, colors]);

  useEffect(() => {
    // Pequeña pausa para que el usuario vea el mensaje y luego vamos a /download
    const timer = setTimeout(() => {
      router.replace(`/download?${downloadQS}`);
    }, 1100);
    return () => clearTimeout(timer);
  }, [router, downloadQS]);

  const hasData = !!(name && slogan && colors);

  // Estilos mínimos para mantener tu estética
  const card: React.CSSProperties = {
    border: '1px solid #d9cdb4',
    background: '#fbf7ee',
    borderRadius: 8,
    padding: '1.25rem',
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '1.25rem' }}>
      <h1 style={{ fontFamily: 'serif', fontSize: 28, margin: '0 0 12px' }}>
        {t.title}
      </h1>

      <div style={card}>
        <p style={{ margin: 0, color: '#5a4d3b' }}>
          {hasData ? t.preparing(name) : t.missing}
        </p>
      </div>
    </div>
  );
}


