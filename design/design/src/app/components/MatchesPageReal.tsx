import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  ArrowDownward as ArrowDownIcon,
  ArrowUpward as ArrowUpIcon,
  CheckCircle as CheckIcon,
  EmojiEvents as TrophyIcon,
  Remove as RemoveIcon,
  Schedule as ScheduleIcon,
  SportsSoccer as SoccerIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import {
  apiMatchToUi,
  createForecast,
  fetchMatchDetails,
  fetchMatchesWithForecasts,
  fetchTournamentMatches,
  fetchTournaments,
  getForecastOutcome,
  getForecastPointsChipProps,
  getMatchForecastPoints,
  normalizeMediaUrl,
  updateForecast,
  type ForecastOutcome,
  type ForecastShort,
  type TournamentSummary,
  type UiMatch,
} from '../utils/api';
import { resolveAvatarProfile, type AvatarUserSource } from '../utils/userProfile';
import { UserAvatarDisplay } from './PlayerStatsView';

interface LocalPrediction {
  id?: number;
  homeScore: number | null;
  awayScore: number | null;
}

interface PredictionRow {
  id: number;
  playerName: string;
  avatarSource: AvatarUserSource;
  homeScore: number;
  awayScore: number;
  points: number;
  outcome: ForecastOutcome;
}

function TabPanel({ children, value, index }: { children: ReactNode; value: number; index: number }) {
  return <div role="tabpanel" hidden={value !== index}>{value === index && <Box sx={{ pt: 2 }}>{children}</Box>}</div>;
}

function formatMatchDateParts(dateString: string) {
  const date = new Date(dateString);
  return {
    date: new Intl.DateTimeFormat('ru-RU', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
    }).format(date),
    time: new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date),
  };
}

function getMatchMetaBlockColors(isCompleted: boolean, accent: 'lime' | 'blue') {
  if (isCompleted) {
    return {
      bgcolor: 'rgba(90,106,138,0.1)',
      border: '1px solid rgba(90,106,138,0.28)',
      primary: 'text.secondary',
    };
  }
  if (accent === 'lime') {
    return {
      bgcolor: 'rgba(196,241,53,0.1)',
      border: '1px solid rgba(196,241,53,0.35)',
      primary: '#c4f135',
    };
  }
  return {
    bgcolor: 'rgba(56,189,248,0.1)',
    border: '1px solid rgba(56,189,248,0.35)',
    primary: '#38bdf8',
  };
}

const matchMetaBlockSx = {
  flexShrink: 0,
  px: 1,
  py: 0.65,
  borderRadius: 1,
};

function MatchStartTime({ dateString, isCompleted }: { dateString: string; isCompleted: boolean }) {
  const { date, time } = formatMatchDateParts(dateString);
  const colors = getMatchMetaBlockColors(isCompleted, 'blue');

  return (
    <Box
      sx={{
        ...matchMetaBlockSx,
        textAlign: 'right',
        bgcolor: colors.bgcolor,
        border: colors.border,
      }}
    >
      <Typography
        sx={{
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 600,
          fontSize: '0.72rem',
          color: colors.primary,
          lineHeight: 1.2,
          letterSpacing: '0.03em',
        }}
      >
        {time}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontSize: '0.72rem',
          display: 'block',
          mt: 0.25,
          textTransform: 'capitalize',
          lineHeight: 1.2,
          maxWidth: 132,
        }}
      >
        {date}
      </Typography>
    </Box>
  );
}

function MatchTournamentInfo({ match, isCompleted }: { match: UiMatch; isCompleted: boolean }) {
  const colors = getMatchMetaBlockColors(isCompleted, 'lime');
  const primaryLabel = isCompleted ? 'Завершён' : match.tournament;

  return (
    <Box
      sx={{
        ...matchMetaBlockSx,
        textAlign: 'left',
        bgcolor: colors.bgcolor,
        border: colors.border,
        minWidth: 0,
        maxWidth: '58%',
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 700,
          fontSize: '0.72rem',
          color: colors.primary,
          lineHeight: 1.2,
          letterSpacing: '0.03em',
        }}
        noWrap
      >
        {primaryLabel}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontSize: '0.72rem',
          display: 'block',
          mt: 0.25,
          lineHeight: 1.2,
        }}
        noWrap
      >
        {match.stage}
      </Typography>
    </Box>
  );
}

