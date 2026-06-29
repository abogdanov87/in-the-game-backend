// Mock данные для приложения

export interface Player {
  id: number;
  name: string;
  points: number;
  correctPredictions: number;
  totalPredictions: number;
  accuracy: number;
  exactScores: number;
  correctOutcomes: number;
  correctDiff: number;
}

export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  status: 'completed' | 'upcoming';
  tournament: string;
  stage: string;
}

export interface Prediction {
  id: number;
  matchId: number;
  playerId: number;
  playerName: string;
  homeScore: number;
  awayScore: number;
  points?: number;
}

// Игроки и их результаты
// correctPredictions = exactScores + correctOutcomes + correctDiff
export const players: Player[] = [
  { id: 1,  name: 'Александр Иванов', points: 145, correctPredictions: 23, totalPredictions: 30, accuracy: 76.7, exactScores: 8, correctOutcomes: 9, correctDiff: 6 },
  { id: 2,  name: 'Мария Петрова',     points: 138, correctPredictions: 21, totalPredictions: 30, accuracy: 70.0, exactScores: 7, correctOutcomes: 8, correctDiff: 6 },
  { id: 3,  name: 'Дмитрий Сидоров',  points: 132, correctPredictions: 20, totalPredictions: 30, accuracy: 66.7, exactScores: 7, correctOutcomes: 7, correctDiff: 6 },
  { id: 4,  name: 'Елена Козлова',     points: 128, correctPredictions: 19, totalPredictions: 30, accuracy: 63.3, exactScores: 6, correctOutcomes: 7, correctDiff: 6 },
  { id: 5,  name: 'Сергей Морозов',   points: 125, correctPredictions: 19, totalPredictions: 30, accuracy: 63.3, exactScores: 6, correctOutcomes: 7, correctDiff: 6 },
  { id: 6,  name: 'Ольга Новикова',   points: 118, correctPredictions: 18, totalPredictions: 30, accuracy: 60.0, exactScores: 6, correctOutcomes: 6, correctDiff: 6 },
  { id: 7,  name: 'Андрей Волков',    points: 115, correctPredictions: 17, totalPredictions: 30, accuracy: 56.7, exactScores: 5, correctOutcomes: 6, correctDiff: 6 },
  { id: 8,  name: 'Татьяна Соколова', points: 110, correctPredictions: 16, totalPredictions: 30, accuracy: 53.3, exactScores: 5, correctOutcomes: 5, correctDiff: 6 },
  { id: 9,  name: 'Михаил Лебедев',   points: 105, correctPredictions: 15, totalPredictions: 30, accuracy: 50.0, exactScores: 4, correctOutcomes: 5, correctDiff: 6 },
  { id: 10, name: 'Наталья Егорова',  points: 98,  correctPredictions: 14, totalPredictions: 30, accuracy: 46.7, exactScores: 4, correctOutcomes: 4, correctDiff: 6 },
];

// Матчи
export const matches: Match[] = [
  // Завершенные матчи
  {
    id: 1,
    homeTeam: 'Спартак',
    awayTeam: 'ЦСКА',
    homeScore: 2,
    awayScore: 1,
    date: '2026-06-20T18:00:00',
    status: 'completed',
    tournament: 'Российская Премьер-Лига',
    stage: 'Групповой этап · Тур 28',
  },
  {
    id: 2,
    homeTeam: 'Зенит',
    awayTeam: 'Локомотив',
    homeScore: 3,
    awayScore: 3,
    date: '2026-06-21T20:00:00',
    status: 'completed',
    tournament: 'Российская Премьер-Лига',
    stage: 'Групповой этап · Тур 28',
  },
  {
    id: 3,
    homeTeam: 'Краснодар',
    awayTeam: 'Динамо',
    homeScore: 1,
    awayScore: 0,
    date: '2026-06-22T17:00:00',
    status: 'completed',
    tournament: 'Российская Премьер-Лига',
    stage: 'Групповой этап · Тур 29',
  },
  {
    id: 4,
    homeTeam: 'Ростов',
    awayTeam: 'Рубин',
    homeScore: 2,
    awayScore: 2,
    date: '2026-06-23T19:00:00',
    status: 'completed',
    tournament: 'Российская Премьер-Лига',
    stage: 'Групповой этап · Тур 29',
  },
  // Предстоящие матчи
  {
    id: 5,
    homeTeam: 'ЦСКА',
    awayTeam: 'Зенит',
    homeScore: null,
    awayScore: null,
    date: '2026-06-28T18:00:00',
    status: 'upcoming',
    tournament: 'Российская Премьер-Лига',
    stage: 'Четвертьфинал',
  },
  {
    id: 6,
    homeTeam: 'Локомотив',
    awayTeam: 'Спартак',
    homeScore: null,
    awayScore: null,
    date: '2026-06-29T20:00:00',
    status: 'upcoming',
    tournament: 'Российская Премьер-Лига',
    stage: 'Четвертьфинал',
  },
  {
    id: 7,
    homeTeam: 'Динамо',
    awayTeam: 'Краснодар',
    homeScore: null,
    awayScore: null,
    date: '2026-06-30T19:00:00',
    status: 'upcoming',
    tournament: 'Российская Премьер-Лига',
    stage: 'Полуфинал',
  },
  {
    id: 8,
    homeTeam: 'Рубин',
    awayTeam: 'Ростов',
    homeScore: null,
    awayScore: null,
    date: '2026-07-01T18:30:00',
    status: 'upcoming',
    tournament: 'Российская Премьер-Лига',
    stage: 'Финал',
  },
];

