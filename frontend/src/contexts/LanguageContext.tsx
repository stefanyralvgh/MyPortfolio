import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);


const translations = {
  es: {
    'terminal.welcome': '¡Hola! Bienvenida/o a la aventura de Stef ✨ Este portafolio es una simulación de terminal interactiva, pensada para personas curiosas y amantes del código',
    'terminal.help': 'Comandos disponibles:',
    'terminal.help.prompt': '¿Primera vez aquí? Escribe `help` y comienza a explorar...',
    'terminal.starting.adventure': 'Iniciando la Aventura de Código de Stef...',
    'terminal.redirecting.level': 'Redirigiendo al nivel 1...',
    'terminal.start': 'Empieza la aventura: un recorrido por mi historia tech...',
    'terminal.about': 'Conoce quién soy, qué me apasiona y por qué dejé la odontología por el código',
    'terminal.projects': 'Mira lo que he construido: con amor, lógica y muuucho debugging!',
    'terminal.stack': 'Ver mi stack técnico y herramientas',
    'terminal.recruiter-mode': 'Vía rápida para reclutadores ⏭️ – sin rodeos, solo los hechos',
    'terminal.clear': 'Limpiar la pantalla y empezar de nuevo',
    'terminal.select.language': 'Elige tu idioma',
    'terminal.about.stef': 'Stef – Desarrolladora Backend\nEx-odontóloga convertida en dev\nAma construir desde cero, depurar profundamente y hacer que las cosas funcionen\nObsesionada con APIs limpias y buena arquitectura.',
    'terminal.language.changed': 'Idioma cambiado a',
    'terminal.command.not.found': '¡Ups! Comando desconocido:',
    'terminal.type.help': '¿Necesitas ayuda? Escribe "help" y te guiaré',
    'terminal.projects.redirecting': 'Redirigiendo a los proyectos de Stef...',
    'terminal.stack.redirecting': 'Redirigiendo a la vista del stack técnico...',
    'terminal.recruiter.activated': '⏩ ¡Vía rápida activada!',
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
    'adventure.back': 'Volver al Terminal',
    'adventure.correct': '¡Correcto!',
    'adventure.incorrect': 'No era esa 😅',
    'adventure.next': 'Siguiente reto',
    'adventure.restart': 'Reiniciar',
    'projects.title': 'Mis Proyectos',
    'projects.subtitle': 'Aquí tienes algunos de los proyectos en los que he trabajado',
    'projects.back': '← Volver al Terminal',
    'recruiter.title': 'Modo Reclutador',
    'recruiter.intro': '¡Hola! Soy Stef, desarrolladora backend con mentalidad de producto, fuertes habilidades en diseño de APIs y un profundo interés en arquitectura escalable.',

  },
    en: {
    'terminal.welcome': 'Hi! Welcome to Stef\'s adventure ✨ This portfolio is a playful terminal simulation, made for devs and the curious alike.',
    'terminal.help': 'Available commands:',
    'terminal.help.prompt': 'Not sure where to start? Type "help" and explore away...',

    'terminal.starting.adventure': 'Starting Stef\'s Code Adventure...',
    'terminal.start': 'Start the adventure – a journey through my tech story...',
    'terminal.redirecting.level': 'Redirecting to level 1...',
    'terminal.about': 'Learn who I am, what I love, and why I left dentistry for code',
    'terminal.projects': 'See what I\'ve built – with love, logic, and lots of debugging!',
    'terminal.stack': 'View my technical stack and tools',
    'terminal.recruiter-mode': 'Fast track for recruiters ⏭️ – no distractions, just the facts',
    'terminal.clear': 'Clear the screen and get a fresh start',
    'terminal.select.language': 'Choose your language',
    'terminal.about.stef': 'Stef – Backend Developer\nEx-dentist turned dev\nLoves building from scratch, debugging deeply, and making things work \nObsessed with clean APIs and good architecture.',
    'terminal.command.not.found': 'Oops! Unknown command:',
    'terminal.type.help': 'Need help? Type "help" and I\'ll guide you',
    'terminal.projects.redirecting': 'Redirecting to Stef\'s projects ...',
    'terminal.stack.redirecting': 'Redirecting to tech stack view...',
    'terminal.recruiter.activated': '⏩ Fast track activated!',
    'adventure.title': 'Stef\'s Code Adventure',
    'adventure.level': 'Level',
    'adventure.of': 'of',
    'adventure.completed': 'Adventure completed! 🏁',
    'adventure.finale.message': 'Thanks for walking through my story. If you got this far… imagine what we could build together 💡',
    'adventure.stats.completed': 'Levels completed',
    'adventure.stats.debugging': 'Debugging powers unlocked 🐞',
    'adventure.stats.possibilities': 'New possibilities revealed ✨',
    'adventure.actions.cv': '📄 Download my CV – the classic one',
    'adventure.actions.linkedin': '🤝 Let\'s connect on LinkedIn – maybe even collaborate',
    'adventure.actions.repo': '🛠️ Check out the backend code – it powers this terminal',
    'adventure.actions.restart': '🔄 Restart the adventure and discover new things',
    'adventure.back': 'Return to terminal mode',
    'adventure.correct': 'Correct!',
    'adventure.incorrect': 'Not quite 😅',
    'adventure.next': 'Next challenge',
    'adventure.restart': 'Restart', 
    'projects.title': 'My Projects',
    'projects.subtitle': 'Here are some of the projects I\'ve worked on',
    'projects.back': '← Back to Terminal',
    'recruiter.title': 'Recruiter Mode',
    'recruiter.intro': 'Hi! I\'m Stef, a backend developer with a product mindset, strong API design skills, and a deep interest in scalable architecture.',

  },
  fr: {
    'terminal.welcome': 'Salut ! Bienvenue dans l\'aventure de Stef ✨ Ce portfolio est une simulation de terminal interactive, conçue pour les développeurs et les curieux',
    'terminal.help': 'Commandes disponibles :',
    'terminal.help.prompt': 'Perdu(e) ? Tape « help » et laisse-moi te guider...',

    'terminal.starting.adventure': 'Démarrage de l\'Aventure de Code de Stef...',
    'terminal.redirecting.level': 'Redirection vers le niveau 1...',
    'terminal.start': 'Commence l’aventure : un voyage à travers mon parcours tech... ',
    'terminal.about': 'À propos de Stef',
    'terminal.projects': 'Voir les projets',
    'terminal.stack': 'Voir mon stack technique',
    'terminal.recruiter-mode': 'Mode recruteur : juste l\'essentiel ⏭️',
    'terminal.clear': 'Effacer le terminal',
    'terminal.select.language': 'Sélectionner la langue',
    'terminal.about.stef': 'Stef - Développeuse Backend\nEx-dentiste devenue passionnée de code\nPassionnée par la construction depuis zéro\nAime déboguer et résoudre des problèmes complexes',
    'terminal.language.changed': 'Langue changée en',
    'terminal.command.not.found': 'Commande non trouvée:',
    'terminal.type.help': 'Tapez "help" pour voir les commandes disponibles.',
    'terminal.projects.redirecting': 'Redirection vers les projets de Stef...',
    'terminal.stack.redirecting': 'Redirection vers la vue du stack technique...',
    'terminal.recruiter.activated': '⏩ Mode express activé !',
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
    'adventure.back': 'Retour au Terminal',
    'adventure.correct': 'Correct !',
    'adventure.incorrect': 'Ce n\'est pas ça 😅',
    'adventure.next': 'Défi suivant',
    'adventure.restart': 'Recommencer',
    'projects.title': 'Mes Projets',
    'projects.subtitle': 'Voici quelques-uns des projets sur lesquels j\'ai travaillé',
    'projects.back': '← Retour au Terminal',
    'recruiter.title': 'Mode Recruteur',
    'recruiter.intro': 'Salut ! Je suis Stef, développeuse backend avec une mentalité produit, de solides compétences en conception d\'API et un vif intérêt pour l\'architecture évolutive.',

  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

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