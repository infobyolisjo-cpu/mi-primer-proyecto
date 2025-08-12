'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const copy = {
  es: {
    title: 'Pago',
    preparing: (n: string) => `Preparando tu checkout para “${n}”…`,
  },
  en: {
    title: 'Payment',
    preparing: (n: string) => `Preparing checkout for “${n}”…`,
  },
};

export default function PayPage() {
  const params = useSearchParams();
  const router = useRouter();

  const lang = (params.get('lang') === 'en' ? 'en' : 'es') as 'es' | 'en';
  const t = copy[lang];

  // tu lógica existente + llevar lang a /download
  useEffect(() => {
    const name = params.get('name') || '';
    const slogan = params.get('slogan') || '';
    const colors = params.get('colors') || '';

    // si falta algo, ir directo a /download con error (como lo tienes)
    const qs = new URLSearchParams({ file: 'brand-kit-lite.zip', lang });
    const to = `/download?${qs.toString()}`;
    const timer = setTimeout(() => router.replace(to), 1200);
    return () => clearTimeout(timer);
  }, [params, router, lang]);

  const name = params.get('name') || '—';
  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '1.25rem' }}>
      <h1 className="font-serif text-2xl mb-2">{t.title}</h1>
      <div className="card">
        <p>{t.preparing(name)}</p>
      </div>
    </main>
  );
}
