import React from 'react';
import InteractiveTerminal from '../components/InteractiveTerminal';

const Home: React.FC = () => {
  return (
    <>
      <div className="home-container">
        <InteractiveTerminal />
      </div>
      <footer className="site-footer" style={{
        textAlign: 'center',
        color: '#f3b1e6',
        fontSize: '0.95rem',
        marginTop: '2rem',
        opacity: 0.7
      }}>
        © 2025 Stefany Ramos Alvis | Backend Developer. All rights reserved.
      </footer>
    </>
  );
};

export default Home;