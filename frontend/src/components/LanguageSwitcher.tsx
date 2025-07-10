import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageSwitcherProps {
  hideLabel?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ hideLabel }) => {
    const { language, setLanguage, t } = useLanguage();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as 'en' | 'es' | 'fr');
    };

    // Detectar si es móvil
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 600);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="language-switcher">
            {!hideLabel && (
              <label htmlFor="language-select">{t('terminal.select.language')}:</label>
            )}
            <select id="language-select" value={language} onChange={handleLanguageChange}>
                <option value="en">{isMobile ? "EN" : "English"}</option>
                <option value="es">{isMobile ? "ES" : "Español"}</option>
                <option value="fr">{isMobile ? "FR" : "Français"}</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;