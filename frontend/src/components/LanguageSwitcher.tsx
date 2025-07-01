import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
    const { language, setLanguage, t } = useLanguage();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as 'en' | 'es' | 'fr');
    };

    return (
        <div className="language-switcher">
            <label htmlFor="language-select">{t('terminal.select.language')}:</label>
            <select id="language-select" value={language} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;