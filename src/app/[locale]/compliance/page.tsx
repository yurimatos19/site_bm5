import { getTranslations } from 'next-intl/server';
import ComplianceSection from '@/components/ComplianceSection';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'compliance' });
  const title       = t('tag');
  const description = t('sub');
  return {
    title,
    description,
    openGraph: { title: `BM5 — ${title}`, description },
    twitter:   { title: `BM5 — ${title}`, description },
  };
}

export default function CompliancePage() {
  return (
    <div style={{ paddingTop: '5rem' }}>
      <ComplianceSection />
    </div>
  );
}
