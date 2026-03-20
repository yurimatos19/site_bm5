import { getTranslations , setRequestLocale} from 'next-intl/server';
import LeadershipSection from '@/components/LeadershipSection';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'leadership' });
  const title       = t('tag');
  const description = t('headline');
  return {
    title,
    description,
    openGraph: { title: `BM5 — ${title}`, description },
    twitter:   { title: `BM5 — ${title}`, description },
  };
}

export default function LeadershipPage() {
  return (
    <div style={{ paddingTop: '5rem' }}>
      <LeadershipSection />
    </div>
  );
}
