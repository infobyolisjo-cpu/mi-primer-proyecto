'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Lang = 'es' | 'en';

const copy = {
  es: { title: 'Pago', preparing: (n: string) => `Preparando tu checkout para “${n}”…` },
  en: { title: 'Payment', preparing: (n: string) => `Preparing checkout for “${n}”…` },
} as const;

function PayInner() {
  const params = useSearchParams();
  const router = useRouter();

  const lang = (params.get('lang') === 'en' ? 'en' : 'es') as Lang;
  const t = copy[lang];

  const name = (params.get('name') || '').trim();
  const slogan = (params.get('slogan') || '').trim();
  const colors = (params.get('colors') || '').trim();

  const canPay = useMemo(() => name !== '' && slogan !== '' && colors !== '', [name, slogan, colors]);

  useEffect(() => {
    // si faltan datos, redirige a /download con error
    if (!canPay) {
      const url = new URL('/download', window.location.origin);
      url.searchParams.set('lang', lang);
      router.replace(url.toString());
      return;
    }

    // aquí iría tu lógica con Stripe o paso intermedio; por ahora mandamos a /download con file + lang
    const to = new URL('/download', window.location.origin);
    to.searchParams.set('file', 'brand-kit-lite.zip');
    to.searchParams.set('lang', lang);

    const timer = setTimeout(() => router.replace(to.toString()), 1000);
    return () => clearTimeout(timer);
  }, [canPay, lang, router]);

  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: '1.5rem' }}>
      <section style={{ border: '1px solid #e9e2d9', background: '#fbf7f0', padding: '16px', borderRadius: 8 }}>
        <h2 className="font-serif" style={{ fontSize: 22, marginBottom: 8 }}>
          {t.title}
        </h2>
        <p style={{ opacity: 0.85 }}>{t.preparing(name || '—')}</p>
      </section>
    </main>
  );
}

export default function Page() {
  // ⬇️ IMPORTANTE: envolver en Suspense a quien usa useSearchParams()
  return (
    <Suspense fallback={<main style={{ maxWidth: 980, margin: '0 auto', padding: '1.5rem' }}>Cargando…</main>}>
      <PayInner />
    </Suspense>
  );
}



