import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export',       // Gera site estático em /out para deploy via FTP (Locaweb)
  trailingSlash: true,    // /pt/about → /pt/about/index.html (compatível com Apache)
  images: {
    unoptimized: true,    // Imagens estáticas — não usa Next.js Image Optimization server
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
