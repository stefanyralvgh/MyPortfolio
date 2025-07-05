import React from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

const AboutPage: React.FC = () => {
  const router = useRouter();
  const { language, t } = useLanguage();

  const getAboutContent = () => {
    const content = {
      es: {
        title: '👋 ¡Hola, soy Stef!',
        subtitle: 'Backend Developer • Ex-dentista • Amante de idiomas',
        story: {
          title: 'Mi Historia',
          content: `Soy Stef, una desarrolladora backend apasionada que encontró su camino en el código después de años en la odontología. Mi transición de la salud a la tecnología no fue casual - siempre me ha fascinado cómo la tecnología puede mejorar vidas y resolver problemas complejos.

La decisión de cambiar de carrera vino de una combinación de curiosidad intelectual y el deseo de crear soluciones que impacten a más personas. Como odontóloga, ayudaba a una persona a la vez. Como desarrolladora, puedo crear herramientas que beneficien a miles.`
        },
        why: {
          title: '¿Por qué dejé la odontología?',
          content: `No fue una decisión fácil, pero fue la correcta. La odontología me enseñó precisión, paciencia y la importancia de la atención al detalle - habilidades que ahora aplico en cada línea de código que escribo.

Me di cuenta de que mi verdadera pasión estaba en resolver problemas complejos, en crear algo desde cero, y en la satisfacción de ver cómo mis soluciones mejoran la vida de las personas. La programación me da esa libertad creativa y ese impacto que estaba buscando.`
        },
        personality: {
          title: 'Mi Personalidad',
          content: `Soy una persona curiosa por naturaleza. Me encanta aprender nuevos idiomas (actualmente estoy aprendiendo francés), explorar nuevas tecnologías, y siempre estoy buscando formas de mejorar y crecer.

Soy meticulosa en mi trabajo - cada función que escribo, cada API que diseño, tiene que ser perfecta. Pero también sé cuándo pedir ayuda y colaborar. La IA ha sido mi compañera perfecta en este viaje, potenciando mi creatividad y ayudándome a llevar mis ideas más allá de lo que podría hacer sola.`
        },
        values: {
          title: 'Lo que me mueve',
          items: [
            '💡 Innovación y creatividad en la resolución de problemas',
            '🤝 Colaboración y aprendizaje continuo',
            '🎯 Precisión y atención al detalle',
            '🌍 Impacto positivo en la sociedad',
            '🚀 Mejora constante y crecimiento personal'
          ]
        },
        funFacts: {
          title: 'Datos curiosos',
          items: [
            '🦷 Puedo hacer una limpieza dental profesional (¡pero prefiero escribir APIs!)',
            '🌍 Hablo español, inglés y estoy aprendiendo francés',
            '🤖 La IA me ayudó a diseñar este portafolio',
            '💉 Mi empresa soñada trabaja en tecnología de salud',
            '🎨 Aunque el frontend no es mi fuerte, tengo buen ojo para el diseño'
          ]
        }
      },
      en: {
        title: '👋 Hi, I\'m Stef!',
        subtitle: 'Backend Developer • Ex-dentist • Language Enthusiast',
        story: {
          title: 'My Story',
          content: `I'm Stef, a passionate backend developer who found her path in code after years in dentistry. My transition from healthcare to technology wasn't random - I've always been fascinated by how technology can improve lives and solve complex problems.

The decision to change careers came from a combination of intellectual curiosity and the desire to create solutions that impact more people. As a dentist, I helped one person at a time. As a developer, I can create tools that benefit thousands.`
        },
        why: {
          title: 'Why I left dentistry?',
          content: `It wasn't an easy decision, but it was the right one. Dentistry taught me precision, patience, and the importance of attention to detail - skills I now apply to every line of code I write.

I realized my true passion was in solving complex problems, creating something from scratch, and the satisfaction of seeing how my solutions improve people's lives. Programming gives me that creative freedom and impact I was looking for.`
        },
        personality: {
          title: 'My Personality',
          content: `I'm naturally curious. I love learning new languages (currently learning French), exploring new technologies, and I'm always looking for ways to improve and grow.

I'm meticulous in my work - every function I write, every API I design, has to be perfect. But I also know when to ask for help and collaborate. AI has been my perfect companion on this journey, amplifying my creativity and helping me take my ideas beyond what I could do alone.`
        },
        values: {
          title: 'What drives me',
          items: [
            '💡 Innovation and creativity in problem-solving',
            '🤝 Collaboration and continuous learning',
            '🎯 Precision and attention to detail',
            '🌍 Positive impact on society',
            '🚀 Constant improvement and personal growth'
          ]
        },
        funFacts: {
          title: 'Fun facts',
          items: [
            '🦷 I can do a professional dental cleaning (but I prefer writing APIs!)',
            '🌍 I speak Spanish, English and I\'m learning French',
            '🤖 AI helped me design this portfolio',
            '💉 My dream company works in health technology',
            '🎨 Although frontend isn\'t my strong suit, I have a good eye for design'
          ]
        }
      },
      fr: {
        title: '👋 Salut, je suis Stef !',
        subtitle: 'Développeuse Backend • Ex-dentiste • Passionnée de langues',
        story: {
          title: 'Mon Histoire',
          content: `Je suis Stef, une développeuse backend passionnée qui a trouvé sa voie dans le code après des années en dentisterie. Ma transition de la santé à la technologie n\'était pas aléatoire - j\'ai toujours été fascinée par la façon dont la technologie peut améliorer la vie et résoudre des problèmes complexes.

La décision de changer de carrière est venue d\'une combinaison de curiosité intellectuelle et du désir de créer des solutions qui impactent plus de personnes. En tant que dentiste, j\'aidais une personne à la fois. En tant que développeuse, je peux créer des outils qui bénéficient à des milliers.`
        },
        why: {
          title: 'Pourquoi j\'ai quitté la dentisterie ?',
          content: `Ce n\'était pas une décision facile, mais c\'était la bonne. La dentisterie m\'a appris la précision, la patience et l\'importance de l\'attention aux détails - des compétences que j\'applique maintenant à chaque ligne de code que j\'écris.

J\'ai réalisé que ma vraie passion était de résoudre des problèmes complexes, de créer quelque chose à partir de zéro, et la satisfaction de voir comment mes solutions améliorent la vie des gens. La programmation me donne cette liberté créative et cet impact que je recherchais.`
        },
        personality: {
          title: 'Ma Personnalité',
          content: `Je suis naturellement curieuse. J\'aime apprendre de nouvelles langues (j\'apprends actuellement le français), explorer de nouvelles technologies, et je cherche toujours des moyens de m\'améliorer et de grandir.

Je suis méticuleuse dans mon travail - chaque fonction que j\'écris, chaque API que je conçois, doit être parfaite. Mais je sais aussi quand demander de l\'aide et collaborer. L\'IA a été ma compagne parfaite dans ce voyage, amplifiant ma créativité et m\'aidant à porter mes idées au-delà de ce que je pourrais faire seule.`
        },
        values: {
          title: 'Ce qui me motive',
          items: [
            '💡 Innovation et créativité dans la résolution de problèmes',
            '🤝 Collaboration et apprentissage continu',
            '🎯 Précision et attention aux détails',
            '🌍 Impact positif sur la société',
            '🚀 Amélioration constante et croissance personnelle'
          ]
        },
        funFacts: {
          title: 'Faits amusants',
          items: [
            '🦷 Je peux faire un nettoyage dentaire professionnel (mais je préfère écrire des APIs !)',
            '🌍 Je parle espagnol, anglais et j\'apprends le français',
            '🤖 L\'IA m\'a aidée à concevoir ce portfolio',
            '💉 Mon entreprise de rêve travaille dans la technologie de santé',
            '🎨 Bien que le frontend ne soit pas mon fort, j\'ai un bon œil pour le design'
          ]
        }
      }
    };

    return content[language as keyof typeof content] || content.en;
  };

  const content = getAboutContent();

  return (
    <div className="about-container">
      <div className="about-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: '2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center' }}>{content.title}</h1>
          <p style={{ margin: '0.5rem 0 1rem 0', fontSize: '1.1rem', color: '#7a3fa4', fontWeight: 500, textAlign: 'center' }}>{content.subtitle}</p>
        </div>
        <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', marginRight: '0.5rem' }}>
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
            <img 
              src="/stef-photo.jpg" 
              alt="Stef - Backend Developer" 
              className="about-photo"
              onError={(e) => {
                // Fallback si la imagen no carga
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="about-photo-placeholder hidden">
              <span style={{ fontSize: '4rem' }}>📸</span>
              <p style={{ marginTop: '1rem', color: '#e75480' }}>Foto de Stef aquí</p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="about-section">
          <h2>{content.story.title}</h2>
          <p>{content.story.content}</p>
        </div>

        {/* Why Section */}
        <div className="about-section">
          <h2>{content.why.title}</h2>
          <p>{content.why.content}</p>
        </div>

        {/* Personality Section */}
        <div className="about-section">
          <h2>{content.personality.title}</h2>
          <p>{content.personality.content}</p>
        </div>

        {/* Values Section */}
        <div className="about-section">
          <h2>{content.values.title}</h2>
          <ul className="about-list">
            {content.values.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Fun Facts Section */}
        <div className="about-section">
          <h2>{content.funFacts.title}</h2>
          <ul className="about-list">
            {content.funFacts.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 