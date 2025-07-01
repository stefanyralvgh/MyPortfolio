import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  es: {
    'terminal.welcome': 'Bienvenido a la Aventura de Código de Stef! 🚀',
    'terminal.help': 'Comandos disponibles:',
    'terminal.start': 'Comenzar la aventura',
    'terminal.about': 'Acerca de Stef',
    'terminal.lang': 'Cambiar idioma (es/en/fr)',
    'terminal.clear': 'Limpiar terminal',
    'terminal.about.stef': 'Stef - Desarrolladora Backend\nEx-dentista convertida en entusiasta del código\nApasionada por construir cosas desde cero\nAma depurar y resolver problemas complejos',
    'terminal.language.changed': 'Idioma cambiado a',
    'terminal.command.not.found': 'Comando no encontrado:',
    'terminal.type.help': 'Escribe "help" para ver comandos disponibles.',
    'adventure.title': '🚀 Aventura de Código de Stef',
    'adventure.level': 'Nivel',
    'adventure.of': 'de',
    'adventure.completed': '¡Aventura Completada!',
    'adventure.finale.message': 'Gracias por recorrer mi historia técnica. Si llegaste hasta aquí... ¡Imagina lo que podríamos construir juntos!',
    'adventure.stats.completed': 'Niveles Completados',
    'adventure.stats.debugging': 'Habilidades de Debugging',
    'adventure.stats.possibilities': 'Posibilidades',
    'adventure.actions.cv': '📄 Descargar CV',
    'adventure.actions.linkedin': '🤝 Conectar por LinkedIn',
    'adventure.actions.repo': '🛠️ Ver Repositorio Backend',
    'adventure.actions.restart': '🔄 Jugar de Nuevo',
    'adventure.back': '← Volver al Terminal',
    'challenge.select.solution': '¿Cuál es la solución correcta?',
    'challenge.correct': '¡Correcto!',
    'challenge.incorrect': 'Incorrecto',
    'challenge.excellent': '¡Excelentes habilidades de debugging!',
    'challenge.dont.worry': 'No te preocupes, aprenderemos juntos.',
    'challenge.continue': 'Continuar',
    'challenge.explanation': '💡 Explicación',
    'challenge.see.story': 'Ver mi historia',
    'story.unlocked': '🎉 ¡Nivel Desbloqueado!',
    'story.tech.used': 'Tecnologías utilizadas:',
    'story.next.level': 'Siguiente Nivel',
    'story.complete.adventure': 'Completar Aventura'
  },
  en: {
    'terminal.welcome': 'Welcome to Stef\'s Code Adventure! 🚀',
    'terminal.help': 'Available commands:',
    'terminal.start': 'Begin the adventure',
    'terminal.about': 'About Stef',
    'terminal.lang': 'Change language (es/en/fr)',
    'terminal.clear': 'Clear terminal',
    'terminal.about.stef': 'Stef - Backend Developer\nEx-dentist turned code enthusiast\nPassionate about building things from scratch\nLoves debugging and solving complex problems',
    'terminal.language.changed': 'Language changed to',
    'terminal.command.not.found': 'Command not found:',
    'terminal.type.help': 'Type "help" to see available commands.',
    'adventure.title': '🚀 Stef\'s Code Adventure',
    'adventure.level': 'Level',
    'adventure.of': 'of',
    'adventure.completed': 'Adventure Completed!',
    'adventure.finale.message': 'Thank you for exploring my technical story. If you made it this far... Imagine what we could build together!',
    'adventure.stats.completed': 'Levels Completed',
    'adventure.stats.debugging': 'Debugging Skills',
    'adventure.stats.possibilities': 'Possibilities',
    'adventure.actions.cv': '📄 Download CV',
    'adventure.actions.linkedin': '🤝 Connect on LinkedIn',
    'adventure.actions.repo': '🛠️ View Backend Repository',
    'adventure.actions.restart': '🔄 Play Again',
    'adventure.back': '← Back to Terminal',
    'challenge.select.solution': 'What is the correct solution?',
    'challenge.correct': 'Correct!',
    'challenge.incorrect': 'Incorrect',
    'challenge.excellent': 'Excellent debugging skills!',
    'challenge.dont.worry': 'Don\'t worry, we\'ll learn together.',
    'challenge.continue': 'Continue',
    'challenge.explanation': '💡 Explanation',
    'challenge.see.story': 'See my story',
    'story.unlocked': '🎉 Level Unlocked!',
    'story.tech.used': 'Technologies used:',
    'story.next.level': 'Next Level',
    'story.complete.adventure': 'Complete Adventure'
  },
  fr: {
    'terminal.welcome': 'Bienvenue dans l\'Aventure de Code de Stef! 🚀',
    'terminal.help': 'Commandes disponibles:',
    'terminal.start': 'Commencer l\'aventure',
    'terminal.about': 'À propos de Stef',
    'terminal.lang': 'Changer de langue (es/en/fr)',
    'terminal.clear': 'Effacer le terminal',
    'terminal.about.stef': 'Stef - Développeuse Backend\nEx-dentiste devenue passionnée de code\nPassionnée par la construction depuis zéro\nAime déboguer et résoudre des problèmes complexes',
    'terminal.language.changed': 'Langue changée en',
    'terminal.command.not.found': 'Commande non trouvée:',
    'terminal.type.help': 'Tapez "help" pour voir les commandes disponibles.',
    'adventure.title': '🚀 Aventure de Code de Stef',
    'adventure.level': 'Niveau',
    'adventure.of': 'sur',
    'adventure.completed': 'Aventure Terminée!',
    'adventure.finale.message': 'Merci d\'avoir exploré mon histoire technique. Si vous êtes arrivé jusqu\'ici... Imaginez ce que nous pourrions construire ensemble!',
    'adventure.stats.completed': 'Niveaux Terminés',
    'adventure.stats.debugging': 'Compétences de Débogage',
    'adventure.stats.possibilities': 'Possibilités',
    'adventure.actions.cv': '📄 Télécharger CV',
    'adventure.actions.linkedin': '🤝 Se connecter sur LinkedIn',
    'adventure.actions.repo': '🛠️ Voir le Repository Backend',
    'adventure.actions.restart': '🔄 Rejouer',
    'adventure.back': '← Retour au Terminal',
    'challenge.select.solution': 'Quelle est la solution correcte?',
    'challenge.correct': 'Correct!',
    'challenge.incorrect': 'Incorrect',
    'challenge.excellent': 'Excellentes compétences de débogage!',
    'challenge.dont.worry': 'Ne vous inquiétez pas, nous apprendrons ensemble.',
    'challenge.continue': 'Continuer',
    'challenge.explanation': '💡 Explication',
    'challenge.see.story': 'Voir mon histoire',
    'story.unlocked': '🎉 Niveau Débloqué!',
    'story.tech.used': 'Technologies utilisées:',
    'story.next.level': 'Niveau Suivant',
    'story.complete.adventure': 'Terminer l\'Aventure'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 