// app/page.tsx
type SearchParams = { [key: string]: string | string[] | undefined };

export default function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const qParam = searchParams.q;
  const q = Array.isArray(qParam) ? qParam[0] : qParam;

  // ...tu lógica usando q sin hooks de cliente
  return (
    <main>
      <h1>Inicio</h1>
      {q ? <p>Buscando: {q}</p> : <p>Bienvenida a ByOlisJo</p>}
    </main>
  );
}
