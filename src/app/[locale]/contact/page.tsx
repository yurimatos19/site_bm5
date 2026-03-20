import { getTranslations , setRequestLocale} from 'next-intl/server';
import ContactSection from '@/components/ContactSection';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });
  const title       = t('tag');
  const description = t('sub');
  return {
    title,
    description,
    openGraph: { title: `BM5 — ${title}`, description },
    twitter:   { title: `BM5 — ${title}`, description },
  };
}

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '5rem' }}>
      <ContactSection />
    </div>
  );
}
