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
    'terminal.help.verbose': 'Mostrar ayuda detallada',
    'terminal.help.verbose.title': '🎯 GUÍA DETALLADA DEL TERMINAL',
    'terminal.help.verbose.intro': '¡Bienvenida/o al terminal más divertido que has usado! Aquí tienes todo lo que necesitas saber:',
    'terminal.help.verbose.commands.title': '📋 COMANDOS DISPONIBLES:',
    'terminal.help.verbose.start.desc': '🚀 Inicia la aventura de código - un viaje interactivo por mi historia técnica con desafíos y sorpresas',
    'terminal.help.verbose.projects.desc': '🛠️ Explora mis proyectos - desde APIs robustas hasta experimentos',
    'terminal.help.verbose.about.desc': '💬 Conoce a Stef - ex-dentista, actual desarrolladora backend, amante del debugging',
    'terminal.help.verbose.funfacts.desc': '🎲 Cosas que no van en un CV, pero sí cuentan',
    'terminal.help.verbose.recruiter.desc': '⏭️ Modo express para reclutadores — lo esencial, sin rodeos',
    'terminal.help.verbose.clear.desc': '🔄 Limpia la pantalla - perfecto para empezar de nuevo',
    'terminal.help.verbose.tips.title': '💡 CONSEJOS PRO:',
    'terminal.help.verbose.tips.1': '• Algunos comandos tienen sorpresas ocultas 😉',
    'terminal.help.verbose.tips.2': '• Usa el selector de idioma en el header para cambiar idiomas',
    'terminal.help.verbose.tips.3': '• Si eres reclutador, usa recruiter-mode para ir directo al grano',
    'terminal.help.verbose.tips.4': '• Los comandos son case-insensitive (no importa mayúsculas/minúsculas)',
    'terminal.help.verbose.footer': '¡Diviértete explorando! 🎉',
    'terminal.start': 'Comenzar la aventura',
    'terminal.about': 'Acerca de Stef',
    'terminal.projects': 'Ver proyectos',
    'terminal.funfacts': 'Datos curiosos',
    'terminal.recruiter-mode': 'Vía rápida para reclutadores ⏭️ – sin rodeos',
    'terminal.clear': 'Limpiar terminal',
    'terminal.select.language': 'Seleccionar idioma',
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

  },
    en: {
    'terminal.welcome': 'Hi! Welcome to Stef\'s adventure ✨ This portfolio is a playful terminal simulation, made for devs and the curious alike.',
    'terminal.help': 'Available commands:',
    'terminal.help.prompt': 'Not sure where to start? Type "help" and explore away...',
    'terminal.help.verbose': 'Show detailed help',
    'terminal.help.verbose.title': '🎯 DETAILED TERMINAL GUIDE',
    'terminal.help.verbose.intro': 'Welcome to the most fun terminal you\'ve ever used! Here\'s everything you need to know:',
    'terminal.help.verbose.commands.title': '📋 AVAILABLE COMMANDS:',
    'terminal.help.verbose.start.desc': '🚀 Start the code adventure - an interactive journey through my tech story with challenges and surprises',
    'terminal.help.verbose.projects.desc': '🛠️ Explore my projects - from robust APIs to crazy experiments',
    'terminal.help.verbose.about.desc': '💬 Meet Stef - ex-dentist, current backend developer, debugging enthusiast',
    'terminal.help.verbose.funfacts.desc': '🎲 Fun facts about me - because life is more fun with random details',
    'terminal.help.verbose.recruiter.desc': '⏭️ Express mode for recruiters - no distractions, just the essentials',
    'terminal.help.verbose.clear.desc': '🔄 Clear the screen - perfect for a fresh start',
    'terminal.help.verbose.tips.title': '💡 PRO TIPS:',
    'terminal.help.verbose.tips.1': '• Some commands have hidden surprises 😉',
    'terminal.help.verbose.tips.2': '• Use the language selector in the header to change languages',
    'terminal.help.verbose.tips.3': '• If you\'re a recruiter, use recruiter-mode to get straight to the point',
    'terminal.help.verbose.tips.4': '• Commands are case-insensitive (caps don\'t matter)',
    'terminal.help.verbose.footer': 'Have fun exploring! 🎉',
    'terminal.start': 'Start the adventure – a journey through my tech story...',
    'terminal.about': 'Learn who I am, what I love, and why I left dentistry for code',
    'terminal.projects': 'See what I\'ve built – with love, logic, and lots of debugging!',
    'terminal.funfacts': 'Random bits about me: the unexpected, the fun, and the nerdy 🤓',
    'terminal.recruiter-mode': 'Fast track for recruiters ⏭️ – no distractions, just the facts',
    'terminal.clear': 'Clear the screen and get a fresh start',
    'terminal.select.language': 'Choose your language',
    'terminal.about.stef': 'Stef – Backend Developer\nEx-dentist turned dev\nLoves building from scratch, debugging deeply, and making things work \nObsessed with clean APIs and good architecture.',
    'terminal.command.not.found': 'Oops! Unknown command:',
    'terminal.type.help': 'Need help? Type "help" and I\'ll guide you',
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
    'adventure.back': '← Return to terminal mode',

  },
  fr: {
    'terminal.welcome': 'Bienvenue dans l\'Aventure de Code de Stef! 🚀',
    'terminal.help': 'Commandes disponibles:',
    'terminal.help.prompt': 'Perdu(e) ? Tape « help » et laisse-moi te guider...',
    'terminal.help.verbose': 'Afficher l\'aide détaillée',
    'terminal.help.verbose.title': '🎯 GUIDE DÉTAILLÉ DU TERMINAL',
    'terminal.help.verbose.intro': 'Bienvenue dans le terminal le plus amusant que vous ayez jamais utilisé ! Voici tout ce que vous devez savoir :',
    'terminal.help.verbose.commands.title': '📋 COMMANDES DISPONIBLES :',
    'terminal.help.verbose.start.desc': '🚀 Commencez l\'aventure de code - un voyage interactif à travers mon histoire technique avec des défis et des surprises',
    'terminal.help.verbose.projects.desc': '🛠️ Explorez mes projets - des APIs robustes aux expériences folles',
    'terminal.help.verbose.about.desc': '💬 Rencontrez Stef - ex-dentiste, développeuse backend actuelle, passionnée de débogage',
    'terminal.help.verbose.funfacts.desc': '🎲 Quelques faits amusants – parce qu’il n’y a pas que le code dans la vie.',
    'terminal.help.verbose.recruiter.desc': '⏭️ Mode recruteur : pas de blabla, juste l’essentiel',
    'terminal.help.verbose.clear.desc': '🔄 Effacez l\'écran - parfait pour un nouveau départ',
    'terminal.help.verbose.tips.title': '💡 CONSEILS PRO :',
    'terminal.help.verbose.tips.1': '• Certaines commandes ont des surprises cachées 😉',
    'terminal.help.verbose.tips.2': '• Utilisez le sélecteur de langue dans l\'en-tête pour changer de langue',
    'terminal.help.verbose.tips.3': '• Si vous êtes recruteur, utilisez recruiter-mode pour aller droit au but',
    'terminal.help.verbose.tips.4': '• Les commandes ne sont pas sensibles à la casse (majuscules/minuscules)',
    'terminal.help.verbose.footer': 'Amusez-vous à explorer ! 🎉',
    'terminal.start': 'Commencer l\'aventure',
    'terminal.about': 'À propos de Stef',
    'terminal.projects': 'Voir les projets',
    'terminal.funfacts': 'Faits amusants',
    'terminal.recruiter-mode': 'Mode recruteur : juste l\'essentiel ⏭️',
    'terminal.clear': 'Effacer le terminal',
    'terminal.select.language': 'Sélectionner la langue',
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