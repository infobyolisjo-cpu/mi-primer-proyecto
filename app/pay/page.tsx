'use client';

import { Suspense, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function buildDownloadURL(params: URLSearchParams) {
  const name = params.get('name') || '';
  const slogan = params.get('slogan') || '';
  const colors = params.get('colors') || '';

  // Validamos datos mínimos
  if (!name || !slogan || !colors) return null;

  // El nombre del archivo para el ZIP
  const safe = (s: string) => s.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-]/g, '');
  const fileName = `${safe(name)}_BrandKit.zip`;

  // Armamos la query que /download usará para generar el ZIP
  const qs = new URLSearchParams({
    name,
    slogan,
    colors, // puede venir “#RRGGBB,#RRGGBB,...” URL-encoded
    file: fileName,
  });

  return `/download?${qs.toString()}`;
}

function PayInner() {
  const params = useSearchParams();
  const router = useRouter();

  const downloadHref = useMemo(() => buildDownloadURL(params), [params]);

  useEffect(() => {
    if (!downloadHref) return;
    // Prefetch por performance
    router.prefetch(downloadHref);
    // Redirección con pequeño delay
    const t = setTimeout(() => {
      router.replace(downloadHref);
    }, 900);

    return () => clearTimeout(t);
  }, [downloadHref, router]);

  return (
    <main style={{ padding: '2rem', maxWidth: 760, margin: '0 auto' }}>
      <div className="card">
        <h2 className="font-serif text-xl mb-2">Pago</h2>
        {!downloadHref ? (
          <div className="badge" style={{ borderColor: '#c55', color: '#c55' }}>
            Faltan datos para continuar. Vuelve a generar tu kit.
          </div>
        ) : (
          <>
            <p style={{ opacity: 0.8 }}>Preparando tu checkout…</p>
            <p style={{ opacity: 0.7, marginTop: 16 }}>
              Si no avanza automáticamente, usa el botón:
            </p>
            <a href={downloadHref}>
              <button
                style={{
                  padding: '0.8rem 1.2rem',
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: 8,
                }}
              >
                Continuar a la descarga
              </button>
            </a>
          </>
        )}
      </div>
    </main>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={<main style={{ padding: '2rem' }}><p>Preparando…</p></main>}>
      <PayInner />
    </Suspense>
  );
}
