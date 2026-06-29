const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export interface ApiUser {
  id?: number;
  username: string;
  email?: string;
  nickname?: string;
  avatar?: string | null;
}

export interface TournamentSummary {
  id: number;
  title: string;
  logo?: string | null;
  active: boolean;
  participants: number;
  base_tournament: {
    id: number;
    title: string;
  };
}

export interface ParticipantScore {
  points: number;
  tournament_bonuses: number;
  forecasts_count: number;
  exact_result: number;
  goals_difference: number;
  match_result: number;
}

export interface TournamentParticipant {
  id: number;
  user: ApiUser;
  score: ParticipantScore;
}

export interface TournamentTable {
  id: number;
  title: string;
  logo?: string | null;
  active: boolean;
  tournament_participant: TournamentParticipant[];
}

export interface TeamShort {
  id: number;
  title: string;
  short_title?: string;
  badge?: string | null;
}

export interface MatchResult {
  id: number;
  result_type: string;
  score_home: number | null;
  score_away: number | null;
}

export interface ForecastShort {
  id: number | null;
  forecast_type: string | null;
  score_home: number | null;
  score_away: number | null;
}

export interface ApiMatch {
  id: number;
  stage: string;
  team_home: TeamShort;
  team_away: TeamShort;
  start_date: string;
  place?: string;
  status: 'not started' | 'started' | 'finished' | 'cancelled' | string;
  status_label: string;
  match_result: MatchResult[];
  forecast?: ForecastShort | ForecastShort[] | null;
}

export interface TournamentMatches {
  id: number;
  title: string;
  logo?: string | null;
  matches: ApiMatch[];
}

export interface ForecastScore extends ForecastShort {
  user: ApiUser;
  tournament: number;
  match: number;
  score?: ParticipantScore;
}

export interface MatchDetails extends ApiMatch {
  forecasts: ForecastScore[];
}

export interface MatchForecastPair {
  match: { id: number };
  forecast: ForecastShort | null;
}

export interface Player {
  id: number;
  userId?: number;
  username?: string;
  email?: string;
  avatar?: string | null;
  name: string;
  points: number;
  correctPredictions: number;
  totalPredictions: number;
  accuracy: number;
  exactScores: number;
  correctOutcomes: number;
  correctDiff: number;
  tournamentTitle?: string;
}

export interface UiMatch {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeBadge?: string | null;
  awayBadge?: string | null;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  status: 'completed' | 'upcoming' | 'live' | 'cancelled';
  tournament: string;
  stage: string;
  forecast?: ForecastShort | null;
}

export function normalizeMediaUrl(value?: string | null) {
  if (!value) return null;
  if (/^(https?:|data:|blob:|\/)/.test(value)) return value;
  return `/files/${value}`;
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}

export function saveTokens(tokens: { access: string; refresh: string }) {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
  localStorage.setItem('isAuthenticated', 'true');
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem('isAuthenticated');
}

async function request<T>(url: string, init: RequestInit = {}): Promise<T> {
  const token = getAccessToken();
  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, { ...init, headers });
  if (!response.ok) {
    let message = response.statusText;
    try {
      const data = await response.json();
      message = data.detail || data.message || JSON.stringify(data);
    } catch {}
    throw new Error(message || `HTTP ${response.status}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export function requestLoginCode(email: string) {
  return request<{ status: number; sent: boolean }>('/api/v1/mail/', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function loginWithCode(email: string, code: string) {
  const response = await request<{ status: number; tokens?: { access: string; refresh: string } }>('/api/v1/auth/', {
    method: 'POST',
    body: JSON.stringify({ email, code }),
  });
  if (!response.tokens) {
    throw new Error('Неверный или просроченный код');
  }
  saveTokens(response.tokens);
  return response.tokens;
}

export function fetchMe() {
  return request<ApiUser>('/api/v1/me/');
}

export function fetchTournaments() {
  return request<TournamentSummary[]>('/api/v2/tournaments/');
}

export function fetchTournamentTable(tournamentId: number) {
  return request<TournamentTable>(`/api/v3/tournaments/${tournamentId}/table/`);
}

export function fetchTournamentMatches(tournamentId: number) {
  return request<TournamentMatches>(`/api/v3/tournaments/${tournamentId}/matches/`);
}

export function fetchMyForecasts(tournamentId: number) {
  return request<ForecastShort[]>(`/api/v2/forecasts/?tournament=${tournamentId}`);
}

export function fetchMatchesWithForecasts(tournamentId: number) {
  return request<MatchForecastPair[]>(`/api/v2/matches/?tournament=${tournamentId}`);
}

export function createForecast(tournamentId: number, matchId: number, score_home: number, score_away: number) {
  return request<ForecastShort>('/api/v2/forecasts/', {
    method: 'POST',
    body: JSON.stringify({
      tournament: tournamentId,
      match: matchId,
      forecast_type: 'full time',
      score_home,
      score_away,
    }),
  });
}

export function updateForecast(forecastId: number, score_home: number, score_away: number) {
  return request<ForecastShort>(`/api/v2/forecast/${forecastId}/`, {
    method: 'PATCH',
    body: JSON.stringify({ score_home, score_away }),
  });
}

export function fetchMatchDetails(matchId: number) {
  return request<MatchDetails>(`/api/v2/match/${matchId}/`);
}

export function participantToPlayer(participant: TournamentParticipant, tournamentTitle?: string): Player {
  const score = participant.score;
  const total = score.forecasts_count || 0;
  const correct = score.exact_result + score.match_result + score.goals_difference;
  const name = participant.user.nickname || participant.user.username || participant.user.email || `Участник ${participant.id}`;

  return {
    id: participant.id,
    userId: participant.user.id,
    username: participant.user.username,
    email: participant.user.email,
    avatar: normalizeMediaUrl(participant.user.avatar),
    name,
    points: score.points,
    correctPredictions: correct,
    totalPredictions: total,
    accuracy: total > 0 ? (correct / total) * 100 : 0,
    exactScores: score.exact_result,
    correctOutcomes: score.match_result,
    correctDiff: score.goals_difference,
    tournamentTitle,
  };
}

export function apiMatchToUi(match: ApiMatch, tournamentTitle: string, forecast?: ForecastShort | null): UiMatch {
  const fullTimeResult = match.match_result?.find((result) => result.result_type === 'full time') ?? match.match_result?.[0];
  const status = match.status === 'finished'
    ? 'completed'
    : match.status === 'started'
      ? 'live'
      : match.status === 'cancelled'
        ? 'cancelled'
        : 'upcoming';

  return {
    id: match.id,
    homeTeam: match.team_home?.short_title || match.team_home?.title || 'Хозяева',
    awayTeam: match.team_away?.short_title || match.team_away?.title || 'Гости',
    homeBadge: match.team_home?.badge,
    awayBadge: match.team_away?.badge,
    homeScore: fullTimeResult?.score_home ?? null,
    awayScore: fullTimeResult?.score_away ?? null,
    date: match.start_date,
    status,
    tournament: tournamentTitle,
    stage: match.stage,
    forecast: forecast ?? null,
  };
}
