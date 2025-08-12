export const runtime = 'nodejs';
import JSZip from 'jszip';
import { NextResponse } from 'next/server';

// Maneja el flujo actual: /download hace POST con { name, slogan, colors }
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    let { name, slogan, colors } = body as {
      name?: string;
      slogan?: string;
      colors?: string[] | string;
    };

    if (!name || !slogan || !colors) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // Normaliza colores: puede venir como array o como "hex1,hex2,hex3"
    const colorArr = Array.isArray(colors)
      ? colors
      : String(colors).split(',').map(s => s.trim()).filter(Boolean);

    const primary = colorArr[0] || '#111111';

    // ZIP de ejemplo
    const zip = new JSZip();
    zip.file(
      'README.txt',
      [
        'ByOlisJo — Brand Kit Lite',
        '',
        `Nombre: ${name}`,
        `Slogan: ${slogan}`,
        `Colores: ${colorArr.join(', ')}`,
        '',
        'Estructura:',
        '- /logos/',
        '- /colores/',
        '- /tipografia/',
        '',
      ].join('\n')
    );

    // Paleta y slogan
    zip.folder('colores')?.file('paleta.txt', colorArr.join('\n'));
    zip.folder('tipografia')?.file('slogan.txt', slogan);

    // Logo SVG simple (sin dependencias externas)
    const safeText = (t: string) =>
      t.replace(/[<>&'"]/g, s => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[s]!));
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400">
  <rect width="100%" height="100%" fill="${primary}"/>
  <text x="50%" y="50%" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="64" text-anchor="middle" dominant-baseline="middle">
    ${safeText(name)}
  </text>
</svg>`;
    zip.folder('logos')?.file('logo.svg', svg.trim());

    const content = await zip.generateAsync({ type: 'nodebuffer' });

    const fileName = `${name.replace(/\s+/g, '_')}_BrandKit.zip`;
    return new Response(content, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}

// (Opcional) Soporte GET para pruebas rápidas: /api/zip?file=brand-kit-lite.zip
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const file = (searchParams.get('file') || 'brand-kit-lite.zip').replace(/[^a-zA-Z0-9._-]/g, '_');

  const zip = new JSZip();
  zip.file('README.txt', 'ZIP de prueba (GET) — ByOlisJo');
  zip.folder('logos')?.file('logo.txt', 'Coloca aquí tus logos');
  const content = await zip.generateAsync({ type: 'nodebuffer' });

  return new Response(content, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${file}"`,
    },
  });
}

