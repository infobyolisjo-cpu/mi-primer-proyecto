'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { normalizeLang, t } from '@/lib/i18n';

export default function PayPage() {
  const router = useRouter();
  const params = useSearchParams();

  const lang = normalizeLang(params.get('lang'));
  const copy = useMemo(() => t(lang), [lang]);

  const name = params.get('name') || '';
  const slogan = params.get('slogan') || '';
  const colors = params.get('colors') || '';

  // Redirección a /download con ?file=...&lang=...
  useEffect(() => {
    const hasData = name.trim() && colors.trim();
    const timer = setTimeout(() => {
      const qs = new URLSearchParams();
      qs.set('lang', lang);
      if (hasData) {
        // aquí podrías generar un nombre de archivo dinámico si quieres
        qs.set('file', 'brand-kit-lite.zip');
      }
      router.replace(`/download?${qs.toString()}`);
    }, 1200);
    return () => clearTimeout(timer);
  }, [router, lang, name, colors]);

  return (
    <main style={{ padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.4rem', marginBottom: 10 }}>{copy.pay.title}</h1>
      <p>{copy.pay.preparing(name || '…')}</p>
      <p style={{ marginTop: 16, opacity: 0.7 }}>
        © 2025 ByOlisJo. {lang === 'es' ? 'Solo pruebas.' : 'For testing purposes only.'}
      </p>
    </main>
  );
}

