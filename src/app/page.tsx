/**
 * Página raiz — redireciona para o idioma padrão (/pt).
 * Necessário porque o site usa export estático (output: 'export')
 * e o middleware next-intl não executa em hospedagem estática.
 */
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/pt');
}