const FORECAST_EDIT_WINDOW_MS = 60 * 60 * 1000;

function getMsUntilMatchStart(dateString: string, now: number) {
  return new Date(dateString).getTime() - now;
}

function canMakeOrEditForecast(match: UiMatch, now: number) {
  if (match.status === 'completed' || match.status === 'live' || match.status === 'cancelled') {
    return false;
  }
  return getMsUntilMatchStart(match.date, now) >= FORECAST_EDIT_WINDOW_MS;
}

function shouldShowParticipantForecasts(match: UiMatch, now: number) {
  if (match.status === 'completed' || match.status === 'live') {
    return true;
  }
  if (match.status === 'cancelled') {
    return false;
  }
  return getMsUntilMatchStart(match.date, now) < FORECAST_EDIT_WINDOW_MS;
}

function TeamAvatar({ name, badge, isCompleted = false }: { name: string; badge?: string | null; isCompleted?: boolean }) {
  const hasBadge = Boolean(badge);
  const showEffects = hasBadge && !isCompleted;

  return (
    <Avatar
      src={badge || undefined}
      imgProps={{
        style: {
          objectFit: 'contain',
          padding: hasBadge ? 3 : 0,
        },
      }}
      sx={{
        width: 48,
        height: 48,
        flexShrink: 0,
        bgcolor: '#1a2240',
        fontFamily: '"Barlow Condensed", sans-serif',
        fontWeight: 800,
        fontSize: '0.85rem',
        border: showEffects ? '1px solid rgba(196,241,53,0.35)' : '1px solid rgba(255,255,255,0.12)',
        boxShadow: showEffects ? '0 0 8px rgba(196,241,53,0.14)' : 'none',
        ...(showEffects && {
          animation: 'teamBadgeGlow 2.8s ease-in-out infinite',
          '@keyframes teamBadgeGlow': {
            '0%, 100%': {
              boxShadow: '0 0 6px rgba(196,241,53,0.1)',
            },
            '50%': {
              boxShadow: '0 0 12px rgba(196,241,53,0.24)',
            },
          },
        }),
      }}
    >
      {name.slice(0, 3).toUpperCase()}
    </Avatar>
  );
}

function isValidForecast(forecast: ForecastShort | null | undefined): forecast is ForecastShort & { id: number; score_home: number; score_away: number } {
  return Boolean(
    forecast
    && forecast.id
    && forecast.score_home !== null
    && forecast.score_away !== null,
  );
}

function formatPredictionScore(prediction: LocalPrediction) {
  const home = prediction.homeScore ?? '';
  const away = prediction.awayScore ?? '';
  return home === '' && away === '' ? '' : `${home}:${away}`;
}

function ScoreStepper({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.65rem', textAlign: 'center' }} noWrap>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton size="small" onClick={() => onChange(Math.max(0, value - 1))} sx={{ width: 36, height: 36, bgcolor: '#141928', border: '1px solid rgba(26,34,64,0.8)', color: 'text.secondary' }}>
          <RemoveIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
        <Box sx={{ width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(196,241,53,0.06)', border: '1px solid rgba(196,241,53,0.2)', borderRadius: 1 }}>
          <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, fontSize: '1.75rem', color: 'primary.main', lineHeight: 1 }}>
            {value}
          </Typography>
        </Box>
        <IconButton size="small" onClick={() => onChange(Math.min(99, value + 1))} sx={{ width: 36, height: 36, bgcolor: 'rgba(196,241,53,0.1)', border: '1px solid rgba(196,241,53,0.2)', color: 'primary.main' }}>
          <AddIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
      </Box>
    </Box>
  );
}

