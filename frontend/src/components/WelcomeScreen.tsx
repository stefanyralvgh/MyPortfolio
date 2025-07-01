import React from 'react';

const WelcomeScreen: React.FC = () => {
    const handleStartClick = () => {
        // Logic to navigate to the first level or start the interactive journey
    };

    return (
        <div className="welcome-screen">
            <h1>Hola, soy Stef. Backend Dev, exdentista y apasionada por construir cosas desde cero. ¿Quieres conocer mi historia?</h1>
            <button onClick={handleStartClick}>¡Vamos!</button>
        </div>
    );
};

export default WelcomeScreen;