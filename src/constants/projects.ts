export interface Project {
  id: string;
  name: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  techs: string[];
  links: {
    website?: string;
    github?: string;
    demo?: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    name: 'Axion Framework',
    description: 'High-performance web framework with real-time capabilities',
    videoUrl: undefined, // Add your video URL here
    techs: ['React', 'TypeScript', 'WebSocket', 'Node.js'],
    links: {
      github: 'https://github.com/sebxdixz/axion',
      website: 'https://axion.dev'
    }
  },
  {
    id: 'project-2',
    name: 'N1K70 Labs',
    description: 'Experimental AI and machine learning playground',
    videoUrl: undefined, // Add your video URL here
    techs: ['Python', 'PyTorch', 'FastAPI', 'React'],
    links: {
      github: 'https://github.com/sebxdixz/n1k70-labs'
    }
  },
  {
    id: 'project-3',
    name: 'Creative Portfolio',
    description: 'Immersive portfolio experience with advanced animations',
    videoUrl: undefined, // Add your video URL here
    techs: ['React Native', 'Reanimated', 'Expo', 'Web'],
    links: {
      website: 'https://sebastiandiaz.dev'
    }
  },
  {
    id: 'project-4',
    name: 'Design System',
    description: 'Comprehensive component library for modern web applications',
    videoUrl: undefined, // Add your video URL here
    techs: ['React', 'Styled Components', 'TypeScript', 'Storybook'],
    links: {
      github: 'https://github.com/sebxdixz/design-system'
    }
  }
];
