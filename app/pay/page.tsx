'use client';

export const dynamic = 'force-dynamic';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

function buildDownloadURL(params: URLSearchParams) {
  const name = params.get('name') || '';
  const slogan = params.get('slogan') || '';
  const colors = params.get('colors') || '';
  const qs = new URLSearchParams({ name, slogan, colors }).toString();
  return `/download?${qs}`;
}

export default function PayPage() {
  const params = useSearchParams();
  const router = useRouter();

  const downloadHref = useMemo(() => buildDownloadURL(params), [params]);

  // Redirección automática cuando hay datos
  useEffect(() => {
    const name = params.get('name');
    const slogan = params.get('slogan');
    const colors = params.get('colors');
    if (name && slogan && colors) {
      const t = setTimeout(() => {
        router.replace(downloadHref);
      }, 1200); // 1.2s
      return () => clearTimeout(t);
    }
  }, [params, router, downloadHref]);

  return (
    <main>
      <div className="card">
        <h2 className="font-serif text-xl mb-2">Pago</h2>
        <p>Preparando tu checkout…</p>

        <a
          href={downloadHref}
          style={{
            display: 'inline-block',
            marginTop: 16,
            padding: '0.6rem 1rem',
            borderRadius: 12,
            border: '1px solid #bfa27a',
            textDecoration: 'none',
          }}
        >
          Ir a la descarga ahora
        </a>

        <p style={{ opacity: 0.7, marginTop: 8 }}>
          Si no te redirige en 2s, usa el botón.
        </p>
      </div>
    </main>
  );
}
