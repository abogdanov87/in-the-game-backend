import { dataUrlToBlob } from './userProfile';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export interface ApiUser {
  id?: number;
  username: string;
  email?: string;
  nickname?: string;
  avatar?: string | null;
  avatar_type?: 'color' | 'emoji' | 'photo' | string;
  avatar_color?: string | null;
  avatar_emoji?: string | null;
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
  active?: boolean;
  score: ParticipantScore;
  winner?: TournamentFavorite[];
}

export interface TournamentRule {
  id: number;
  rule_type: string;
  tournament: number;
  points: number;
  active: boolean;
}

export interface TournamentTable {
  id: number;
  title: string;
  logo?: string | null;
  active: boolean;
  tournament_participant: TournamentParticipant[];
  tournament_rules?: TournamentRule[];
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
  avatarType?: 'color' | 'emoji' | 'photo' | string;
  avatarColor?: string | null;
  avatarEmoji?: string | null;
  name: string;
  points: number;
  correctPredictions: number;
  totalPredictions: number;
  accuracy: number;
  exactScores: number;
  correctOutcomes: number;
  correctDiff: number;
  tournamentTitle?: string;
  favorites?: TournamentFavorite[];
}

export interface TournamentFavorite {
  winner_type: 'first' | 'second' | 'third';
  team: TeamShort;
}

export interface MatchForecastHistory {
  match_id: number;
  start_date: string;
  points: number;
  exact_result: number;
  goals_difference: number;
  match_result: number;
}

export interface ParticipantDetails {
  id: number;
  user: ApiUser;
  tournament?: TournamentSummary;
  winner: TournamentFavorite[];
  score: ParticipantScore;
  match_forecasts?: MatchForecastHistory[];
}

