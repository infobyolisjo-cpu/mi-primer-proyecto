'use client';
export const dynamic = 'force-dynamic';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function DownloadInner() {
  const params = useSearchParams();
  const ranRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const name = params.get('name') || '';
    const slogan = params.get('slogan') || '';
    const colorsParam = params.get('colors') || '';
    const colors = colorsParam ? colorsParam.split(',') : [];

    if (!name || !slogan || colors.length === 0) {
      setError('Faltan datos. Por favor vuelve a generar y pagar.');
      return;
    }

    (async () => {
      try {
        const res = await fetch('/api/zip', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, slogan, colors }),
        });

        if (!res.ok) {
          setError('No se pudo crear el ZIP.');
          return;
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name.replace(/\s+/g, '_')}_BrandKit.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        setReady(true);
      } catch {
        setError('Ocurrió un error al descargar.');
      }
    })();
  }, [params]);

  return (
    <main>
      <div className="card">
        <h2 className="font-serif text-xl mb-2">Descarga tu archivo</h2>
        {error ? (
          <div className="badge" style={{ borderColor: '#c55', color: '#c55' }}>
            {error}
          </div>
        ) : (
          <>
            <p>Tu ZIP se descargará automáticamente.</p>
            {ready && (
              <p style={{ opacity: 0.7, marginTop: 16 }}>
                *Si no inicia la descarga, revisa bloqueadores de pop‑ups o abre el enlace directo.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default function DownloadPage() {
  return (
    <Suspense fallback={<main><p>Preparando tu descarga…</p></main>}>
      <DownloadInner />
    </Suspense>
  );
}
