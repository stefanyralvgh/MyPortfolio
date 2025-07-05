# Seed data for projects
projects_data = [
  {
    title: {
      "en": "Animal Shelter – HENRY Project",
      "es": "Refugio Animal – Proyecto HENRY",
      "fr": "Refuge Animal – Projet HENRY"
    },
    role: {
      "en": "Backend Developer with a dash of frontend",
      "es": "Backend Developer con toques de front",
      "fr": "Développeuse backend avec une touche de frontend"
    },
    tech: {
      "en": "Node.js, Express, PostgreSQL, React, Google Auth, MercadoPago",
      "es": "Node.js, Express, PostgreSQL, React, Google Auth, MercadoPago",
      "fr": "Node.js, Express, PostgreSQL, React, Google Auth, MercadoPago"
    },
    description: {
      "en": "My first team project and the first digital baby I deployed. A platform for an animal shelter in Salta, Argentina, where users could donate and adopt furry friends. I touched frontend just enough to survive.",
      "es": "Mi primer proyecto en equipo y el primer hijo digital que vió la luz del deploy. Una plataforma para un refugio animal en Salta, Argentina, donde los usuarios podían hacer donaciones y adoptar peluditos. Toqué el front solo lo justo para sobrevivir.",
      "fr": "Mon premier projet en équipe et mon premier bébé digital en production. Une plateforme pour un refuge animalier à Salta, Argentine, où les utilisateurs pouvaient faire des dons et adopter des animaux. Le frontend ? Juste ce qu'il fallait pour survivre."
    },
    status: {
      "en": "Deployed and happily alive",
      "es": "Deployado y feliz por ahí",
      "fr": "Déployé et vivant quelque part"
    },
    link: {
      "en": "Not available (but it lives in my heart and on GitHub)",
      "es": "No disponible (pero sí vive en mi corazón y en mi GitHub)",
      "fr": "Pas de lien (mais vivant dans mon cœur et mon GitHub)"
    }
  },
  {
    title: {
      "en": "Diidoo – Construction Project Platform",
      "es": "Diidoo – Plataforma para proyectos de construcción",
      "fr": "Diidoo – Plateforme de projets de construction"
    },
    role: {
      "en": "Fullstack Developer (Official Bubble hacker)",
      "es": "Fullstack Developer (Bubble hacker oficial)",
      "fr": "Développeuse Fullstack (hacker Bubble officielle)"
    },
    tech: {
      "en": "Bubble.io, Wompi, complex workflows, lots of patience",
      "es": "Bubble.io, Wompi, workflows complejos, mucha paciencia",
      "fr": "Bubble.io, Wompi, workflows complexes, beaucoup de patience"
    },
    description: {
      "en": "A huge and ambitious app to connect users with providers of architecture, interior design, and construction. Like Trello, but with concrete.",
      "es": "Una app enorme y ambiciosa para conectar usuarios con proveedores de arquitectura, diseño de interiores y construcción. Como un Trello, pero con cemento.",
      "fr": "Une application énorme et ambitieuse pour connecter des utilisateurs à des prestataires d'architecture, design d'intérieur et construction. Comme Trello, mais en béton."
    },
    status: {
      "en": "App down, but I learned like I climbed 1000 floors.",
      "es": "App caída, pero aprendí como si hubiera subido mil pisos.",
      "fr": "Appli hors ligne, mais j'ai appris comme si j'avais gravi 1000 étages."
    },
    link: {
      "en": "App offline (RIP)",
      "es": "No disponible (RIP)",
      "fr": "Indisponible (RIP)"
    }
  },
  {
    title: {
      "en": "Nodd – Music Distribution for Indie Artists",
      "es": "Nodd – Distribución musical para artistas independientes",
      "fr": "Nodd – Distribution musicale pour artistes indépendants"
    },
    role: {
      "en": "Backend Developer of invisible beats",
      "es": "Backend Developer de beats invisibles",
      "fr": "Développeuse backend de beats invisibles"
    },
    tech: {
      "en": "AWS (S3, Lambda, API Gateway), Node.js, Express, PostgreSQL",
      "es": "AWS (S3, Lambda, API Gateway), Node.js, Express, PostgreSQL",
      "fr": "AWS (S3, Lambda, API Gateway), Node.js, Express, PostgreSQL"
    },
    description: {
      "en": "An app where artists upload music, pay a subscription, and boom! It's distributed to all streaming platforms. I went deep into AWS and learned that music also needs solid backend 🎶",
      "es": "App donde artistas suben su música, pagan una suscripción y... ¡boom! Se distribuye automáticamente a todas las plataformas de streaming. Usé AWS a fondo y aprendí que la música también necesita buen backend 🎶",
      "fr": "Une app où les artistes uploadent leur musique, paient un abonnement et... boom ! Distribution sur toutes les plateformes. J'ai plongé dans AWS et appris que la musique a aussi besoin d'un bon backend 🎶"
    },
    status: {
      "en": "In testing mode",
      "es": "En modo pruebas",
      "fr": "En mode test"
    },
    link: {
      "en": "noddmusic.com",
      "es": "noddmusic.com",
      "fr": "noddmusic.com"
    }
  },
  {
    title: {
      "en": "Aidactic – International EdTech in Progress",
      "es": "Aidactic – EdTech internacional en proceso",
      "fr": "Aidactic – EdTech international en cours"
    },
    role: {
      "en": "Backend Engineer (my current job)",
      "es": "Backend Engineer (mi trabajo actual)",
      "fr": "Backend Engineer (mon job actuel)"
    },
    tech: {
      "en": "Next.js, GraphQL, REST API, MongoDB, AWS, Docker, Swagger",
      "es": "Next.js, GraphQL, REST API, MongoDB, AWS, Docker, Swagger",
      "fr": "Next.js, GraphQL, REST API, MongoDB, AWS, Docker, Swagger"
    },
    description: {
      "en": "Educational platform for high school and university students. I'm building APIs like bridges between REST and GraphQL. Integrated S3 for resources, Docker containers, and docs you'll actually want to read.",
      "es": "Plataforma educativa para estudiantes de secundaria y universidad. Estoy construyendo APIs como si fueran puentes entre mundos (REST y GraphQL en un solo backend, sí señor). Integración con S3 para recursos, contenedores con Docker y una documentación que sí se deja leer.",
      "fr": "Plateforme éducative pour lycéens et étudiants. Je construis des APIs comme des ponts entre REST et GraphQL. Intégration avec S3, conteneurs Docker et une doc agréable à lire."
    },
    status: {
      "en": "In development",
      "es": "En desarrollo",
      "fr": "En développement"
    },
    link: {
      "en": "Dev link only (coming soon to a screen near you)",
      "es": "Solo dev link por ahora (pronto en cines)",
      "fr": "Lien dev seulement (bientôt sur vos écrans)"
    }
  }
]

# Create projects
projects_data.each do |project_data|
  Project.create!(project_data)
end

puts "Created #{projects_data.length} projects" 