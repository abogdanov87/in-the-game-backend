import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingIcon,
  Close as CloseIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import {
  fetchTournamentTable,
  fetchTournaments,
  participantToPlayer,
  scoringLegendFromRules,
  formatRulePoints,
  type Player,
  type TournamentRule,
  type TournamentSummary,
} from '../utils/api';
import { fetchMe } from '../utils/api';
import { loadUserProfile, resolveAvatarProfile, type UserProfile } from '../utils/userProfile';
import { PlayerStatsView, UserAvatarDisplay } from './PlayerStatsView';

const MEDAL_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];
const MEDAL_LABELS = ['ЗОЛОТО', 'СЕРЕБРО', 'БРОНЗА'];

function ParticipantAvatar({
  player,
  size,
  profile,
}: {
  player: Player;
  size: number;
  profile?: UserProfile;
}) {
  const resolved = resolveAvatarProfile(
    { name: player.name, avatar: player.avatar },
    profile,
  );
  return <UserAvatarDisplay profile={resolved} size={size} />;
}

// Stacked accuracy bar: lime=exact, blue=outcome, amber=diff, rest=wrong
function AccuracyBar({ player }: { player: Player }) {
  const t = player.totalPredictions;
  const exactPct   = (player.exactScores / t) * 100;
  const outPct     = (player.correctOutcomes / t) * 100;
  const diffPct    = (player.correctDiff / t) * 100;
  return (
    <Box>
      <Box sx={{ display: 'flex', height: 5, borderRadius: 1, overflow: 'hidden', bgcolor: 'rgba(26,34,64,0.8)', mb: 0.75 }}>
        <Box sx={{ width: `${exactPct}%`, bgcolor: '#c4f135', transition: 'width 0.3s' }} />
        <Box sx={{ width: `${outPct}%`, bgcolor: '#38bdf8', transition: 'width 0.3s' }} />
        <Box sx={{ width: `${diffPct}%`, bgcolor: '#f59e0b', transition: 'width 0.3s' }} />
      </Box>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        {[
          { count: player.exactScores,     color: '#c4f135', label: 'счёт' },
          { count: player.correctOutcomes, color: '#38bdf8', label: 'исход' },
          { count: player.correctDiff,     color: '#f59e0b', label: 'разница' },
        ].map((s) => (
          <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: 0.5, bgcolor: s.color, flexShrink: 0 }} />
            <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, fontSize: '0.68rem', color: s.color }}>
              {s.count}
            </Typography>
          </Box>
        ))}
        <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.68rem', color: 'text.secondary', ml: 'auto' }}>
          {player.accuracy.toFixed(0)}%
        </Typography>
      </Box>
    </Box>
  );
}

