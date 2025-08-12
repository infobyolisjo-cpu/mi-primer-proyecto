// lib/i18n.ts
export type Lang = 'es' | 'en';

export function normalizeLang(input?: string | null): Lang {
  return input === 'en' ? 'en' : 'es';
}

export const i18n = {
  es: {
    title: 'Tu Identidad de Marca en Minutos',
    labels: {
      name: 'Nombre del negocio',
      desc: 'Descripción breve',
      client: '¿Para quién trabajas? / cliente ideal',
      colors: 'Colores (hex, coma separados)',
      lang: 'Idioma',
      slogan: 'Elige un eslogan (o escríbelo)',
      customSlogan: 'Eslogan personalizado (opcional)',
    },
    actions: {
      create: 'Crear mi kit',
      preview: 'Vista previa',
      clear: 'Limpiar',
      continue: 'Continuar',
    },
    notices: {
      required: 'Completa al menos nombre y descripción.',
      saved: 'Guardado.',
    },
    suggestions: [
      'Tu marca, lista en minutos.',
      'Diseña. Descarga. Deslumbra.',
      'De concepto a kit en un clic.',
      'Haz visible la esencia de tu negocio.',
    ],
    pay: {
      title: 'Pago',
      preparing: (n: string) => `Preparando tu checkout para “${n}”…`,
    },
    download: {
      title: 'Descarga tu archivo',
      auto: 'Tu ZIP se descargará automáticamente.',
      fail: 'Faltan datos. Por favor vuelve a generar y pagar.',
      tip: 'Si no inicia la descarga, revisa bloqueadores de pop-ups o abre el enlace directo.',
      direct: 'Descargar ahora',
    },
  },
  en: {
    title: 'Your Brand Identity in Minutes',
    labels: {
      name: 'Business name',
      desc: 'Short description',
      client: 'Who do you work for? / ideal client',
      colors: 'Colors (hex, comma-separated)',
      lang: 'Language',
      slogan: 'Pick a tagline (or edit it)',
      customSlogan: 'Custom tagline (optional)',
    },
    actions: {
      create: 'Create my kit',
      preview: 'Preview',
      clear: 'Clear',
      continue: 'Continue',
    },
    notices: {
      required: 'Please fill in at least name and description.',
      saved: 'Saved.',
    },
    suggestions: [
      'Your brand, ready in minutes.',
      'Design. Download. Dazzle.',
      'From concept to kit in one click.',
      'Make your business essence visible.',
    ],
    pay: {
      title: 'Payment',
      preparing: (n: string) => `Preparing checkout for “${n}”…`,
    },
    download: {
      title: 'Download your file',
      auto: 'Your ZIP will download automatically.',
      fail: 'Missing data. Please go back, generate and pay.',
      tip: 'If the download does not start, check pop-up blockers or open the direct link.',
      direct: 'Download now',
    },
  },
} as const;

export function t(lang: Lang) {
  return i18n[lang];
}


