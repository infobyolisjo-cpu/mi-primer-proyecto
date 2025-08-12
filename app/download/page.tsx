'use client';

import { useSearchParams } from 'next/navigation';

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
};

export default function DownloadPage() {
  const params = useSearchParams();
  const lang = (params.get('lang') === 'en' ? 'en' : 'es') as 'es' | 'en';
  const t = copy[lang];

  const file = params.get('file') || 'brand-kit-lite.zip';
  const hasData = !!file;

  return (
    <main>
      <div className="card">
        <h2 className="font-serif text-xl mb-2">{t.title}</h2>
        {!hasData ? (
          <div className="badge" style={{ borderColor: '#c55', color: '#c55' }}>
            {t.fail}
          </div>
        ) : (
          <>
            <p className="text-sm opacity-70">{t.auto}</p>
            <a href={`/api/zip?file=${encodeURIComponent(file)}`} download>
              <button style={{ marginTop: 8 }}>Download</button>
            </a>
            <p className="text-sm opacity-70" style={{ marginTop: 8 }}>
              {t.tip}
            </p>
          </>
        )}
      </div>
    </main>
  );
}
