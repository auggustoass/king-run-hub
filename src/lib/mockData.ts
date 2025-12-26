// Mock data and types for KING RUN app

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  totalRaces: number;
  totalMedals: number;
  averagePosition: number;
  createdAt: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  distances: string[];
  imageUrl: string;
  registrationOpen: boolean;
  participantsCount: number;
  maxParticipants: number;
}

export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  distance: string;
  status: 'pending' | 'confirmed' | 'completed';
  qrCode: string;
  createdAt: string;
}

export interface RankingEntry {
  position: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  points: number;
  totalRaces: number;
  category: string;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  sponsor: string;
  sponsorLogo: string;
  startDate: string;
  endDate: string;
  goal: number;
  unit: string;
  badgeImageUrl: string;
}

export interface UserChallenge {
  challengeId: string;
  userId: string;
  progress: number;
  completed: boolean;
}

export interface Result {
  id: string;
  eventId: string;
  eventName: string;
  userId: string;
  time: string;
  generalPosition: number;
  categoryPosition: number;
  category: string;
  distance: string;
  date: string;
  certificateUrl?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  type: 'info' | 'event' | 'sponsor';
}

// Mock Data
export const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao@email.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
  totalRaces: 12,
  totalMedals: 5,
  averagePosition: 45,
  createdAt: '2024-01-15',
};

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'KING RUN São Paulo',
    date: '2025-02-15',
    location: 'Parque Ibirapuera, São Paulo',
    description: 'A maior corrida de rua de São Paulo! Venha participar dessa experiência única com milhares de corredores.',
    distances: ['5km', '10km', '21km'],
    imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
    registrationOpen: true,
    participantsCount: 2500,
    maxParticipants: 5000,
  },
  {
    id: '2',
    name: 'KING RUN Rio Night',
    date: '2025-03-20',
    location: 'Aterro do Flamengo, Rio de Janeiro',
    description: 'Corrida noturna com vista para o Pão de Açúcar. Uma experiência inesquecível!',
    distances: ['5km', '10km'],
    imageUrl: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800',
    registrationOpen: true,
    participantsCount: 1800,
    maxParticipants: 3000,
  },
  {
    id: '3',
    name: 'KING RUN Belo Horizonte',
    date: '2025-04-10',
    location: 'Praça da Liberdade, BH',
    description: 'Corra pelas belas ruas da capital mineira nesta edição especial.',
    distances: ['5km', '10km', '21km', '42km'],
    imageUrl: 'https://images.unsplash.com/photo-1461896836934- voices?w=800',
    registrationOpen: false,
    participantsCount: 0,
    maxParticipants: 4000,
  },
];

export const mockRanking: RankingEntry[] = [
  { position: 1, userId: '101', userName: 'Carlos Mendes', points: 2450, totalRaces: 15, category: 'Geral' },
  { position: 2, userId: '102', userName: 'Ana Paula Costa', points: 2380, totalRaces: 14, category: 'Geral' },
  { position: 3, userId: '103', userName: 'Roberto Lima', points: 2210, totalRaces: 13, category: 'Geral' },
  { position: 4, userId: '104', userName: 'Fernanda Oliveira', points: 2150, totalRaces: 12, category: 'Geral' },
  { position: 5, userId: '105', userName: 'Marcos Santos', points: 2080, totalRaces: 11, category: 'Geral' },
  { position: 6, userId: '106', userName: 'Julia Ferreira', points: 1950, totalRaces: 10, category: 'Geral' },
  { position: 7, userId: '107', userName: 'Pedro Almeida', points: 1890, totalRaces: 10, category: 'Geral' },
  { position: 8, userId: '1', userName: 'João Silva', points: 1750, totalRaces: 12, category: 'Geral' },
  { position: 9, userId: '109', userName: 'Camila Rodrigues', points: 1680, totalRaces: 9, category: 'Geral' },
  { position: 10, userId: '110', userName: 'Lucas Martins', points: 1620, totalRaces: 8, category: 'Geral' },
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    name: 'Desafio Nike 100km',
    description: 'Complete 100km em corridas durante o mês',
    sponsor: 'Nike',
    sponsorLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    goal: 100,
    unit: 'km',
    badgeImageUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=nike100',
  },
  {
    id: '2',
    name: 'Maratonista Gatorade',
    description: 'Participe de 5 corridas em 3 meses',
    sponsor: 'Gatorade',
    sponsorLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Gatorade_logo.svg',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    goal: 5,
    unit: 'corridas',
    badgeImageUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=gatorade5',
  },
  {
    id: '3',
    name: 'Corredor Matinal',
    description: 'Complete 20 corridas antes das 7h da manhã',
    sponsor: 'Adidas',
    sponsorLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
    startDate: '2025-01-01',
    endDate: '2025-06-30',
    goal: 20,
    unit: 'corridas',
    badgeImageUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=morning20',
  },
];

export const mockUserChallenges: UserChallenge[] = [
  { challengeId: '1', userId: '1', progress: 67, completed: false },
  { challengeId: '2', userId: '1', progress: 3, completed: false },
  { challengeId: '3', userId: '1', progress: 8, completed: false },
];

export const mockResults: Result[] = [
  {
    id: '1',
    eventId: 'past-1',
    eventName: 'KING RUN Curitiba 2024',
    userId: '1',
    time: '00:52:34',
    generalPosition: 156,
    categoryPosition: 23,
    category: 'M30-34',
    distance: '10km',
    date: '2024-11-10',
  },
  {
    id: '2',
    eventId: 'past-2',
    eventName: 'KING RUN Porto Alegre 2024',
    userId: '1',
    time: '01:48:12',
    generalPosition: 89,
    categoryPosition: 12,
    category: 'M30-34',
    distance: '21km',
    date: '2024-09-22',
  },
  {
    id: '3',
    eventId: 'past-3',
    eventName: 'KING RUN Floripa 2024',
    userId: '1',
    time: '00:26:45',
    generalPosition: 234,
    categoryPosition: 45,
    category: 'M30-34',
    distance: '5km',
    date: '2024-07-15',
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Inscrições abertas para São Paulo!',
    content: 'Garanta já sua vaga na maior corrida do ano. Vagas limitadas!',
    imageUrl: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800',
    createdAt: '2025-01-20',
    type: 'event',
  },
  {
    id: '2',
    title: 'Novo patrocinador: Nike',
    content: 'Temos o prazer de anunciar a Nike como patrocinadora oficial das nossas corridas em 2025.',
    createdAt: '2025-01-18',
    type: 'sponsor',
  },
  {
    id: '3',
    title: 'Atualização do app',
    content: 'Nova versão disponível com melhorias de desempenho e novos recursos.',
    createdAt: '2025-01-15',
    type: 'info',
  },
];

// Helper functions
export const getTimeUntilEvent = (dateString: string): { days: number; hours: number; minutes: number } => {
  const eventDate = new Date(dateString);
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime();
  
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes };
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
};
