export interface Planet {
  id: string;
  title: string;
  description: string;
  emoji: string;
  colour: string;
  route: string;
}

export interface LibraryCategory {
  id: string;
  title: string;
  description: string;
  route: string;
  planets: Planet[];
}

export const libraryCategories: LibraryCategory[] = [
  {
    id: "executive-function",
    title: "Executive Function & Productivity",
    description: "Time management, focus, memory, and getting things done",
    route: "/library/executive-function",
    planets: [
      {
        id: "adhd",
        title: "ADHD Support",
        description: "Body doubling, time blocking, dopamine menus",
        emoji: "🚀",
        colour: "#F96E46",
        route: "/planets/adhd"
      },
      // Add more planets for this category
    ]
  },
  {
    id: "regulation",
    title: "Sensory, Emotional & Regulation",
    description: "Grounding, sensory tools, emotional regulation, pacing",
    route: "/library/regulation",
    planets: [
      {
        id: "autism",
        title: "Autism Support",
        description: "Sensory tools, social scripts, stim acceptance",
        emoji: "🧩",
        colour: "#14b8a6",
        route: "/planets/autism"
      },
      {
        id: "anxiety",
        title: "Anxiety Tools",
        description: "Grounding, breathing, worry management",
        emoji: "🌊",
        colour: "#9B86E8",
        route: "/planets/anxiety"
      },
      {
        id: "chronic-illness",
        title: "Chronic Illness",
        description: "Pacing, energy management, pain strategies",
        emoji: "💚",
        colour: "#6EBD8E",
        route: "/planets/chronic-illness"
      },
      {
        id: "depression",
        title: "Depression Support",
        description: "Motivation, energy, self-compassion",
        emoji: "🌙",
        colour: "#7D6B9D",
        route: "/planets/depression"
      }
    ]
  },
  {
    id: "relationships",
    title: "Relationships, Parenting & Work",
    description: "Connection, communication, parenting with ND brain",
    route: "/library/relationships",
    planets: [
      {
        id: "parenting",
        title: "Parenting Hub",
        description: "Neurodivergent parenting, school support, behaviour",
        emoji: "👨‍👩‍👧‍👦",
        colour: "#FDCB6E",
        route: "/planets/parenting"
      },
      {
        id: "ideas-questions",
        title: "Ideas & Questions",
        description: "Curiosity, exploration, self-advocacy",
        emoji: "💭",
        colour: "#A78BFA",
        route: "/planets/ideas-questions"
      }
    ]
  },
  {
    id: "learning",
    title: "Learning Differences & Motor",
    description: "Reading, maths, coordination, movement",
    route: "/library/learning",
    planets: [
      {
        id: "dyslexia",
        title: "Dyslexia Support",
        description: "Reading tools, fonts, visual thinking",
        emoji: "📖",
        colour: "#FF6B9D",
        route: "/planets/dyslexia"
      },
      {
        id: "dyscalculia",
        title: "Dyscalculia Support",
        description: "Number sense, maths strategies, visual aids",
        emoji: "🔢",
        colour: "#FFD966",
        route: "/planets/dyscalculia"
      },
      {
        id: "dyspraxia",
        title: "Dyspraxia Support",
        description: "Coordination, movement, spatial awareness",
        emoji: "🤸",
        colour: "#5DADE2",
        route: "/planets/dyspraxia"
      }
    ]
  }
];

// Helper function to get all planets across all categories
export function getAllPlanets(): Planet[] {
  return libraryCategories.flatMap(category => category.planets);
}

// Helper function to get a category by ID
export function getCategoryById(id: string): LibraryCategory | undefined {
  return libraryCategories.find(cat => cat.id === id);
}

// Helper function to search across all planets
export function searchPlanets(query: string): Planet[] {
  const lowerQuery = query.toLowerCase();
  return getAllPlanets().filter(planet =>
    planet.title.toLowerCase().includes(lowerQuery) ||
    planet.description.toLowerCase().includes(lowerQuery)
  );
}
