// Server component — injects Organization + LocalBusiness JSON-LD structured data
// Content is 100% static and hardcoded — no user input involved, no XSS risk

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://bm5comex.com/#organization',
      name: 'BM5 Inteligência, Marketing e Comércio Exterior',
      alternateName: 'BM5 Comex',
      url: 'https://bm5comex.com',
      description:
        'Brazilian international trade company specialised in agricultural commodity export — Sugar ICUMSA 45, Soybeans, Corn, Poultry — with 30+ years of experience and world-class compliance protocols.',
      foundingDate: '1994',
      foundingLocation: { '@type': 'Place', name: 'Recife, Pernambuco, Brazil' },
      founder: {
        '@type': 'Person',
        name: 'Osvaldo Matos de Melo Júnior',
        jobTitle: 'CEO & Founder',
        email: 'Osvaldo@bm5comex.com',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua Cap. José da Luz, 107, Sala 203',
        addressLocality: 'Recife',
        addressRegion: 'PE',
        postalCode: '50070-540',
        addressCountry: 'BR',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+55-81-3265-0131',
          contactType: 'customer service',
          email: 'Osvaldo@bm5comex.com',
          availableLanguage: ['Portuguese','English','German','Spanish','French','Japanese','Chinese'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
            opens: '09:00',
            closes: '18:00',
          },
        },
        { '@type': 'ContactPoint', telephone: '+55-81-99103-2272', contactType: 'sales' },
      ],
      knowsAbout: [
        'International Trade','Commodity Export','Sugar ICUMSA 45','VHP Sugar',
        'Soybean Export','Corn Export','Chicken Paws Export','BCL SBLC DLC',
        'KYC Compliance','MT760 MT700 Documentary Credits',
      ],
      areaServed: { '@type': 'Place', name: 'Worldwide' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Brazilian Commodity Portfolio',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Sugar ICUMSA 45' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'VHP Sugar 600/1200' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Soybeans GMO & Non-GMO' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Yellow Corn' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Chicken Paws SIF' } },
        ],
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://bm5comex.com/#localbusiness',
      name: 'BM5 Comex',
      priceRange: '$$$$',
      telephone: '+55-81-3265-0131',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua Cap. José da Luz, 107, Sala 203',
        addressLocality: 'Recife',
        addressRegion: 'PE',
        postalCode: '50070-540',
        addressCountry: 'BR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: -8.0631, longitude: -34.8711 },
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
        opens: '09:00',
        closes: '18:00',
      }],
      url: 'https://bm5comex.com',
      parentOrganization: { '@id': 'https://bm5comex.com/#organization' },
    },
  ],
};

// Static JSON string — no runtime interpolation of user data
const SCHEMA_STRING = JSON.stringify(ORG_SCHEMA);

export default function JsonLd() {
  return (
    // eslint-disable-next-line react/no-danger
    <script
      type="application/ld+json"
      // Static hardcoded data only — safe from XSS
      dangerouslySetInnerHTML={{ __html: SCHEMA_STRING }}
    />
  );
}
