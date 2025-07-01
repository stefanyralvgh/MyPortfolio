import React, { useState } from 'react';

const LanguageSwitcher = () => {
    const [language, setLanguage] = useState('en');

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
        // Here you can add logic to update the language context or state in your app
    };

    return (
        <div className="language-switcher">
            <label htmlFor="language-select">Select Language:</label>
            <select id="language-select" value={language} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;