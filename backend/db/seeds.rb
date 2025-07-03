# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create sample levels for the interactive portfolio
Level.destroy_all

Level.create!([
  {
    id: 101,
    titles: {
      en: "Authentication Madness",
      es: "Caos de Autenticación",
      fr: "Chaos d'Authentification"
    },
    descriptions: {
      en: "Learn how I debugged one of the trickiest bugs in our Clerk integration.",
      es: "Descubre cómo depuré uno de los bugs más complejos en nuestra integración con Clerk.",
      fr: "Découvrez comment j'ai débogué un bug complexe lié à Clerk."
    },
    question: {
      en: "User tokens were not being validated properly across environments. What did I do?",
      es: "Los tokens de usuario no se validaban bien entre entornos. ¿Qué hice?",
      fr: "Les jetons utilisateur n'étaient pas correctement validés entre environnements. Qu'ai-je fait ?"
    },
    options: {
      A: {
        en: "I rewrote the entire auth logic from scratch to make sure it was clean.",
        es: "Reescribí toda la lógica de autenticación desde cero para que quedara limpia.",
        fr: "J'ai réécrit toute la logique d'authentification à partir de zéro."
      },
      B: {
        en: "I debugged the token flow, built test routes, and proposed a safer validation structure.",
        es: "Depuré el flujo de tokens, creé rutas de prueba y propuse una validación más segura.",
        fr: "J'ai débogué le flux, créé des routes de test et proposé une structure plus sûre."
      }
    },
    correct_option: "B",
    explanation: {
      en: "The issue was due to environment differences. I added debug routes, improved error handling, and proposed a safer structure.",
      es: "El problema eran diferencias entre entornos. Agregué rutas de prueba, mejoré el manejo de errores y propuse una validación más segura.",
      fr: "Le problème venait des environnements. J'ai ajouté des routes de test, amélioré les erreurs et proposé une structure plus fiable."
    }
  },
  {
    id: 102,
    titles: {
      en: "Infra Overload",
      es: "Sobrecarga de Infraestructura",
      fr: "Surcharge d'Infrastructure"
    },
    descriptions: {
      en: "Explore how I improved our deploy pipeline under pressure.",
      es: "Explora cómo mejoré nuestro pipeline de deploy bajo presión.",
      fr: "Découvrez comment j'ai optimisé notre pipeline de déploiement sous pression."
    },
    question: {
      en: "Our deploy pipeline was too slow and rebuilding everything every time. What did I do?",
      es: "Nuestro pipeline era lento y reconstruía todo siempre. ¿Qué hice?",
      fr: "Notre pipeline était trop lent et reconstruisait tout à chaque fois. Qu'ai-je fait ?"
    },
    options: {
      A: {
        en: "I split the pipeline so it would only build REST or GraphQL, depending on the changes.",
        es: "Dividí el pipeline para que solo construyera REST o GraphQL según los cambios.",
        fr: "J'ai séparé les builds REST et GraphQL selon les changements."
      },
      B: {
        en: "I removed all build steps and started deploying manually for faster control.",
        es: "Eliminé los pasos del build y empecé a hacer deploys manualmente.",
        fr: "J'ai supprimé les étapes du build et commencé les déploiements manuels."
      }
    },
    correct_option: "A",
    explanation: {
      en: "Manual deploys create more chaos long-term. I isolated builds and improved CI/CD scalability.",
      es: "Los deploys manuales generan caos. Separé los builds y mejoré la escalabilidad de CI/CD.",
      fr: "Les déploiements manuels sont chaotiques. J'ai isolé les builds pour une meilleure CI/CD."
    }
  },
  {
    id: 103,
    titles: {
      en: "The Endpoint Dilemma",
      es: "El Dilema del Endpoint",
      fr: "Le Dilemme de l'Endpoint"
    },
    descriptions: {
      en: "See how I made a shared endpoint work for multiple use cases without duplicating logic.",
      es: "Mira cómo hice que un solo endpoint funcionara para múltiples casos sin duplicar lógica.",
      fr: "Comment j'ai rendu un endpoint polyvalent sans dupliquer la logique."
    },
    question: {
      en: "The endpoint /me was returning too much data and slowing down the student app. What did I do?",
      es: "El endpoint /me devolvía demasiada data y ralentizaba la app. ¿Qué hice?",
      fr: "Le endpoint /me envoyait trop de données. Que faire ?"
    },
    options: {
      A: {
        en: "I removed half the data and told the frontend team to request the rest separately.",
        es: "Eliminé la mitad de los datos y pedí al frontend que solicitara el resto aparte.",
        fr: "J'ai retiré la moitié des données et demandé au frontend de les charger séparément."
      },
      B: {
        en: "I added query parameters to load extra data only when needed, keeping the endpoint lean by default.",
        es: "Agregué query params para cargar datos extra solo si se necesitaban.",
        fr: "J'ai ajouté des query params pour charger des données supplémentaires uniquement si nécessaire."
      }
    },
    correct_option: "B",
    explanation: {
      en: "Query params like `includeEnrolled` made the endpoint lean, flexible, and reusable.",
      es: "Query params como `includeEnrolled` hicieron el endpoint más flexible y eficiente.",
      fr: "Des query params comme `includeEnrolled` ont rendu le endpoint plus flexible."
    }
  },
  {
    id: 104,
    titles: {
      en: "Gamification Chaos",
      es: "Caos de Gamificación",
      fr: "Chaos de Gamification"
    },
    descriptions: {
      en: "Learn how I brought order to streaks, EXP, badges, and skills — and made them work together.",
      es: "Descubre cómo hice que las streaks, EXP, badges y skills funcionaran en conjunto.",
      fr: "Comment j'ai harmonisé les streaks, EXP, badges et skills pour les faire fonctionner ensemble."
    },
    question: {
      en: "The streak and EXP system broke after database changes. What was my approach?",
      es: "El sistema de streaks y EXP se rompió tras cambios en la base. ¿Qué hice?",
      fr: "Le système de streak et EXP a cassé après des changements. Quelle a été ma démarche ?"
    },
    options: {
      A: {
        en: "I manually updated values in the DB and hoped the logic worked later.",
        es: "Actualicé valores a mano en la base y esperé que funcionara.",
        fr: "J'ai modifié les valeurs à la main et espéré que ça marche."
      },
      B: {
        en: "I tested the whole flow end-to-end, debugged the logic, and coordinated with frontend to align expectations.",
        es: "Probé el flujo completo, depuré la lógica y coordiné con el frontend para alinear expectativas.",
        fr: "J'ai testé tout le flux, corrigé la logique et aligné avec le frontend."
      }
    },
    correct_option: "B",
    explanation: {
      en: "I didn't patch blindly. I tested, aligned the flow, and fixed the root cause.",
      es: "No parchamos sin pensar. Probé todo, alineé y arreglé desde raíz.",
      fr: "Pas de patch aveugle : j'ai testé, aligné et résolu à la racine."
    }
  }
])
