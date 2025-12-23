// import React from 'react';
// import { useRouter } from 'next/router';
// import { useLanguage } from '../contexts/LanguageContext';
// import LanguageSwitcher from '../components/LanguageSwitcher';

// const AboutPage: React.FC = () => {
//   const router = useRouter();
//   const { language, t } = useLanguage();

//   const getAboutContent = () => {
//     const content = {
//       es: {
//         title: '🤗¡Hola, soy Stef!',
//         subtitle: 'Backend Developer • Ex-dentista • Amante de los idiomas',
//         story: {
//           title: 'Mi historia',
//           content: `Soy Stef, una desarrolladora backend que encontró su camino en el código después de años en la odontología.\nLa transición no fue al azar. Siempre me ha atraído cómo la tecnología puede resolver problemas reales y mejorar vidas.\n\nComo odontóloga, ayudaba a una persona a la vez. Como desarrolladora, puedo crear herramientas que impacten a miles.\n\nMe tomó tiempo ver que este era mi camino, pero mis amigos y mi ex (que llevan mucho tiempo en tecnología) lo vieron primero.\nSu apoyo y convicción me dieron el empujón que necesitaba para lanzarme.`
//         },
//         why: {
//           title: '¿Por qué dejé la odontología?',
//           content: `No fue una decisión fácil, pero sí la correcta. La odontología me enseñó precisión, paciencia y atención al detalle. Son habilidades que hoy aplico en cada línea de código.\n\nDescubrí que mi verdadera pasión está en resolver problemas complejos, crear algo desde cero y ver cómo mis soluciones mejoran la vida de las personas. La programación me da esa libertad creativa y ese impacto que estaba buscando.`
//         },
//         personality: {
//           title: 'Mi personalidad',
//           content: `Soy curiosa por naturaleza. Me encanta aprender idiomas (ahora estoy con el francés), explorar tecnologías nuevas y siempre buscar formas de mejorar.\n\nNo busco ser perfecta, busco mejorar. Soy creativa, tengo claro hacia dónde voy, y todo lo que aprendo lo uso para seguir creciendo.\nAún hay mucho que no sé. La tecnología es enorme, y me emociona seguir aprendiendo.\nCada vez que entiendo algo nuevo, siento que gané algo real.`
//         },
//         values: {
//           title: 'Lo que me mueve',
//           items: [
//             '✨ Visión y creatividad para resolver problemas reales',
//             '🫱🏽‍🫲🏽 Colaboración y aprendizaje de otros',
//             '🧪 Curiosidad y experimentación para crecer',
//             '⚙️ Construir cosas que realmente sirvan',
//             '📈 Mejorar en cada proyecto'
//           ]
//         },
//         funFacts: {
//           title: 'Datos curiosos',
//           items: [
//             '🍫 Programo mejor con música, snacks y un poco de caos',
//             '✍🏽 Llevo una nota con todos mis “tiny wins” de código',
//             '🧹 Disfruto más refactorizar que escribir código desde cero (no sé por qué)',
//             '🐶 Tengo dos perros y un gato (la mayoría de bugs los arreglo después de pasear a los perros)'
//           ]
//         }
//       },
//       en: {
//         title: '🤗 Hi, I\'m Stef!',
//         subtitle: 'Backend Developer • Ex-dentist • Language Enthusiast',
//         story: {
//           title: 'My Story',
//           content: `I'm Stef, a backend developer who found her way into code after years in dentistry.  \nThe transition wasn’t random. I’ve always been drawn to how technology can solve real problems and improve lives.  \nAs a dentist, I helped one person at a time. As a developer, I can build tools that impact thousands.  \n\nIt took me time to see that this path was for me, but my friends and my ex, who’ve been in tech long before I was, saw the potential first.  \nTheir support and conviction gave me the push I needed to make the leap.`
//         },
//         why: {
//           title: 'Why I left dentistry?',
//           content: `It wasn't an easy decision, but it was the right one. Dentistry taught me precision, patience, and the importance of attention to detail. Skills I now apply to every line of code I write.\n\nI realized my true passion was in solving complex problems, creating something from scratch, and the satisfaction of seeing how my solutions improve people's lives. Programming gives me that creative freedom and impact I was looking for.`
//         },
//         personality: {
//           title: 'My Personality',
//           content: `I'm naturally curious. I love learning new languages (currently learning French), exploring new technologies, and I'm always looking for ways to improve and grow.\n\nI’m not trying to be perfect, I’m trying to get better.  \nI’m creative, I have a strong sense of direction, and I use what I learn to keep improving.  \nThere’s still a lot I don’t know. Tech is huge, and I’m always excited to keep learning.  \nEvery time I understand something new, I feel like I’ve earned something real.`
//         },
//         values: {
//           title: 'What drives me',
//           items: [
//             '✨ Vision and creativity in solving real problems',
//             '🫱🏽‍🫲🏽 Collaboration and learning from others',
//             '🧪 Growth through curiosity and experimentation',
//             '⚙️ Building things that are actually useful',
//             '📈 Getting better with every project'
//           ]
//         },
//         funFacts: {
//           title: 'Fun facts',
//           items: [
//             '🍫 I code better with music, snacks, and just the right amount of chaos',
//             '✍🏽 I keep a digital note with every “tiny win” I’ve had while coding',
//             '🧹 I enjoy refactoring more than writing code from scratch (don’t ask me why)',
//             '🐶 I have two dogs and a cat (most of my bug fixes happen after walking the dogs)'
//           ]
//         }
//       },
//       fr: {
//         title: '🤗 Salut, je suis Stef !',
//         subtitle: 'Développeuse Backend • Ex-dentiste • Passionnée de langues',
//         story: {
//           title: 'Mon histoire',
//           content: `Je suis Stef, une développeuse backend qui a trouvé sa voie dans le code après des années en dentisterie.\nLa transition n'était pas un hasard. J'ai toujours été attirée par la manière dont la technologie peut résoudre des problèmes concrets et améliorer la vie.\n\nEn tant que dentiste, j’aidais une personne à la fois. En tant que développeuse, je peux créer des outils qui touchent des milliers de personnes.\n\nIl m’a fallu du temps pour réaliser que c’était ma voie, mais mes amis et mon ex (déjà dans la tech) l’avaient vu bien avant moi.\nLeur soutien et leur conviction m'ont donné l’élan nécessaire pour sauter le pas.`
//         },
//         why: {
//           title: 'Pourquoi j’ai quitté la dentisterie ?',
//           content: `Ce n'était pas une décision facile, mais c'était la bonne. La dentisterie m'a appris la précision, la patience et l'attention aux détails. Des compétences que j'applique maintenant dans chaque ligne de code.\n\nJ'ai compris que ma vraie passion, c'est résoudre des problèmes complexes, créer à partir de zéro, et voir comment mes solutions améliorent la vie des gens. La programmation me donne cette liberté créative et cet impact que je cherchais.`
//         },
//         personality: {
//           title: 'Ma personnalité',
//           content: `Je suis naturellement curieuse. J'adore apprendre des langues (j'apprends le français), explorer de nouvelles technologies, et chercher sans cesse à progresser.\n\nJe ne cherche pas à être parfaite, mais à m’améliorer. J’ai de la créativité, une direction claire, et j’utilise chaque apprentissage pour continuer à avancer.\nIl y a encore tant à apprendre. La tech est vaste, et j’adore cette idée. Chaque fois que je comprends quelque chose de nouveau, j’ai l’impression d’avoir gagné quelque chose de réel.`
//         }, 
//         values: {
//           title: 'Ce qui me motive',
//           items: [
//             '✨ Vision et créativité pour résoudre des problèmes réels',
//             '🫱🏽‍🫲🏽 Collaboration et apprentissage des autres',
//             '🧪 Croissance par la curiosité et l’expérimentation',
//             '⚙️ Construire des choses vraiment utiles',
//             '📈 M’améliorer à chaque projet'
//           ]
//         },
//         funFacts: {
//           title: 'Faits amusants',
//           items: [
//             '🍫 Je code mieux avec de la musique, des snacks et un peu de chaos',
//             '✍🏽 Je note chaque “petite victoire” de code dans une note digitale',
//             '🧹 Je préfère refactorer que coder à partir de zéro (ne me demande pas pourquoi)',
//             '🐶 J’ai deux chiens et un chat (mes bugs se résolvent souvent après une balade)'
//           ]
//         }
//       }
//     };

