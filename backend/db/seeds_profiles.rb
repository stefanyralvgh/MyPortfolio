# db/seeds_profile.rb

Profile.destroy_all

Profile.create!(
  name: {
    es: "🤗¡Hola, soy Stef!",
    en: "🤗 Hi, I'm Stef!",
    fr: "🤗 Salut, je suis Stef !"
  },

  subtitle: {
    es: "Backend Developer • Ex-dentista • Amante de los idiomas",
    en: "Backend Developer • Ex-dentist • Language Enthusiast",
    fr: "Développeuse Backend • Ex-dentiste • Passionnée de langues"
  },

  story: {
    es: {
      title: "Mi historia",
      content: "Soy Stef, una desarrolladora backend que encontró su camino en el código después de años en la odontología.\nLa transición no fue al azar. Siempre me ha atraído cómo la tecnología puede resolver problemas reales y mejorar vidas.\n\nComo odontóloga, ayudaba a una persona a la vez. Como desarrolladora, puedo crear herramientas que impacten a miles.\n\nMe tomó tiempo ver que este era mi camino, pero mis amigos y mi ex (que llevan mucho tiempo en tecnología) lo vieron primero.\nSu apoyo y convicción me dieron el empujón que necesitaba para lanzarme."
    },
    en: {
      title: "My Story",
      content: "I'm Stef, a backend developer who found her way into code after years in dentistry.\nThe transition wasn’t random. I’ve always been drawn to how technology can solve real problems and improve lives.\n\nAs a dentist, I helped one person at a time. As a developer, I can build tools that impact thousands.\n\nIt took me time to see that this path was for me, but my friends and my ex saw the potential first.\nTheir support gave me the push I needed."
    },
    fr: {
      title: "Mon histoire",
      content: "Je suis Stef, une développeuse backend qui a trouvé sa voie dans le code après des années en dentisterie.\nLa transition n'était pas un hasard.\n\nEn tant que dentiste, j’aidais une personne à la fois. En tant que développeuse, je peux créer des outils qui touchent des milliers de personnes.\n\nLe soutien de mes proches m’a donné l’élan nécessaire."
    }
  },

  why: {
    es: {
      title: "¿Por qué dejé la odontología?",
      content: "No fue una decisión fácil, pero sí la correcta. La odontología me enseñó precisión, paciencia y atención al detalle.\n\nDescubrí que mi verdadera pasión está en resolver problemas complejos y crear soluciones reales."
    },
    en: {
      title: "Why I left dentistry?",
      content: "It wasn't an easy decision, but it was the right one.\nDentistry taught me precision and patience, which I now apply to coding."
    },
    fr: {
      title: "Pourquoi j’ai quitté la dentisterie ?",
      content: "Ce n'était pas une décision facile, mais c'était la bonne.\nLa programmation m’offre l’impact que je cherchais."
    }
  },

  personality: {
    es: {
      title: "Mi personalidad",
      content: "Soy curiosa por naturaleza. Me encanta aprender idiomas (ahora francés), explorar nuevas tecnologías y mejorar constantemente."
    },
    en: {
      title: "My Personality",
      content: "I'm naturally curious. I love learning new languages, exploring new technologies, and improving continuously."
    },
    fr: {
      title: "Ma personnalité",
      content: "Je suis naturellement curieuse et j’adore apprendre et évoluer."
    }
  },

  values: {
    es: {
      title: "Lo que me mueve",
      items: [
        "✨ Visión y creatividad para resolver problemas reales",
        "🫱🏽‍🫲🏽 Colaboración y aprendizaje",
        "🧪 Curiosidad constante",
        "⚙️ Construir cosas útiles",
        "📈 Mejorar en cada proyecto"
      ]
    },
    en: {
      title: "What drives me",
      items: [
        "✨ Creativity to solve real problems",
        "🫱🏽‍🫲🏽 Collaboration",
        "🧪 Curiosity",
        "⚙️ Building useful things",
        "📈 Continuous improvement"
      ]
    },
    fr: {
      title: "Ce qui me motive",
      items: [
        "✨ Créativité",
        "🫱🏽‍🫲🏽 Collaboration",
        "🧪 Curiosité",
        "⚙️ Utilité",
        "📈 Amélioration continue"
      ]
    }
  },

  fun_facts: {
    es: {
      title: "Datos curiosos",
      items: [
        "🍫 Programo mejor con música y snacks",
        "🧹 Disfruto refactorizar",
        "🐶 Tengo dos perros y un gato"
      ]
    },
    en: {
      title: "Fun facts",
      items: [
        "🍫 I code better with snacks",
        "🧹 I enjoy refactoring",
        "🐶 I have two dogs and a cat"
      ]
    },
    fr: {
      title: "Faits amusants",
      items: [
        "🍫 Je code mieux avec des snacks",
        "🧹 J’adore refactoriser",
        "🐶 J’ai deux chiens et un chat"
      ]
    }
  }
)

puts "Profile seeded successfully"
