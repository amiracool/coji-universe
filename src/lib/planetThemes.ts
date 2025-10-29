export interface PlanetTheme {
  id: string;
  name: string;
  emoji: string;
  colours: {
    primary: string;
    secondary: string;
    tertiary: string;
    gradient: string;
  };
  atmosphere: {
    background: string;
    stars: string;
    glow: string;
  };
}

export const planetThemes: Record<string, PlanetTheme> = {
  'autism-support': {
    id: 'autism-support',
    name: 'Autism Support',
    emoji: '🌈',
    colours: {
      primary: '#a78bfa', // lavender
      secondary: '#06b6d4', // cyan
      tertiary: '#6366f1', // indigo
      gradient: 'linear-gradient(135deg, #a78bfa 0%, #06b6d4 50%, #6366f1 100%)'
    },
    atmosphere: {
      background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 50%, #020617 100%)',
      stars: '#a78bfa',
      glow: 'rgba(167, 139, 250, 0.15)'
    }
  },

  'adhd-support': {
    id: 'adhd-support',
    name: 'ADHD Support',
    emoji: '🎯',
    colours: {
      primary: '#fb923c', // tangerine
      secondary: '#f472b6', // coral
      tertiary: '#fbbf24', // gold
      gradient: 'linear-gradient(135deg, #fb923c 0%, #f472b6 50%, #fbbf24 100%)'
    },
    atmosphere: {
      background: 'radial-gradient(ellipse at top, #431407 0%, #0f172a 50%, #020617 100%)',
      stars: '#fb923c',
      glow: 'rgba(251, 146, 60, 0.15)'
    }
  },

  'dyspraxia': {
    id: 'dyspraxia',
    name: 'Dyspraxia Support',
    emoji: '🌊',
    colours: {
      primary: '#14b8a6', // teal
      secondary: '#6ee7b7', // mint
      tertiary: '#2dd4bf', // blue-green
      gradient: 'linear-gradient(135deg, #14b8a6 0%, #6ee7b7 50%, #2dd4bf 100%)'
    },
    atmosphere: {
      background: 'radial-gradient(ellipse at top, #042f2e 0%, #0f172a 50%, #020617 100%)',
      stars: '#14b8a6',
      glow: 'rgba(20, 184, 166, 0.15)'
    }
  },

  'dyslexia-dyscalculia': {
    id: 'dyslexia-dyscalculia',
    name: 'Dyslexia & Dyscalculia',
    emoji: '📚',
    colours: {
      primary: '#ec4899', // berry pink
      secondary: '#a855f7', // deep purple
      tertiary: '#f472b6', // rose
      gradient: 'linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #f472b6 100%)'
    },
    atmosphere: {
      background: 'radial-gradient(ellipse at top, #3b0764 0%, #0f172a 50%, #020617 100%)',
      stars: '#ec4899',
      glow: 'rgba(236, 72, 153, 0.15)'
    }
  },

  'anxiety-tools': {
    id: 'anxiety-tools',
    name: 'Anxiety Tools',
    emoji: '🧘',
    colours: {
      primary: '#94a3b8', // soft grey-blue
      secondary: '#cbd5e1', // silver
      tertiary: '#64748b', // slate
      gradient: 'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 50%, #64748b 100%)'
    },
    atmosphere: {
      background: 'radial-gradient(ellipse at top, #1e293b 0%, #0f172a 50%, #020617 100%)',
      stars: '#94a3b8',
      glow: 'rgba(148, 163, 184, 0.15)'
    }
  },

  'depression-support': {
    id: 'depression-support',
    name: 'Depression Support',
    emoji: '💙',
    colours: {
      primary: '#60a5fa', // gentle blue
      secondary: '#a78bfa', // soft purple
      tertiary: '#818cf8', // lavender-blue
      gradient: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #818cf8 100%)'
    },
    atmosphere: {
      background: 'radial-gradient(ellipse at top, #1e3a8a 0%, #0f172a 50%, #020617 100%)',
      stars: '#60a5fa',
      glow: 'rgba(96, 165, 250, 0.15)'
    }
  },

  'parenting-hub': {
    id: 'parenting-hub',
    name: 'Parenting Hub',
    emoji: '👪',
    colours: {
      primary: '#f97316', // warm orange
      secondary: '#fbbf24', // sunshine
      tertiary: '#fb923c', // coral
      gradient: 'linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #fb923c 100%)'
    },
    atmosphere: {
      background: 'radial-gradient(ellipse at top, #431407 0%, #0f172a 50%, #020617 100%)',
      stars: '#f97316',
      glow: 'rgba(249, 115, 22, 0.15)'
    }
  },

  'work-wellbeing': {
    id: 'work-wellbeing',
    name: 'Work & Wellbeing',
    emoji: '💼',
    colours: {
      primary: '#10b981', // emerald
      secondary: '#14b8a6', // teal
      tertiary: '#22c55e', // green
      gradient: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #22c55e 100%)'
    },
    atmosphere: {
      background: 'radial-gradient(ellipse at top, #022c22 0%, #0f172a 50%, #020617 100%)',
      stars: '#10b981',
      glow: 'rgba(16, 185, 129, 0.15)'
    }
  },

  'relationships': {
    id: 'relationships',
    name: 'Relationships',
    emoji: '💕',
    colours: {
      primary: '#ec4899', // pink
      secondary: '#f472b6', // rose
      tertiary: '#d946ef', // fuchsia
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #d946ef 100%)'
    },
    atmosphere: {
      background: 'radial-gradient(ellipse at top, #831843 0%, #0f172a 50%, #020617 100%)',
      stars: '#ec4899',
      glow: 'rgba(236, 72, 153, 0.15)'
    }
  },

  'chronic-illness': {
    id: 'chronic-illness',
    name: 'Chronic Illness',
    emoji: '💊',
    colours: {
      primary: '#8b5cf6', // purple
      secondary: '#a78bfa', // lavender
      tertiary: '#c084fc', // light purple
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 50%, #c084fc 100%)'
    },
    atmosphere: {
      background: 'radial-gradient(ellipse at top, #3b0764 0%, #0f172a 50%, #020617 100%)',
      stars: '#8b5cf6',
      glow: 'rgba(139, 92, 246, 0.15)'
    }
  },

  'time-management': {
    id: 'time-management',
    name: 'Time Management',
    emoji: '⏰',
    colours: {
      primary: '#06b6d4', // cyan
      secondary: '#0ea5e9', // sky
      tertiary: '#14b8a6', // teal
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 50%, #14b8a6 100%)'
    },
    atmosphere: {
      background: 'radial-gradient(ellipse at top, #164e63 0%, #0f172a 50%, #020617 100%)',
      stars: '#06b6d4',
      glow: 'rgba(6, 182, 212, 0.15)'
    }
  },

  'memory-tools': {
    id: 'memory-tools',
    name: 'Memory Tools',
    emoji: '🧠',
    colours: {
      primary: '#f59e0b', // amber
      secondary: '#fbbf24', // yellow
      tertiary: '#f97316', // orange
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f97316 100%)'
    },
    atmosphere: {
      background: 'radial-gradient(ellipse at top, #78350f 0%, #0f172a 50%, #020617 100%)',
      stars: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.15)'
    }
  }
};

export function getPlanetTheme(planetId: string): PlanetTheme {
  return planetThemes[planetId] || planetThemes['autism-support'];
}