export interface TournamentStats {
  tournament: string;
  points: number;
  totalPredictions: number;
  exactScores: number;
  correctOutcomes: number;
  correctDiff: number;
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

export interface UpdateMePayload {
  nickname?: string;
  avatar_type?: 'color' | 'emoji' | 'photo';
  avatar_color?: string;
  avatar_emoji?: string;
  clear_avatar?: boolean;
  avatarDataUrl?: string;
}

async function parseApiResponse<T>(response: Response): Promise<T> {
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

export async function updateMe(payload: UpdateMePayload): Promise<ApiUser> {
  const token = getAccessToken();
  const headers = new Headers();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (payload.avatarDataUrl) {
    const form = new FormData();
    if (payload.nickname !== undefined) form.append('nickname', payload.nickname);
    if (payload.avatar_type) form.append('avatar_type', payload.avatar_type);
    if (payload.avatar_color) form.append('avatar_color', payload.avatar_color);
    if (payload.avatar_emoji !== undefined) form.append('avatar_emoji', payload.avatar_emoji);
    if (payload.clear_avatar) form.append('clear_avatar', 'true');
    form.append('avatar', dataUrlToBlob(payload.avatarDataUrl), 'avatar.jpg');
    const response = await fetch('/api/v1/me/', { method: 'PATCH', headers, body: form });
    return parseApiResponse<ApiUser>(response);
  }

  return request<ApiUser>('/api/v1/me/', {
    method: 'PATCH',
    body: JSON.stringify({
      nickname: payload.nickname,
      avatar_type: payload.avatar_type,
      avatar_color: payload.avatar_color,
      avatar_emoji: payload.avatar_emoji,
      clear_avatar: payload.clear_avatar,
    }),
  });
}

export function apiUserToAvatarSource(user: ApiUser): import('./userProfile').AvatarUserSource {
  return {
    nickname: user.nickname,
    username: user.username,
    email: user.email,
    avatar: normalizeMediaUrl(user.avatar),
    avatar_type: user.avatar_type,
    avatar_color: user.avatar_color,
    avatar_emoji: user.avatar_emoji,
  };
}

export function apiUserToPlayerFields(user: ApiUser) {
  return {
    name: user.nickname || user.username || user.email || 'Игрок',
    avatar: normalizeMediaUrl(user.avatar),
    avatarType: user.avatar_type,
    avatarColor: user.avatar_color,
    avatarEmoji: user.avatar_emoji,
  };
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

export function fetchParticipant(participantId: number) {
  return request<ParticipantDetails>(`/api/v2/participant/${participantId}/`);
}

const SCORING_RULE_ORDER = [
  'exact result',
  'match result',
  'goals difference',
  'winner1',
  'winner2',
  'winner3',
  'winner',
] as const;

const SCORING_RULE_META: Record<string, { label: string; color: string }> = {
  'exact result': { label: 'Точный счёт', color: '#c4f135' },
  'match result': { label: 'Правильный исход', color: '#38bdf8' },
  'goals difference': { label: 'Правильная разница', color: '#f59e0b' },
  winner1: { label: '1-й фаворит турнира', color: '#FFD700' },
  winner2: { label: '2-й фаворит турнира', color: '#C0C0C0' },
  winner3: { label: '3-й фаворит турнира', color: '#CD7F32' },
  winner: { label: 'Победитель турнира', color: '#FFD700' },
};

export function formatRulePoints(points: number) {
  return Number.isInteger(points) ? String(points) : points.toFixed(1);
}

export function outcomeRulePoints(rules: TournamentRule[] | undefined) {
  if (!rules?.length) return null;
  const rulesByType = new Map(rules.filter((rule) => rule.active).map((rule) => [rule.rule_type, rule.points]));
  return {
    exact: rulesByType.get('exact result') ?? 0,
    outcome: rulesByType.get('match result') ?? 0,
    diff: rulesByType.get('goals difference') ?? 0,
  };
}

export function scoreToTournamentStats(title: string, score: ParticipantScore): TournamentStats {
  return {
    tournament: title,
    points: score.points,
    totalPredictions: score.forecasts_count,
    exactScores: score.exact_result,
    correctOutcomes: score.match_result,
    correctDiff: score.goals_difference,
  };
}

export function aggregateTournamentStats(entries: TournamentStats[]): TournamentStats {
  return entries.reduce(
    (acc, entry) => ({
      tournament: 'Все турниры',
      points: acc.points + entry.points,
      totalPredictions: acc.totalPredictions + entry.totalPredictions,
      exactScores: acc.exactScores + entry.exactScores,
      correctOutcomes: acc.correctOutcomes + entry.correctOutcomes,
      correctDiff: acc.correctDiff + entry.correctDiff,
    }),
    { tournament: 'Все турниры', points: 0, totalPredictions: 0, exactScores: 0, correctOutcomes: 0, correctDiff: 0 },
  );
}

export interface MatchBlockStats {
  label: string;
  points: number;
  accuracy: number;
}

export function sortMatchForecasts(forecasts: MatchForecastHistory[]): MatchForecastHistory[] {
  return [...forecasts].sort((a, b) => {
    const byDate = new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
    if (byDate !== 0) return byDate;
    return a.match_id - b.match_id;
  });
}

function isForecastCorrect(item: MatchForecastHistory): boolean {
  return item.exact_result + item.goals_difference + item.match_result > 0;
}

export function aggregateMatchBlocks(forecasts: MatchForecastHistory[], blockSize = 10): MatchBlockStats[] {
  const sorted = sortMatchForecasts(forecasts);
  if (!sorted.length) return [];

  const blocks: MatchBlockStats[] = [];
  for (let i = 0; i < sorted.length; i += blockSize) {
    const chunk = sorted.slice(i, i + blockSize);
    const points = chunk.reduce((sum, item) => sum + item.points, 0);
    const correct = chunk.filter(isForecastCorrect).length;
    const from = i + 1;
    const to = i + chunk.length;
    blocks.push({
      label: `${from}–${to}`,
      points: Math.round(points * 10) / 10,
      accuracy: chunk.length ? Math.round((correct / chunk.length) * 1000) / 10 : 0,
    });
  }
  return blocks;
}

export function scoringLegendFromRules(rules: TournamentRule[] | undefined) {
  if (!rules?.length) return [];

  const rulesByType = new Map(rules.filter((rule) => rule.active).map((rule) => [rule.rule_type, rule.points]));

  return SCORING_RULE_ORDER
    .filter((ruleType) => rulesByType.has(ruleType))
    .map((ruleType) => ({
      label: SCORING_RULE_META[ruleType]?.label ?? ruleType,
      points: rulesByType.get(ruleType) ?? 0,
      color: SCORING_RULE_META[ruleType]?.color ?? '#5a6a8a',
    }));
}

export type ForecastOutcome = 'exact' | 'outcome' | 'diff' | 'wrong';

const FORECAST_OUTCOME_CHIP_STYLES: Record<ForecastOutcome, { color: string; bgcolor: string; border: string }> = {
  exact: { color: '#c4f135', bgcolor: 'rgba(196,241,53,0.12)', border: 'rgba(196,241,53,0.3)' },
  outcome: { color: '#38bdf8', bgcolor: 'rgba(56,189,248,0.12)', border: 'rgba(56,189,248,0.3)' },
  diff: { color: '#f59e0b', bgcolor: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)' },
  wrong: { color: '#5a6a8a', bgcolor: 'rgba(90,106,138,0.12)', border: 'rgba(90,106,138,0.3)' },
};

export function getForecastOutcome(score?: ParticipantScore): ForecastOutcome {
  if (!score) return 'wrong';
  if (score.exact_result > 0) return 'exact';
  if (score.goals_difference > 0) return 'diff';
  if (score.match_result > 0) return 'outcome';
  return 'wrong';
}

export function getMatchForecastPoints(score?: ParticipantScore) {
  if (!score) return 0;
  return score.points - (score.tournament_bonuses ?? 0);
}

export function getForecastPointsChipProps(outcome: ForecastOutcome, points: number) {
  const style = FORECAST_OUTCOME_CHIP_STYLES[outcome];
  const label = points > 0 ? `+${formatRulePoints(points)}` : '0';
  return {
    label: outcome === 'exact' && points > 0 ? `⭐ ${label}` : label,
    sx: {
      bgcolor: style.bgcolor,
      color: style.color,
      border: `1px solid ${style.border}`,
      fontFamily: '"JetBrains Mono", monospace',
      fontWeight: 600,
      height: 22,
    },
  };
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
    avatarType: participant.user.avatar_type,
    avatarColor: participant.user.avatar_color,
    avatarEmoji: participant.user.avatar_emoji,
    name,
    points: score.points,
    correctPredictions: correct,
    totalPredictions: total,
    accuracy: total > 0 ? (correct / total) * 100 : 0,
    exactScores: score.exact_result,
    correctOutcomes: score.match_result,
    correctDiff: score.goals_difference,
    tournamentTitle,
    favorites: participant.winner ?? [],
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
