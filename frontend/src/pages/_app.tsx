import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { TerminalProvider } from '../contexts/TerminalContext';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <TerminalProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </TerminalProvider>
    </LanguageProvider>
  );
}

export default MyApp;