// Прогнозы для завершенных матчей
export const predictions: Prediction[] = [
  // Матч 1: Спартак 2-1 ЦСКА
  { id: 1, matchId: 1, playerId: 1, playerName: 'Александр Иванов', homeScore: 2, awayScore: 1, points: 5 },
  { id: 2, matchId: 1, playerId: 2, playerName: 'Мария Петрова', homeScore: 1, awayScore: 1, points: 2 },
  { id: 3, matchId: 1, playerId: 3, playerName: 'Дмитрий Сидоров', homeScore: 2, awayScore: 0, points: 3 },
  
  // Матч 2: Зенит 3-3 Локомотив
  { id: 4, matchId: 2, playerId: 1, playerName: 'Александр Иванов', homeScore: 2, awayScore: 2, points: 2 },
  { id: 5, matchId: 2, playerId: 2, playerName: 'Мария Петрова', homeScore: 3, awayScore: 3, points: 5 },
  { id: 6, matchId: 2, playerId: 3, playerName: 'Дмитрий Сидоров', homeScore: 2, awayScore: 1, points: 0 },
  
  // Матч 3: Краснодар 1-0 Динамо
  { id: 7, matchId: 3, playerId: 1, playerName: 'Александр Иванов', homeScore: 1, awayScore: 0, points: 5 },
  { id: 8, matchId: 3, playerId: 2, playerName: 'Мария Петрова', homeScore: 2, awayScore: 0, points: 3 },
  { id: 9, matchId: 3, playerId: 3, playerName: 'Дмитрий Сидоров', homeScore: 1, awayScore: 1, points: 2 },
];

// Прогнозы текущего пользователя (завершённые + предстоящие)
export const myPredictions: { [matchId: number]: { homeScore: number; awayScore: number } } = {
  1: { homeScore: 2, awayScore: 1 }, // Точный счёт — Спартак 2:1 ЦСКА
  2: { homeScore: 2, awayScore: 2 }, // Угадан исход (ничья), счёт другой (3:3)
  3: { homeScore: 1, awayScore: 0 }, // Точный счёт — Краснодар 1:0 Динамо
  4: { homeScore: 1, awayScore: 0 }, // Неверно (факт 2:2)
  5: { homeScore: 1, awayScore: 2 },
  6: { homeScore: 2, awayScore: 2 },
};

export const currentUser = {
  id: 1,
  name: 'Александр Иванов',
  email: 'aleksandr.ivanov@example.com'
};

export const teams: string[] = [
  'Спартак', 'ЦСКА', 'Зенит', 'Локомотив',
  'Краснодар', 'Динамо', 'Ростов', 'Рубин',
];

export const teamColors: Record<string, string> = {
  'Спартак': '#e8102c',
  'ЦСКА': '#003478',
  'Зенит': '#0070CC',
  'Локомотив': '#00923F',
  'Краснодар': '#1d5e2a',
  'Динамо': '#005baa',
  'Ростов': '#003d79',
  'Рубин': '#82001e',
};