//     return content[language as keyof typeof content] || content.en;
//   };

//   const content = getAboutContent();

//   return (
//     <div className="about-container">
//       <div className="about-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '0.5rem' }}>
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
//           <h1 style={{ margin: 0, fontSize: '2rem', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center' }}>{content.title}</h1>
//           <p style={{ margin: '0.5rem 0 1rem 0', fontSize: '1.1rem', color: '#7a3fa4', fontWeight: 500, textAlign: 'center' }}>{content.subtitle}</p>
//         </div>
//         <div className="about-lang-switcher">
//           <LanguageSwitcher hideLabel={true} />
//         </div>
//       </div>

//       <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
//         <button 
//           className="back-button"
//           onClick={() => router.push('/')}
//         >
//           {t('adventure.back')}
//         </button>
//       </div>

//       <div className="about-content">
//         {/* Photo Section */}
//         <div className="about-photo-section">
//           <div className="about-photo-container">
//             <img 
//               src="/stef-photo.jpg" 
//               alt="Stef - Backend Developer" 
//               className="about-photo"
//               onError={(e) => {
              
//                 const target = e.target as HTMLImageElement;
//                 target.style.display = 'none';
//                 target.nextElementSibling?.classList.remove('hidden');
//               }}
//             />
//             <div className="about-photo-placeholder hidden">
//               <span style={{ fontSize: '4rem' }}>📸</span>
//               <p style={{ marginTop: '1rem', color: '#e75480' }}>Foto de Stef aquí</p>
//             </div>
//           </div>
//         </div>

