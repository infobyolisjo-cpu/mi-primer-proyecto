'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

type Lang = 'es' | 'en';

const copy = {
  es: {
    title: 'Descarga tu archivo',
    auto: 'Tu ZIP se descargará automáticamente.',
    fail: 'Faltan datos. Por favor vuelve a generar y pagar.',
    tip: 'Si no inicia la descarga, revisa bloqueadores de pop-ups o abre el enlace directo.',
  },
  en: {
    title: 'Download your file',
    auto: 'Your ZIP will download automatically.',
    fail: 'Missing data. Please go back, generate and pay.',
    tip: 'If it does not start, check pop-up blockers or open the direct link.',
  },
} as const;

function DownloadInner() {
  const params = useSearchParams();
  const lang = (params.get('lang') === 'en' ? 'en' : 'es') as Lang;
  const t = copy[lang];

  const file = params.get('file') || 'brand-kit-lite.zip';
  const hasData = !!file;

  // dispara descarga automática si hay archivo
  if (hasData) {
    try {
      const a = document.createElement('a');
      a.href = `/api/zip?file=${encodeURIComponent(file)}&lang=${lang}`;
      a.download = file;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {}
  }

  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: '1.5rem' }}>
      <section style={{ border: '1px solid #e9e2d9', background: '#fbf7f0', padding: '16px', borderRadius: 8 }}>
        <h2 className="font-serif" style={{ fontSize: 22, marginBottom: 8 }}>
          {t.title}
        </h2>

        {hasData ? (
          <>
            <p>{t.auto}</p>
            <p style={{ opacity: 0.7, marginTop: 8 }}>{t.tip}</p>
          </>
        ) : (
          <p style={{ color: '#a33' }}>{t.fail}</p>
        )}
      </section>
    </main>
  );
}

export default function Page() {
  // ⬇️ IMPORTANTE: envolver en Suspense a quien usa useSearchParams()
  return (
    <Suspense fallback={<main style={{ maxWidth: 980, margin: '0 auto', padding: '1.5rem' }}>Cargando…</main>}>
      <DownloadInner />
    </Suspense>
  );
}


