export interface Starter {
  name: string;
  template: string;
  repo?: string;
  script?: string;
  description?: string;
  docs?: string;
  hidden?: boolean;
  prefix?: string;
}

export const STARTERS: Starter[] = [
  {
    name: 'Nextjs',
    repo: 'khulnasoft-com/khulnasoft',
    template: 'starter',
    description: 'Basic React app with nextjs server-side rendering (SSG/ISR)',
    docs: 'https://www.khulnasoft.com/blog/visual-next-js',
    prefix: 'starters/create-khulnasoft/nextjs',
  },
  {
    name: 'React',
    repo: 'khulnasoft-com/khulnasoft',
    template: 'starter',
    description: 'Simple create-react-app using khulnasoft',
    docs: 'https://www.khulnasoft.com/blog/drag-drop-react',
    prefix: 'starters/create-khulnasoft/create-react-app',
  },
];

export function getStarterRepo(starterName: string): Starter {
  const repo = STARTERS.find(starter => starter.name === starterName);
  if (!repo) {
    throw new Error(`Starter "${starterName}" does not exist.`);
  }
  return repo;
}