//         {/* Story Section */}
//         <div className="about-section">
//           <h2>{content.story.title}</h2>
//           <p>{content.story.content}</p>
//         </div>

//         {/* Why Section */}
//         <div className="about-section">
//           <h2>{content.why.title}</h2>
//           <p>{content.why.content}</p>
//         </div>

//         {/* Personality Section */}
//         <div className="about-section">
//           <h2>{content.personality.title}</h2>
//           <p>{content.personality.content}</p>
//         </div>

//         {/* Values Section */}
//         <div className="about-section">
//           <h2>{content.values.title}</h2>
//           <ul className="about-list">
//             {content.values.items.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Fun Facts Section */}
//         <div className="about-section">
//           <h2>{content.funFacts.title}</h2>
//           <ul className="about-list">
//             {content.funFacts.items.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutPage; 

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import LoadingSpinner from '../components/LoadingSpinner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface ProfileData {
  name: { [key: string]: string };
  subtitle: { [key: string]: string };
  story: { [key: string]: { title: string; content: string } };
  why: { [key: string]: { title: string; content: string } };
  personality: { [key: string]: { title: string; content: string } };
  values: { [key: string]: { title: string; items: string[] } };
  fun_facts: { [key: string]: { title: string; items: string[] } };
  photo_url?: string;
}

const AboutPage: React.FC = () => {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/profile`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        console.log('Profile data:', data);
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="about-container">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="about-container">
        <p style={{ color: '#e75480', textAlign: 'center' }}>
          {error || 'Failed to load profile data'}
        </p>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className="back-button" onClick={() => router.push('/')}>
            {t('adventure.back')}
          </button>
        </div>
      </div>
    );
  }

  const lang = language as string;

  return (
    <div className="about-container">
      <div className="about-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: '2rem', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center' }}>
            {profile.name?.[lang] || profile.name?.['en'] || 'Hi, I\'m Stef!'}
          </h1>
          <p style={{ margin: '0.5rem 0 1rem 0', fontSize: '1.1rem', color: '#7a3fa4', fontWeight: 500, textAlign: 'center' }}>
            {profile.subtitle?.[lang] || profile.subtitle?.['en']}
          </p>
        </div>
        <div className="about-lang-switcher">
          <LanguageSwitcher hideLabel={true} />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button 
          className="back-button"
          onClick={() => router.push('/')}
        >
          {t('adventure.back')}
        </button>
      </div>

      <div className="about-content">
        {/* Photo Section */}
        <div className="about-photo-section">
          <div className="about-photo-container">
            {profile.photo_url ? (
              <img 
                src={profile.photo_url}
                alt="Stef - Backend Developer" 
                className="about-photo"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const placeholder = target.nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`about-photo-placeholder ${profile.photo_url ? 'hidden' : ''}`}>
              <span style={{ fontSize: '4rem' }}>📸</span>
              <p style={{ marginTop: '1rem', color: '#e75480' }}>
                {lang === 'es' ? 'Foto de Stef aquí' : lang === 'fr' ? 'Photo de Stef ici' : 'Stef\'s photo here'}
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        {profile.story?.[lang]?.content && (
          <div className="about-section">
            <h2>{profile.story[lang].title}</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{profile.story[lang].content}</p>
          </div>
        )}

        {/* Why Section */}
        {profile.why?.[lang]?.content && (
          <div className="about-section">
            <h2>{profile.why[lang].title}</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{profile.why[lang].content}</p>
          </div>
        )}

        {/* Personality Section */}
        {profile.personality?.[lang]?.content && (
          <div className="about-section">
            <h2>{profile.personality[lang].title}</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{profile.personality[lang].content}</p>
          </div>
        )}

        {/* Values Section */}
        {profile.values?.[lang]?.items && profile.values[lang].items.length > 0 && (
          <div className="about-section">
            <h2>{profile.values[lang].title}</h2>
            <ul className="about-list">
              {profile.values[lang].items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Fun Facts Section */}
        {profile.fun_facts?.[lang]?.items && profile.fun_facts[lang].items.length > 0 && (
          <div className="about-section">
            <h2>{profile.fun_facts[lang].title}</h2>
            <ul className="about-list">
              {profile.fun_facts[lang].items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPage;