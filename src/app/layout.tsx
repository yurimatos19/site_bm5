import './globals.css';

// Minimal root layout — <html> and <body> are owned by [locale]/layout.tsx
// so that lang={locale} is set correctly for each language.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
