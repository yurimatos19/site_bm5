import { getTranslations } from 'next-intl/server';
import AboutSection from '@/components/AboutSection';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const title       = t('tag');
  const description = t('headline');
  return {
    title,
    description,
    openGraph: { title: `BM5 — ${title}`, description },
    twitter:   { title: `BM5 — ${title}`, description },
  };
}

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '5rem' }}>
      <AboutSection />
    </div>
  );
}
