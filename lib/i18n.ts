export type Lang = 'es' | 'en';

export function detectLang(): Lang {
  if (typeof navigator !== 'undefined') {
    const n = navigator.language?.toLowerCase() || '';
    if (n.startsWith('es')) return 'es';
  }
  return 'en';
}

export const texts: Record<Lang, {
  title: string;
  subtitle: string;
  fields: {
    name: string;
    desc: string;
    client: string;
  };
  placeholders: {
    name: string;
    desc: string;
    client: string;
  };
  actions: {
    create: string;
    preview: string;
    clear: string;
    continue: string;
    lang_es: string;
    lang_en: string;
  };
  slogans: string[];
  preview: {
    heading: string;
    name: string;
    desc: string;
    client: string;
    colors: string;
  };
  notices: {
    required: string;
    saved: string;
  };
}> = {
  es: {
    title: 'ByOlisJo — Brand Kit Lite',
    subtitle: 'Tu identidad visual, sin complicaciones.',
    fields: {
      name: 'Nombre',
      desc: 'Descripción breve',
      client: '¿Para quién trabajas / cliente ideal?',
    },
    placeholders: {
      name: 'Ej: Olis Acosta',
      desc: 'Ej: Diseño y consultoría creativa',
      client: 'Ej: Emprendedores, E-commerce, etc.',
    },
    actions: {
      create: 'Crear mi kit',
      preview: 'Ver vista previa',
      clear: 'Limpiar',
      continue: 'Continuar',
      lang_es: 'ES',
      lang_en: 'EN',
    },
    slogans: [
      'Tu marca, lista en minutos.',
      'Diseña. Descarga. Deslumbra.',
      'Del concepto al kit, en un clic.',
      'Crea la imagen que tu negocio merece.',
    ],
    preview: {
      heading: 'Vista previa',
      name: 'Nombre',
      desc: 'Descripción',
      client: 'Cliente/Empresa',
      colors: 'Colores',
    },
    notices: {
      required: 'Por favor completa nombre y descripción.',
      saved: 'Datos guardados.',
    },
  },
  en: {
    title: 'ByOlisJo — Brand Kit Lite',
    subtitle: 'Your brand identity, made simple.',
    fields: {
      name: 'Name',
      desc: 'Brief description',
      client: 'Who you work for / ideal client',
    },
    placeholders: {
      name: 'e.g., Olis Acosta',
      desc: 'e.g., Creative design & consulting',
      client: 'e.g., Entrepreneurs, E-commerce, etc.',
    },
    actions: {
      create: 'Create my kit',
      preview: 'Show preview',
      clear: 'Clear',
      continue: 'Continue',
      lang_es: 'ES',
      lang_en: 'EN',
    },
    slogans: [
      'Your brand, ready in minutes.',
      'Design. Download. Dazzle.',
      'From concept to kit in one click.',
      'Create the image your business deserves.',
    ],
    preview: {
      heading: 'Preview',
      name: 'Name',
      desc: 'Description',
      client: 'Client/Company',
      colors: 'Colors',
    },
    notices: {
      required: 'Please fill in name and description.',
      saved: 'Saved.',
    },
  },
};

