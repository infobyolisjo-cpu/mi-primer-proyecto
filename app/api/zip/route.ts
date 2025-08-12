// app/api/zip/route.ts
import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';

export const runtime = 'nodejs';           // JSZip necesita Node, no Edge
export const dynamic = 'force-dynamic';    // evita intentos de cacheo

type Lang = 'es' | 'en';

function sanitizeFileName(name: string) {
  return name.replace(/[^\w.-]+/g, '_');
}
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m] as string));
}

async function buildZip(input: { name: string; slogan: string; colors: string[]; lang: Lang }) {
  const { name, slogan, colors, lang } = input;
  const primary = (colors[0] || '#111111').trim();

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
        font-family="system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif"
        font-size="72" fill="${primary}">${escapeHtml(name)}</text>
</svg>`.trim();

  const readme =
    lang === 'en'
      ? `Thanks for using ByOlisJo Brand Kit Lite!

Files:
- colors.txt   -> the palette you entered
- slogan.txt   -> your slogan
- logo.svg     -> simple wordmark (first color applied)
`
      : `¡Gracias por usar ByOlisJo Brand Kit Lite!

Archivos:
- colors.txt   -> la paleta de colores ingresada
- slogan.txt   -> tu eslogan
- logo.svg     -> wordmark sencillo (usa el primer color)
`;

  const zip = new JSZip();
  zip.file('README.txt', readme);
  zip.file('colors.txt', colors.join('\n'));
  zip.file('slogan.txt', slogan);
  zip.file('logo.svg', svg);

  return zip;
}

function parseCommon(params: URLSearchParams | Record<string, any>) {
  const get = (k: string) =>
    params instanceof URLSearchParams ? params.get(k) ?? '' : (params[k] ?? '');
  const name = (get('name') || 'Brand').toString().trim();
  const slogan = (get('slogan') || '').toString().trim();
  const lang: Lang = (get('lang') === 'en' ? 'en' : 'es');
  const colorsRaw =
    (get('colors') || get('col') || '').toString();
  const colors = colorsRaw
    .split(',')
    .map((c: string) => c.trim())
    .filter(Boolean);

  return { name, slogan, colors, lang };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { name, slogan, colors, lang } = parseCommon(searchParams);

    if (!name || !slogan || colors.length === 0) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    const fileParam = searchParams.get('file') || `${sanitizeFileName(name)}_BrandKit.zip`;
    const zip = await buildZip({ name, slogan, colors, lang });
    const buf = await zip.generateAsync({ type: 'nodebuffer' });

    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${sanitizeFileName(fileParam)}"`,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, slogan, colors, lang } = parseCommon(body);
    if (!name || !slogan || !colors || colors.length === 0) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }
    const filename = (body.file || `${sanitizeFileName(name)}_BrandKit.zip`).toString();

    const zip = await buildZip({ name, slogan, colors, lang });
    const buf = await zip.generateAsync({ type: 'nodebuffer' });

    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${sanitizeFileName(filename)}"`,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}


