export const routes = {
  home: '/',
  metodologia: '/metodologia',
  estrutura: '/estrutura',
  planos: '/planos',
  matricula: '/matricula',
  sucesso: '/sucesso'
} as const;

export const navLinks = [
  { href: routes.home, label: 'Início' },
  { href: routes.metodologia, label: 'Metodologia' },
  { href: routes.estrutura, label: 'Estrutura' },
  { href: routes.planos, label: 'Planos' },
] as const; 