function MatchCard({
  match,
  prediction,
  now,
  onPredict,
  onShowPredictions,
}: {
  match: UiMatch;
  prediction?: LocalPrediction;
  now: number;
  onPredict: () => void;
  onShowPredictions: () => void;
}) {
  const isCompleted = match.status === 'completed';
  const showParticipantForecasts = shouldShowParticipantForecasts(match, now);
  const showForecastEditor = canMakeOrEditForecast(match, now);
  return (
    <Box sx={{ bgcolor: '#0d1120', border: prediction ? '1px solid rgba(196,241,53,0.2)' : '1px solid rgba(26,34,64,0.8)', borderRadius: 1.5, p: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2, gap: 1 }}>
        <MatchTournamentInfo match={match} isCompleted={isCompleted} />
        <MatchStartTime dateString={match.date} isCompleted={isCompleted} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
          <TeamAvatar name={match.homeTeam} badge={match.homeBadge} isCompleted={isCompleted} />
          <Typography variant="body2" sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '0.95rem', textAlign: 'center' }}>{match.homeTeam}</Typography>
        </Box>

        <Box sx={{ px: 2, py: 1, bgcolor: prediction && !isCompleted ? 'rgba(196,241,53,0.07)' : '#141928', borderRadius: 1, border: prediction && !isCompleted ? '1px solid rgba(196,241,53,0.25)' : '1px solid rgba(26,34,64,0.8)', textAlign: 'center', minWidth: 80 }}>
          <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, fontSize: '1.75rem', color: prediction && !isCompleted ? 'primary.main' : 'text.primary', lineHeight: 1 }}>
            {isCompleted ? `${match.homeScore ?? '-'}:${match.awayScore ?? '-'}` : prediction ? formatPredictionScore(prediction) : 'VS'}
          </Typography>
          <Typography variant="caption" sx={{ color: prediction && !isCompleted ? 'primary.main' : 'text.secondary', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {isCompleted ? 'итог' : prediction ? 'прогноз' : 'матч'}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
          <TeamAvatar name={match.awayTeam} badge={match.awayBadge} isCompleted={isCompleted} />
          <Typography variant="body2" sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '0.95rem', textAlign: 'center' }}>{match.awayTeam}</Typography>
        </Box>
      </Box>

      {showParticipantForecasts ? (
        <Button fullWidth variant="outlined" color="secondary" startIcon={<ViewIcon sx={{ fontSize: '1rem' }} />} onClick={onShowPredictions} sx={{ py: 1.1, fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.04em', borderColor: 'rgba(26,34,64,0.8)', color: 'text.secondary' }}>
          Прогнозы участников
        </Button>
      ) : showForecastEditor ? (
        <Button fullWidth variant={prediction ? 'outlined' : 'contained'} color="primary" onClick={onPredict} sx={{ py: 1.25, fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.04em' }}>
          {prediction ? 'Изменить прогноз' : 'Сделать прогноз'}
        </Button>
      ) : null}
    </Box>
  );
}

export function MatchesPage() {
  const [tournaments, setTournaments] = useState<TournamentSummary[]>([]);
  const [selectedTournamentId, setSelectedTournamentId] = useState<number | ''>('');
  const [matches, setMatches] = useState<UiMatch[]>([]);
  const [myPredictions, setMyPredictions] = useState<Record<number, LocalPrediction>>({});
  const [tabValue, setTabValue] = useState(0);
  const [sortAscending, setSortAscending] = useState(true);
  const [predictionDialog, setPredictionDialog] = useState<number | null>(null);
  const [predictionsDialog, setPredictionsDialog] = useState<number | null>(null);
  const [tempPrediction, setTempPrediction] = useState({ homeScore: 0, awayScore: 0 });
  const [matchPredictions, setMatchPredictions] = useState<PredictionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [predictionsLoading, setPredictionsLoading] = useState(false);
  const [error, setError] = useState('');
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchTournaments()
      .then((data) => {
        if (cancelled) return;
        setTournaments(data);
        setSelectedTournamentId((data.find((tournament) => tournament.active) ?? data[0])?.id ?? '');
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Не удалось загрузить турниры');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedTournamentId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function loadMatches() {
      setLoading(true);
      setError('');
      try {
        const tournamentId = Number(selectedTournamentId);
        const [tournamentMatches, forecastPairs] = await Promise.all([
          fetchTournamentMatches(tournamentId),
          fetchMatchesWithForecasts(tournamentId).catch(() => []),
        ]);
        if (cancelled) return;

        const forecastsByMatch = new Map<number, ForecastShort>();
        const localPredictions: Record<number, LocalPrediction> = {};
        forecastPairs.forEach(({ match, forecast }) => {
          if (!isValidForecast(forecast)) return;
          forecastsByMatch.set(match.id, forecast);
          localPredictions[match.id] = {
            id: forecast.id,
            homeScore: forecast.score_home,
            awayScore: forecast.score_away,
          };
        });

        setMyPredictions(localPredictions);
        setMatches(tournamentMatches.matches.map((match) => apiMatchToUi(match, tournamentMatches.title, forecastsByMatch.get(match.id))));
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Не удалось загрузить матчи');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadMatches();
    return () => {
      cancelled = true;
    };
  }, [selectedTournamentId]);

  useEffect(() => {
    setSortAscending(tabValue === 0);
  }, [tabValue]);

  const selectedTournament = useMemo(
    () => tournaments.find((tournament) => tournament.id === selectedTournamentId),
    [selectedTournamentId, tournaments],
  );
  const sortFn = (a: UiMatch, b: UiMatch) => sortAscending
    ? new Date(a.date).getTime() - new Date(b.date).getTime()
    : new Date(b.date).getTime() - new Date(a.date).getTime();
  const completedMatches = [...matches].filter((match) => match.status === 'completed').sort(sortFn);
  const upcomingMatches = [...matches].filter((match) => match.status !== 'completed').sort(sortFn);
  const currentDialogMatch = predictionDialog !== null ? matches.find((match) => match.id === predictionDialog) : null;
  const currentPredictionsMatch = predictionsDialog !== null ? matches.find((match) => match.id === predictionsDialog) : null;

  const openPredictionDialog = (matchId: number) => {
    const match = matches.find((item) => item.id === matchId);
    if (!match || !canMakeOrEditForecast(match, now)) return;
    setTempPrediction(myPredictions[matchId] || { homeScore: 0, awayScore: 0 });
    setPredictionDialog(matchId);
  };

  const savePrediction = async () => {
    if (predictionDialog === null || !selectedTournamentId) return;
    const match = matches.find((item) => item.id === predictionDialog);
    if (!match || !canMakeOrEditForecast(match, now)) return;
    setSaving(true);
    setError('');
    try {
      const current = myPredictions[predictionDialog];
      const saved = current?.id
        ? await updateForecast(current.id, tempPrediction.homeScore, tempPrediction.awayScore)
        : await createForecast(Number(selectedTournamentId), predictionDialog, tempPrediction.homeScore, tempPrediction.awayScore);
      if (!isValidForecast(saved)) {
        throw new Error('Backend вернул пустой прогноз');
      }
      setMyPredictions({
        ...myPredictions,
        [predictionDialog]: { id: saved.id, homeScore: saved.score_home, awayScore: saved.score_away },
      });
      setPredictionDialog(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось сохранить прогноз');
    } finally {
      setSaving(false);
    }
  };

  const openPredictionsDialog = async (matchId: number) => {
    setPredictionsDialog(matchId);
    setPredictionsLoading(true);
    setMatchPredictions([]);
    try {
      const details = await fetchMatchDetails(matchId);
      setMatchPredictions(details.forecasts.flatMap((forecast) => {
        if (!isValidForecast(forecast)) return [];
        const outcome = getForecastOutcome(forecast.score);
        const points = getMatchForecastPoints(forecast.score);
        return [{
          id: forecast.id,
          playerName: forecast.user.nickname || forecast.user.username || forecast.user.email || `Участник ${forecast.id}`,
          avatarSource: {
            nickname: forecast.user.nickname,
            username: forecast.user.username,
            email: forecast.user.email,
            avatar: normalizeMediaUrl(forecast.user.avatar),
            avatar_type: forecast.user.avatar_type,
            avatar_color: forecast.user.avatar_color,
            avatar_emoji: forecast.user.avatar_emoji,
          },
          homeScore: forecast.score_home,
          awayScore: forecast.score_away,
          points,
          outcome,
        }];
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось загрузить прогнозы участников');
    } finally {
      setPredictionsLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.65rem', display: 'block', mb: 0.5 }}>
            Турнир
          </Typography>
          <Select size="small" value={selectedTournamentId} onChange={(event) => setSelectedTournamentId(Number(event.target.value))} sx={{ minWidth: 220, fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, color: 'primary.main' }}>
            {tournaments.map((tournament) => <MenuItem key={tournament.id} value={tournament.id}>{tournament.title}</MenuItem>)}
          </Select>
        </Box>
        <Chip label={selectedTournament?.participants ? `${selectedTournament.participants} участников` : 'Матчи'} size="small" />
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={28} />
        </Box>
      ) : (
        <>
          <Box sx={{ borderBottom: '1px solid rgba(26,34,64,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Tabs value={tabValue} onChange={(_, value) => setTabValue(value)}>
              <Tab icon={<ScheduleIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={`Предстоящие (${upcomingMatches.length})`} sx={{ minHeight: 48, gap: 0.75 }} />
              <Tab icon={<CheckIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={`Завершённые (${completedMatches.length})`} sx={{ minHeight: 48, gap: 0.75 }} />
            </Tabs>
            <Button size="small" onClick={() => setSortAscending((value) => !value)} startIcon={sortAscending ? <ArrowUpIcon sx={{ fontSize: '0.9rem' }} /> : <ArrowDownIcon sx={{ fontSize: '0.9rem' }} />} sx={{ color: 'text.secondary', border: '1px solid rgba(26,34,64,0.8)', borderRadius: 1, fontSize: '0.72rem' }}>
              {sortAscending ? 'Старые' : 'Новые'}
            </Button>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={2}>
              {upcomingMatches.map((match) => (
                <Grid size={{ xs: 12, md: 6 }} key={match.id}>
                  <MatchCard match={match} prediction={myPredictions[match.id]} now={now} onPredict={() => openPredictionDialog(match.id)} onShowPredictions={() => openPredictionsDialog(match.id)} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
              {completedMatches.map((match) => (
                <Grid size={{ xs: 12, md: 6 }} key={match.id}>
                  <MatchCard match={match} prediction={myPredictions[match.id]} now={now} onPredict={() => openPredictionDialog(match.id)} onShowPredictions={() => openPredictionsDialog(match.id)} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </>
      )}

      <Dialog open={predictionDialog !== null} onClose={() => setPredictionDialog(null)} maxWidth="xs" fullWidth PaperProps={{ sx: { mx: 2 } }}>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SoccerIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
            Ваш прогноз
          </Box>
          {currentDialogMatch && (
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', display: 'block', mt: 0.5, fontFamily: '"DM Sans", sans-serif', fontWeight: 400 }}>
              {currentDialogMatch.homeTeam} - {currentDialogMatch.awayTeam}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent sx={{ pt: '20px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2.5, py: 1 }}>
            <ScoreStepper label={currentDialogMatch?.homeTeam ?? 'Хозяева'} value={tempPrediction.homeScore} onChange={(value) => setTempPrediction({ ...tempPrediction, homeScore: value })} />
            <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, fontSize: '1.5rem', color: 'text.secondary', mt: 2 }}>:</Typography>
            <ScoreStepper label={currentDialogMatch?.awayTeam ?? 'Гости'} value={tempPrediction.awayScore} onChange={(value) => setTempPrediction({ ...tempPrediction, awayScore: value })} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1.5, gap: 1 }}>
          <Button onClick={() => setPredictionDialog(null)} variant="outlined" sx={{ color: 'text.secondary', borderColor: 'rgba(26,34,64,0.8)' }}>Отмена</Button>
          <Button onClick={savePrediction} variant="contained" disabled={saving} sx={{ flex: 1, fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.04em' }}>
            {saving ? 'Сохранение...' : 'Сохранить прогноз'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={predictionsDialog !== null} onClose={() => setPredictionsDialog(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { mx: 2 } }}>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrophyIcon sx={{ fontSize: '1rem', color: '#FFD700' }} />
            Прогнозы участников
          </Box>
          {currentPredictionsMatch && (
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', display: 'block', mt: 0.5, fontFamily: '"DM Sans", sans-serif', fontWeight: 400 }}>
              {currentPredictionsMatch.homeTeam} {currentPredictionsMatch.homeScore}:{currentPredictionsMatch.awayScore} {currentPredictionsMatch.awayTeam}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {predictionsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Участник</TableCell>
                    <TableCell align="center">Прогноз</TableCell>
                    <TableCell align="right">Очки</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {matchPredictions.map((prediction) => (
                    <TableRow key={prediction.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                          <UserAvatarDisplay profile={resolveAvatarProfile(prediction.avatarSource)} size={24} />
                          <Typography variant="body2" sx={{ fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prediction.playerName}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600 }}>{prediction.homeScore}:{prediction.awayScore}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        {(() => {
                          const chip = getForecastPointsChipProps(prediction.outcome, prediction.points);
                          return <Chip label={chip.label} size="small" sx={chip.sx} />;
                        })()}
                      </TableCell>
                    </TableRow>
                  ))}
                  {!matchPredictions.length && (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ color: 'text.secondary', py: 3 }}>Прогнозы пока недоступны.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setPredictionsDialog(null)} variant="outlined" sx={{ borderColor: 'rgba(26,34,64,0.8)', color: 'text.secondary' }}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
