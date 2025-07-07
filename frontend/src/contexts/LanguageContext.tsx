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

    'terminal.start': 'Empieza la aventura: un recorrido por mi historia tech...',
    'terminal.about': 'Acerca de Stef',
    'terminal.about.redirecting': '🔄 Redirigiendo a la página completa de About...',
    'terminal.projects': 'Mira lo que he construido: con amor, lógica y muuucho debugging.',
    'terminal.stack': 'Ver mi stack tecnológico y habilidades',
    'terminal.funfacts': 'Datos curiosos',
    'terminal.recruiter-mode': 'Vía rápida para reclutadores ⏭️ – sin rodeos',
    'terminal.clear': 'Limpiar terminal',
    'terminal.select.language': 'Seleccionar idioma',
    'terminal.about.stef': '🧑‍💻 ¡Hola, soy Stef!\nBackend Developer. Ex-dentista. Amante de idiomas. Reina del debugging.\n\n✨ Algunos datos curiosos sobre mí:\n\n• Hice el backend de este portafolio con Ruby on Rails porque...\n  es la tecnología de *mi empresa soñada*. ¿Adivinas cuál? (Pista: se dedican a la salud 💉)\n\n• Aunque tengo creatividad para hacer las cosas, codear en el front no es mi fuerte —\n  por eso la IA fue mi mejor amiga para terminar de darle los estilos a este proyecto.\n  Mi idea, mi visión, potenciada por prompts 🤖\n\n• ¡Soy odontóloga! Sí — puedes contratarme para APIs o limpiezas 🦷\n\n• Me gusta el aprendizaje de idiomas — por eso este portafolio habla 3 (por ahora 😉)\n\n🪄 ¿Quieres ver el lado *humano* de Stef? Escribe `about --deep`',
    'terminal.language.changed': 'Idioma cambiado a',
    'terminal.command.not.found': 'Comando no encontrado:',
    'terminal.type.help': 'Escribe "help" para ver comandos disponibles.',
    'terminal.already.connected': '¡Ya conectada/o!\n',
    'terminal.skip.deprecated': 'El comando "skip" está obsoleto. Prueba \'recruiter-mode\' en su lugar 😉\n',
    'terminal.language.not.supported': 'Idioma no soportado. Usa: lang es, lang en, o lang fr\n',
    'terminal.redirecting.projects': 'Redirigiendo a los proyectos de Stef...',
    'terminal.starting.adventure': 'Iniciando la Aventura de Código de Stef...',
    'terminal.redirecting.level': 'Redirigiendo al nivel 1...',
    'terminal.fast.track.activated': '⏩ ¡Vía rápida activada!',
    'terminal.redirecting.stack': 'Redirigiendo al stack de Stef...',
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
    'stack.title': 'Stack Tecnológico',
    'stack.main': 'Stack Principal',
    'stack.familiar': 'También Familiarizada Con',
    'stack.tools': 'Herramientas y Tecnologías',
    'stack.stats': 'Estadísticas Rápidas',
    'stack.technologies': 'Tecnologías',
    'stack.tools.label': 'Herramientas',
    'stack.experience': 'Años de Experiencia',
    'stack.recruiter.mode': 'Modo Reclutador',
    'stack.level.advanced': 'Avanzado',
    'stack.level.intermediate': 'Intermedio',
    'stack.level.basic': 'Básico',
    'level.status.unlocked': '✅ Desbloqueado',
    'level.status.locked': '🔒 Bloqueado',
    'level.button.unlock': 'Desbloquear Nivel',
    'level.completed': '¡Nivel completado! 🎉',
    

  },
    en: {
    'terminal.welcome': 'Hi! Welcome to Stef\'s adventure ✨ This portfolio is a playful terminal simulation, made for devs and the curious alike.',
    'terminal.help': 'Available commands:',
    'terminal.help.prompt': 'Not sure where to start? Type "help" and explore away...',

    'terminal.start': 'Start the adventure – a journey through my tech story...',
    'terminal.about': 'Learn who I am, what I love, and why I left dentistry for code',
    'terminal.about.redirecting': '🔄 Redirecting to full About page...',
    'terminal.projects': 'See what I\'ve built – with love, logic, and lots of debugging!',
    'terminal.stack': 'View my tech stack and skills',
    'terminal.recruiter-mode': 'Fast track for recruiters ⏭️ – no distractions, just the facts',
    'terminal.clear': 'Clear the screen and get a fresh start',
    'terminal.select.language': 'Choose your language',
    'terminal.about.stef': 'Hi, I\'m Stef!\nBackend developer. Ex-dentist. Colombian.\n\n👾 A few things about me:\n\n• I built this portfolio’s backend with Ruby on Rails  \n  because it’s the stack of the company I’ve always wanted to work for.  \n  (Hint: they do health tech 🏥) \n\n• Frontend is not my thing. I had a clear vision, used AI to get it done.  \n  Like having a designer that actually gets me 🤭 \n\n• I studied dentistry, but I don’t practice anymore.  \n  I found something that fits me better: code.\n\n• I speak Spanish and English. Learning French too (slowly, but steadily) \n\n💟 That’s pretty much me. Want more context? Type about --deep',
    'terminal.redirecting.projects': 'Redirecting to Stef\'s projects...',
    'terminal.language.changed': 'Language changed to',
    'terminal.command.not.found': 'Command not found:',
    'terminal.type.help': 'Type "help" to see available commands.',
    'terminal.already.connected': 'Already connected!\n',
    'terminal.skip.deprecated': 'Command "skip" is deprecated. Try \'recruiter-mode\' instead 😉\n',
    'terminal.language.not.supported': 'Language not supported. Use: lang es, lang en, or lang fr\n',
    'terminal.starting.adventure': 'Starting Stef\'s Code Adventure...',
    'terminal.redirecting.level': 'Redirecting to level 1...',
    'terminal.fast.track.activated': '⏩ Fast track activated!',
    'terminal.redirecting.stack': 'Redirecting to Stef\'s stack...',
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
    'stack.title': 'Tech Stack',
    'stack.main': 'Main Stack',
    'stack.familiar': 'Also Familiar With',
    'stack.tools': 'Tools & Technologies',
    'stack.stats': 'Quick Stats',
    'stack.technologies': 'Technologies',
    'stack.tools.label': 'Tools',
    'stack.experience': 'Years Experience',
    'stack.recruiter.mode': 'Recruiter Mode',
    'stack.level.advanced': 'Advanced',
    'stack.level.intermediate': 'Intermediate',
    'stack.level.basic': 'Basic',
    'level.status.unlocked': '✅ Unlocked',
    'level.status.locked': '🔒 Locked',
    'level.button.unlock': 'Unlock Level',
    'level.completed': 'Level completed! 🎉',

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
    'terminal.start': 'Commence l\'aventure : un voyage à travers mon parcours tech...',
    'terminal.about': 'À propos de Stef',
    'terminal.about.redirecting': '🔄 Redirection vers la page About complète...',
    'terminal.projects': 'Regarde ce que j\'ai construit : avec amour, logique et beaucoup de débogage !',
    'terminal.stack': 'Voir mon stack technique et mes compétences',
    'terminal.funfacts': 'Faits amusants',
    'terminal.recruiter-mode': 'Mode recruteur : juste l\'essentiel ⏭️',
    'terminal.clear': 'Effacer le terminal',
    'terminal.select.language': 'Sélectionner la langue',
    'terminal.about.stef': '🧑‍💻 Salut, je suis Stef !\nDéveloppeuse Backend. Ex-dentiste. Passionnée de langues. Reine du debugging.\n\n✨ Quelques faits amusants sur moi :\n\n• J\'ai construit le backend de ce portfolio avec Ruby on Rails parce que...\n  c\'est la stack de *mon entreprise de rêve*. Devinez laquelle ? (Indice : ils sont dans la santé 💉)\n\n• Je peux être créative, mais le frontend n\'est pas mon fort —\n  alors j\'ai fait équipe avec l\'IA pour styliser ce projet. Mon idée, ma vision, boostée par des prompts 🤖\n\n• J\'étais dentiste ! Oui — vous pouvez m\'embaucher pour des APIs ou des nettoyages 🦷\n\n• J\'adore apprendre des langues — c\'est pourquoi ce portfolio parle 3 (pour l\'instant 😉)\n\n🪄 Voulez-vous voir le côté *humain* de Stef ? Tapez `about --deep`',
    'terminal.language.changed': 'Langue changée en',
    'terminal.command.not.found': 'Commande non trouvée:',
    'terminal.type.help': 'Tapez "help" pour voir les commandes disponibles.',
    'terminal.already.connected': 'Déjà connecté!\n',
    'terminal.skip.deprecated': 'La commande "skip" est obsolète. Essayez \'recruiter-mode\' à la place 😉\n',
    'terminal.language.not.supported': 'Langue non supportée. Utilisez: lang es, lang en, ou lang fr\n',
    'terminal.redirecting.projects': 'Redirection vers les projets de Stef...',
    'terminal.starting.adventure': 'Démarrage de l\'Aventure de Code de Stef...',
    'terminal.redirecting.level': 'Redirection vers le niveau 1...',
    'terminal.fast.track.activated': '⏩ Voie rapide activée !',
    'terminal.redirecting.stack': 'Redirection vers la vue stack...',
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
    'stack.title': 'Stack Technologique',
    'stack.main': 'Stack Principal',
    'stack.familiar': 'Aussi Familier Avec',
    'stack.tools': 'Outils et Technologies',
    'stack.stats': 'Statistiques Rapides',
    'stack.technologies': 'Technologies',
    'stack.tools.label': 'Outils',
    'stack.experience': 'Années d\'Expérience',
    'stack.recruiter.mode': 'Mode Recruteur',
    'stack.level.advanced': 'Avancé',
    'stack.level.intermediate': 'Intermédiaire',
    'stack.level.basic': 'Basique',
    'level.status.unlocked': '✅ Débloqué',
    'level.status.locked': '🔒 Verrouillé',
    'level.button.unlock': 'Débloquer Niveau',
    'level.completed': 'Niveau terminé ! 🎉',

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