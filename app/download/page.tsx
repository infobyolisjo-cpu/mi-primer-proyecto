'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { normalizeLang, t } from '@/lib/i18n';

export default function DownloadPage() {
  const params = useSearchParams();

  const lang = normalizeLang(params.get('lang'));
  const copy = useMemo(() => t(lang), [lang]);

  const file = params.get('file') || 'brand-kit-lite.zip';
  const hasData = Boolean(params.get('file'));

  // Auto-descarga si hay datos
  useEffect(() => {
    if (!hasData) return;
    const a = document.createElement('a');
    a.href = `/api/zip?file=${encodeURIComponent(file)}`; // tu endpoint ZIP
    a.download = file;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, [hasData, file]);

  return (
    <main style={{ padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.4rem', marginBottom: 10 }}>{copy.download.title}</h1>

      {hasData ? (
        <>
          <p>{copy.download.auto}</p>
          <p style={{ marginTop: 6, opacity: 0.8 }}>{copy.download.tip}</p>
          <a
            href={`/api/zip?file=${encodeURIComponent(file)}`}
            download={file}
            style={{
              display: 'inline-block',
              marginTop: 14,
              border: '1px solid #ccc',
              padding: '8px 12px',
              borderRadius: 8,
            }}
          >
            {copy.download.direct}
          </a>
        </>
      ) : (
        <p
          style={{
            border: '1px solid #e99',
            padding: 12,
            borderRadius: 8,
            background: '#fff7f7',
          }}
        >
          {copy.download.fail}
        </p>
      )}

      <p style={{ marginTop: 16, opacity: 0.7 }}>
        © 2025 ByOlisJo. {lang === 'es' ? 'Solo pruebas.' : 'For testing purposes only.'}
      </p>
    </main>
  );
}

