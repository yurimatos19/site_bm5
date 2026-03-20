import Hero from '@/components/Hero';
import { setRequestLocale } from 'next-intl/server';
import PresenceSection from '@/components/PresenceSection';
import AboutSection from '@/components/AboutSection';
import ProductsSection from '@/components/ProductsSection';
import LeadershipSection from '@/components/LeadershipSection';
import ComplianceSection from '@/components/ComplianceSection';
import ContactSection from '@/components/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PresenceSection />
      <AboutSection />
      <ProductsSection />
      <LeadershipSection />
      <ComplianceSection />
      <ContactSection />
    </>
  );
}
