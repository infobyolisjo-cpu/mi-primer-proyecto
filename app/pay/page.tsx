'use client';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function PayInner() {
  const params = useSearchParams();
  const name = params.get('name') || '';
  return (
    <main>
      <div className="card">
        <h2 className="font-serif text-xl mb-2">Pago</h2>
        <p style={{ opacity: 0.8 }}>
          Preparando tu checkout {name ? `para “${name}”` : ''}…
        </p>
      </div>
    </main>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={<main><p>Cargando pago…</p></main>}>
      <PayInner />
    </Suspense>
  );
}

