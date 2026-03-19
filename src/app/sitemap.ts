import { MetadataRoute } from 'next';

const BASE_URL = 'https://bm5comex.com';
const LOCALES  = ['pt', 'en', 'de', 'zh', 'es', 'fr', 'ja'] as const;
const PAGES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '',             priority: 1.0, freq: 'weekly'  },
  { path: '/products',   priority: 0.9, freq: 'monthly' },
  { path: '/contact',    priority: 0.9, freq: 'monthly' },
  { path: '/about',      priority: 0.7, freq: 'monthly' },
  { path: '/leadership', priority: 0.7, freq: 'monthly' },
  { path: '/compliance', priority: 0.7, freq: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of PAGES) {
      entries.push({
        url:              `${BASE_URL}/${locale}${page.path}`,
        lastModified:     now,
        changeFrequency:  page.freq,
        priority:         page.priority,
      });
    }
  }

  return entries;
}
