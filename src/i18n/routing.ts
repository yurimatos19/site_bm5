import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pt', 'en', 'de', 'zh', 'es', 'fr', 'ja'],
  defaultLocale: 'pt',
  // URL prefix is the single source of truth — never let cookies override it
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
