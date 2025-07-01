import React from 'react';
import Link from 'next/link';
import WelcomeScreen from '../components/WelcomeScreen';

const Home: React.FC = () => {
  return (
    <div className="container">
      <WelcomeScreen />
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link href="/levels">
          <button className="unlock-button" style={{ width: 'auto', padding: '16px 32px' }}>
            Ver Niveles Desbloqueables
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;