// Full player stats dialog
function PlayerStatsDialog({ player, rank, open, onClose }: { player: Player | null; rank: number; open: boolean; onClose: () => void }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  if (!player) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{ sx: { mx: isMobile ? 0 : 2, height: isMobile ? '100%' : 'auto', maxHeight: isMobile ? '100%' : '90vh' } }}
    >
      <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none', borderBottom: '1px solid rgba(26,34,64,0.8)' }}>
        <Toolbar sx={{ minHeight: '52px !important', px: 2 }}>
          <PersonIcon sx={{ fontSize: '1rem', color: 'text.secondary', mr: 1 }} />
          <Typography sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.04em', flex: 1 }}>
            Статистика · {player.name}
          </Typography>
          <IconButton size="small" onClick={onClose} sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
            <CloseIcon sx={{ fontSize: '1.1rem' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ p: { xs: 2, md: 3 }, overflowY: 'auto' }}>
        {/* Read-only: no profile/onProfileChange props */}
        <PlayerStatsView player={player} rank={rank} />
      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(26,34,64,0.8)' }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderColor: 'rgba(26,34,64,0.8)', color: 'text.secondary' }}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function LeaderboardPage() {
  const [tournaments, setTournaments] = useState<TournamentSummary[]>([]);
  const [selectedTournamentId, setSelectedTournamentId] = useState<number | ''>('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [scoringRules, setScoringRules] = useState<TournamentRule[]>([]);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [localProfile, setLocalProfile] = useState<UserProfile>(loadUserProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profilePlayer, setProfilePlayer] = useState<Player | null>(null);
  const [profileRank, setProfileRank] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      fetchTournaments(),
      fetchMe().catch(() => null),
    ])
      .then(([data, me]) => {
        if (cancelled) return;
        setTournaments(data);
        setCurrentUsername(me?.username ?? null);
        setLocalProfile(loadUserProfile());
        const active = data.find((tournament) => tournament.active) ?? data[0];
        setSelectedTournamentId(active?.id ?? '');
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Не удалось загрузить турниры');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handler = () => setLocalProfile(loadUserProfile());
    window.addEventListener('userProfileUpdated', handler);
    return () => window.removeEventListener('userProfileUpdated', handler);
  }, []);

  useEffect(() => {
    if (!selectedTournamentId) return;
    let cancelled = false;
    setLoading(true);
    setError('');
    fetchTournamentTable(Number(selectedTournamentId))
      .then((table) => {
        if (cancelled) return;
        setPlayers(table.tournament_participant.map((participant) => participantToPlayer(participant, table.title)));
        setScoringRules(table.tournament_rules ?? []);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Не удалось загрузить таблицу');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedTournamentId]);

  const selectedTournament = useMemo(
    () => tournaments.find((tournament) => tournament.id === selectedTournamentId),
    [selectedTournamentId, tournaments],
  );
  const scoringLegend = useMemo(() => scoringLegendFromRules(scoringRules), [scoringRules]);
  const top3 = players.slice(0, 3);
  const rest = players.slice(3);

  const openProfile = (player: Player, rank: number) => {
    setProfilePlayer(player);
    setProfileRank(rank);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Event selector */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.65rem', display: 'block', mb: 0.5 }}>
            Мероприятие
          </Typography>
          <FormControl size="small" variant="outlined">
            <Select
              value={selectedTournamentId}
              onChange={(e) => setSelectedTournamentId(Number(e.target.value))}
              sx={{
                fontSize: '0.875rem', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700,
                color: 'primary.main',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(196,241,53,0.2)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(196,241,53,0.4)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                '& .MuiSelect-icon': { color: 'primary.main' },
              }}
            >
              {tournaments.map((tournament) => (
                <MenuItem key={tournament.id} value={tournament.id} sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 600 }}>
                  {tournament.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Chip label={`${selectedTournament?.participants ?? players.length} участников`} size="small" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={28} />
        </Box>
      )}

      {!loading && !players.length && !error && (
        <Box sx={{ p: 3, borderRadius: 1.5, bgcolor: '#0d1120', border: '1px solid rgba(26,34,64,0.8)', textAlign: 'center' }}>
          <Typography sx={{ color: 'text.secondary' }}>В этом турнире пока нет участников.</Typography>
        </Box>
      )}

      {/* Top 3 */}
      {!loading && players.length > 0 && <Box sx={{ mb: 3 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.65rem', display: 'block', mb: 2 }}>
          Призовые места
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {top3.map((player, i) => (
            <Box
              key={player.id}
              onClick={() => openProfile(player, i + 1)}
              sx={{
                display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 },
                p: { xs: 1.5, md: 2 }, borderRadius: 1.5, cursor: 'pointer',
                bgcolor: i === 0 ? 'rgba(255,215,0,0.06)' : '#0d1120',
                border: `1px solid ${i === 0 ? 'rgba(255,215,0,0.2)' : i === 1 ? 'rgba(192,192,192,0.15)' : 'rgba(205,127,50,0.12)'}`,
                position: 'relative', overflow: 'hidden',
                transition: 'background-color 0.12s ease',
                '&:hover': { bgcolor: i === 0 ? 'rgba(255,215,0,0.09)' : 'rgba(255,255,255,0.03)' },
              }}
            >
              {i === 0 && <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, bgcolor: '#FFD700', opacity: 0.6 }} />}

              {/* Rank badge */}
              <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: `${MEDAL_COLORS[i]}18`, border: `1px solid ${MEDAL_COLORS[i]}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Typography sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: '0.85rem', color: MEDAL_COLORS[i] }}>{i + 1}</Typography>
              </Box>

              {/* Avatar */}
              <ParticipantAvatar
                player={player}
                size={38}
                profile={player.username === currentUsername ? localProfile : undefined}
              />

              {/* Name + accuracy bar */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '0.98rem', color: i === 0 ? '#FFD700' : 'text.primary', mb: 0.75 }} noWrap>
                  {player.name}
                </Typography>
                <AccuracyBar player={player} />
              </Box>

              {/* Points */}
              <Box sx={{ textAlign: 'right', flexShrink: 0, ml: 1 }}>
                <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, fontSize: { xs: '1.15rem', md: '1.4rem' }, color: MEDAL_COLORS[i], lineHeight: 1 }}>
                  {player.points}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>очков</Typography>
              </Box>

              <Chip label={MEDAL_LABELS[i]} size="small" sx={{ bgcolor: `${MEDAL_COLORS[i]}18`, color: MEDAL_COLORS[i], border: `1px solid ${MEDAL_COLORS[i]}30`, fontSize: '0.6rem', height: 20, display: { xs: 'none', sm: 'flex' }, flexShrink: 0 }} />
            </Box>
          ))}
        </Box>
      </Box>}

      {/* Rest of leaderboard */}
      {!loading && rest.length > 0 && <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.65rem', display: 'block', mb: 1.5 }}>
          Остальные участники
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 1.5 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 36 }}>#</TableCell>
                <TableCell>Игрок</TableCell>
                {/* Accuracy breakdown — hidden on mobile */}
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, minWidth: 160 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box sx={{ width: 7, height: 7, borderRadius: 0.5, bgcolor: '#c4f135' }} />
                      <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', fontWeight: 600 }}>Счёт</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box sx={{ width: 7, height: 7, borderRadius: 0.5, bgcolor: '#38bdf8' }} />
                      <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', fontWeight: 600 }}>Исход</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box sx={{ width: 7, height: 7, borderRadius: 0.5, bgcolor: '#f59e0b' }} />
                      <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', fontWeight: 600 }}>Разница</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ width: 64 }}>Очки</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rest.map((player, i) => {
                const pos = i + 4;
                return (
                  <TableRow key={player.id} onClick={() => openProfile(player, pos)} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgba(196,241,53,0.03)' } }}>
                    <TableCell>
                      <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, fontSize: '0.78rem', color: 'text.secondary' }}>{pos}</Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
                        <ParticipantAvatar
                          player={player}
                          size={26}
                          profile={player.username === currentUsername ? localProfile : undefined}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {player.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    {/* Stacked accuracy bar */}
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      <AccuracyBar player={player} />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end' }}>
                        <TrendingIcon sx={{ fontSize: '0.85rem', color: 'text.secondary' }} />
                        <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, fontSize: '0.88rem', color: 'text.primary' }}>{player.points}</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>}

      {/* Scoring legend */}
      {!loading && players.length > 0 && scoringLegend.length > 0 && <Box sx={{ mt: 3, p: 2, borderRadius: 1.5, bgcolor: '#141928', border: '1px solid rgba(26,34,64,0.8)' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.5, sm: 3 }, alignItems: 'center' }}>
          <TrophyIcon sx={{ fontSize: '1rem', color: 'text.secondary', flexShrink: 0 }} />
          {scoringLegend.map((s) => (
            <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: 0.5, bgcolor: s.color }} />
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.73rem' }}>
                <strong style={{ color: s.color }}>{formatRulePoints(s.points)} очков</strong> — {s.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>}

      {/* Player stats dialog */}
      <PlayerStatsDialog
        player={profilePlayer}
        rank={profileRank}
        open={profilePlayer !== null}
        onClose={() => setProfilePlayer(null)}
      />
    </Box>
  );
}
