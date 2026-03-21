import { NextIntlClientProvider } from 'next-intl';
import { getTranslations , setRequestLocale} from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import SectionNav from '@/components/SectionNav';
import JsonLd from '@/components/JsonLd';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const SITE_URL = 'https://bm5comex.com';

/** Map next-intl locale codes → Open Graph locale strings */
const OG_LOCALE: Record<string, string> = {
  pt: 'pt_BR',
  en: 'en_US',
  de: 'de_DE',
  zh: 'zh_CN',
  es: 'es_ES',
  fr: 'fr_FR',
  ja: 'ja_JP',
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'hero' });

  const title       = `BM5 Comex — ${t('headline1')} ${t('headline2')} ${t('headline3')}`;
  const description = t('sub');
  const url         = `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      default:  title,
      template: '%s | BM5 Comex',
    },
    description,

    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map(loc => [loc, `${SITE_URL}/${loc}`])
      ),
    },

    openGraph: {
      title,
      description,
      url,
      siteName: 'BM5 Comex',
      locale:          OG_LOCALE[locale] ?? 'pt_BR',
      alternateLocale: routing.locales
        .filter(l => l !== locale)
        .map(l => OG_LOCALE[l] ?? l),
      type: 'website',
      // opengraph-image.tsx auto-generates — Next.js picks it up automatically
    },

    twitter: {
      card:        'summary_large_image',
      title,
      description,
      // opengraph-image.tsx is also used as twitter:image automatically
    },

    robots: {
      index:  true,
      follow: true,
      googleBot: {
        index:               true,
        follow:              true,
        'max-image-preview': 'large',
        'max-snippet':       -1,
        'max-video-preview': -1,
      },
    },

    other: {
      'geo.region':      'BR-PE',
      'geo.placename':   'Recife',
      'geo.position':    '-8.0631;-34.8711',
      'ICBM':            '-8.0631, -34.8711',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Load messages directly from the URL-derived locale param.
  // Bypasses getMessages() / cookie-based locale detection entirely.
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#05070D" />
        <JsonLd />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Nav />
          <main>{children}</main>
          <Footer />
          <WhatsAppFAB />
          <SectionNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
