import Hero from '@/components/Hero';
import { setRequestLocale } from 'next-intl/server';
import AboutSection from '@/components/AboutSection';
import PresenceSection from '@/components/PresenceSection';
import ShipDivider from '@/components/ShipDivider';
import ProductsSection from '@/components/ProductsSection';
import OsvaldoSection from '@/components/OsvaldoSection';
import ComplianceSection from '@/components/ComplianceSection';
import ContactSection from '@/components/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <PresenceSection />
      <ShipDivider />
      <ProductsSection />
      <OsvaldoSection />
      <ComplianceSection />
      <ContactSection />
    </>
  );
}
