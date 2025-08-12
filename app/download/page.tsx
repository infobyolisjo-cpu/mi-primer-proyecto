'use client';

import { useSearchParams } from 'next/navigation';

type Lang = 'es' | 'en';

const copy = {
  es: {
    title: 'Descarga tu archivo',
    auto: 'Tu ZIP se descargará automáticamente.',
    fail: 'Faltan datos. Por favor vuelve a generar y pagar.',
    tip: 'Si no inicia la descarga, revisa bloqueadores de pop-ups o abre el enlace directo.',
    btn: 'Descargar ahora',
  },
  en: {
    title: 'Download your file',
    auto: 'Your ZIP will download automatically.',
    fail: 'Missing data. Please go back, generate and pay.',
    tip: 'If it does not start, check pop-up blockers or open the direct link.',
    btn: 'Download now',
  },
} as const;

export default function DownloadPage() {
  const params = useSearchParams();

  // idioma
  const lang = (params.get('lang') === 'en' ? 'en' : 'es') as Lang;
  const t = copy[lang];

  // nombre de archivo (seguro por defecto)
  const file = (params.get('file') || 'brand-kit-lite.zip').trim();

  // Si venimos sin datos de /pay, el backend habrá puesto error=missing
  const hasError = params.get('error') === 'missing';

  // estilos mínimos
  const card: React.CSSProperties = {
    border: '1px solid #d9cdb4',
    background: '#fbf7ee',
    borderRadius: 8,
    padding: '1.25rem',
  };

  // enlace directo para forzar descarga por si el navegador no la inicia
  const directHref = `/api/zip?file=${encodeURIComponent(file)}&lang=${lang}`;

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '1.25rem' }}>
      <h1 style={{ fontFamily: 'serif', fontSize: 28, margin: '0 0 12px' }}>
        {t.title}
      </h1>

      <div style={card}>
        {!hasError ? (
          <>
            <p style={{ marginTop: 0 }}>{t.auto}</p>
            <p style={{ marginBottom: 12, opacity: 0.8 }}>{t.tip}</p>

            <a
              href={directHref}
              download
              style={{
                display: 'inline-block',
                border: '1px solid #c5b590',
                background: '#f3ead6',
                padding: '10px 14px',
                borderRadius: 8,
                textDecoration: 'none',
                color: '#3d3326',
              }}
            >
              {t.btn}
            </a>

            {/* Auto-descarga al entrar */}
            <AutoDownload href={directHref} />
          </>
        ) : (
          <>
            <p style={{ margin: 0, color: '#7a2e2e' }}>{t.fail}</p>
            <p style={{ opacity: 0.8 }}>
              {t.tip}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function AutoDownload({ href }: { href: string }) {
  // usamos un <iframe> oculto para disparar la descarga sin abrir nueva pestaña
  return (
    <iframe
      src={href}
      style={{ width: 0, height: 0, border: 0, visibility: 'hidden' }}
      title="auto-download"
    />
  );
}

