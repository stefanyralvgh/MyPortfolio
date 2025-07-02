import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageSwitcherProps {
  hideLabel?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ hideLabel }) => {
    const { language, setLanguage, t } = useLanguage();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as 'en' | 'es' | 'fr');
    };

    return (
        <div className="language-switcher">
            {!hideLabel && (
              <label htmlFor="language-select">{t('terminal.select.language')}:</label>
            )}
            <select id="language-select" value={language} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;