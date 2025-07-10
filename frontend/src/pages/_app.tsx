import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { LanguageProvider } from '../contexts/LanguageContext';
import { TerminalProvider } from '../contexts/TerminalContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <TerminalProvider>
        <Component {...pageProps} />
      </TerminalProvider>
    </LanguageProvider>
  );
}

export default MyApp;