export interface TournamentStats {
  tournament: string;
  points: number;
  totalPredictions: number;
  exactScores: number;
  correctOutcomes: number;
  correctDiff: number;
}

// Per-tournament breakdown. Totals match players[] aggregate.
// Split: РПЛ = 20 predictions, Кубок России = 10 predictions.
export const playerTournamentStats: Record<number, TournamentStats[]> = {
  1:  [{ tournament: 'Российская Премьер-Лига', points: 98, totalPredictions: 20, exactScores: 6, correctOutcomes: 6, correctDiff: 4 },
       { tournament: 'Кубок России',            points: 47, totalPredictions: 10, exactScores: 2, correctOutcomes: 3, correctDiff: 2 }],
  2:  [{ tournament: 'Российская Премьер-Лига', points: 93, totalPredictions: 20, exactScores: 5, correctOutcomes: 5, correctDiff: 4 },
       { tournament: 'Кубок России',            points: 45, totalPredictions: 10, exactScores: 2, correctOutcomes: 3, correctDiff: 2 }],
  3:  [{ tournament: 'Российская Премьер-Лига', points: 88, totalPredictions: 20, exactScores: 5, correctOutcomes: 4, correctDiff: 4 },
       { tournament: 'Кубок России',            points: 44, totalPredictions: 10, exactScores: 2, correctOutcomes: 3, correctDiff: 2 }],
  4:  [{ tournament: 'Российская Премьер-Лига', points: 85, totalPredictions: 20, exactScores: 4, correctOutcomes: 5, correctDiff: 4 },
       { tournament: 'Кубок России',            points: 43, totalPredictions: 10, exactScores: 2, correctOutcomes: 2, correctDiff: 2 }],
  5:  [{ tournament: 'Российская Премьер-Лига', points: 83, totalPredictions: 20, exactScores: 4, correctOutcomes: 5, correctDiff: 4 },
       { tournament: 'Кубок России',            points: 42, totalPredictions: 10, exactScores: 2, correctOutcomes: 2, correctDiff: 2 }],
  6:  [{ tournament: 'Российская Премьер-Лига', points: 79, totalPredictions: 20, exactScores: 4, correctOutcomes: 4, correctDiff: 4 },
       { tournament: 'Кубок России',            points: 39, totalPredictions: 10, exactScores: 2, correctOutcomes: 2, correctDiff: 2 }],
  7:  [{ tournament: 'Российская Премьер-Лига', points: 77, totalPredictions: 20, exactScores: 3, correctOutcomes: 4, correctDiff: 4 },
       { tournament: 'Кубок России',            points: 38, totalPredictions: 10, exactScores: 2, correctOutcomes: 2, correctDiff: 2 }],
  8:  [{ tournament: 'Российская Премьер-Лига', points: 73, totalPredictions: 20, exactScores: 3, correctOutcomes: 3, correctDiff: 4 },
       { tournament: 'Кубок России',            points: 37, totalPredictions: 10, exactScores: 2, correctOutcomes: 2, correctDiff: 2 }],
  9:  [{ tournament: 'Российская Премьер-Лига', points: 70, totalPredictions: 20, exactScores: 3, correctOutcomes: 3, correctDiff: 4 },
       { tournament: 'Кубок России',            points: 35, totalPredictions: 10, exactScores: 1, correctOutcomes: 2, correctDiff: 2 }],
  10: [{ tournament: 'Российская Премьер-Лига', points: 65, totalPredictions: 20, exactScores: 3, correctOutcomes: 2, correctDiff: 4 },
       { tournament: 'Кубок России',            points: 33, totalPredictions: 10, exactScores: 1, correctOutcomes: 2, correctDiff: 2 }],
};

export const playerFavorites: Record<number, string[]> = {
  1: ['Спартак', 'Краснодар'],
  2: ['Зенит', 'Локомотив', 'ЦСКА'],
  3: ['ЦСКА'],
  4: ['Динамо', 'Краснодар'],
  5: ['Ростов', 'Рубин', 'Спартак'],
  6: ['Зенит'],
  7: ['Спартак', 'Локомотив'],
  8: ['Краснодар', 'Динамо'],
  9: ['ЦСКА', 'Зенит'],
  10: ['Рубин'],
};
