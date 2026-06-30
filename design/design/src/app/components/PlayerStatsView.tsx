import { useState, useRef, useEffect } from 'react';
import {
  Box, Typography, Grid, Avatar, LinearProgress, Chip,
  IconButton, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Tooltip, Tabs, Tab, CircularProgress,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon, Stars as StarsIcon,
  Timeline as TimelineIcon, EmojiEvents as TrophyIcon,
  GpsFixed as AccuracyIcon, Edit as EditIcon,
  Star as StarIcon,
  Palette as PaletteIcon, EmojiEmotions as EmojiIcon,
  PhotoCamera as PhotoIcon, Delete as DeleteIcon,
  SportsScore as TournamentIcon,
} from '@mui/icons-material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from 'recharts';
import {
  type Player, type TournamentFavorite, type TournamentRule, type MatchForecastHistory,
  fetchParticipant, fetchTournaments, fetchTournamentTable, normalizeMediaUrl, updateMe,
  apiUserToPlayerFields, scoreToTournamentStats, aggregateTournamentStats, outcomeRulePoints,
  aggregateMatchBlocks, type TournamentStats,
} from '../utils/api';
import { type UserProfile, type AvatarType, saveUserProfile, resizeImage, resolveAvatarProfile, mergeUserIntoProfile, type AvatarDisplayProfile } from '../utils/userProfile';
// ─── Constants ────────────────────────────────────────────────────────────────

export const AVATAR_COLORS = [
  '#c4f135', '#ff4e1a', '#38bdf8', '#f59e0b', '#a855f7',
  '#22c55e', '#ef4444', '#06b6d4', '#ec4899', '#84cc16',
  '#f97316', '#6366f1', '#14b8a6', '#e879f9', '#fb923c',
];

const AVATAR_EMOJIS = [
  '⚽', '🏆', '🥇', '🎯', '🦁', '🐯', '🦅', '⚡', '🔥', '💫',
  '🌟', '⭐', '🚀', '💥', '🦊', '🐺', '🦋', '🌈', '🏅', '🎭',
  '👑', '🤩', '😎', '🦸', '🧠', '💪', '🎮', '🎲', '🃏', '🏔️',
  '🐉', '🦄', '🌊', '❄️', '☄️', '🎪', '🥊', '🏹', '⚔️', '🛡️',
];

// ─── Shared avatar renderer ───────────────────────────────────────────────────

export function UserAvatarDisplay({ profile, size = 40 }: {
  profile: AvatarDisplayProfile;
  size?: number;
}) {
  const fontSize = size * 0.42;

  if (profile.avatarType === 'photo' && profile.avatarPhoto) {
    return <Avatar src={profile.avatarPhoto} imgProps={{ referrerPolicy: 'no-referrer' }} sx={{ width: size, height: size, border: `2px solid ${profile.avatarColor}50`, flexShrink: 0 }} />;
  }
  if (profile.avatarType === 'emoji' && profile.avatarEmoji) {
    // Emoji sits on the chosen color background, same as the letter variant
    return (
      <Avatar sx={{ width: size, height: size, bgcolor: profile.avatarColor, border: `1px solid ${profile.avatarColor}60`, fontSize: fontSize * 1.35, flexShrink: 0 }}>
        {profile.avatarEmoji}
      </Avatar>
    );
  }
  return (
    <Avatar sx={{ width: size, height: size, bgcolor: profile.avatarColor, color: '#080b14', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize, flexShrink: 0 }}>
      {profile.nickname.charAt(0).toUpperCase()}
    </Avatar>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

interface TournamentEntry {
  tournamentId: number;
  title: string;
  participantId: number;
  stats: TournamentStats;
  rules: TournamentRule[];
  matchForecasts: MatchForecastHistory[];
  favorites: TournamentFavorite[];
}

function deriveStats(entries: TournamentEntry[], selectedTournamentId: number | null): TournamentStats {
  if (!entries.length) {
    return { tournament: 'Все турниры', points: 0, totalPredictions: 0, exactScores: 0, correctOutcomes: 0, correctDiff: 0 };
  }
  if (!selectedTournamentId) {
    return aggregateTournamentStats(entries.map((entry) => entry.stats));
  }
  return entries.find((entry) => entry.tournamentId === selectedTournamentId)?.stats
    ?? { tournament: '', points: 0, totalPredictions: 0, exactScores: 0, correctOutcomes: 0, correctDiff: 0 };
}

function getCategories(stats: TournamentStats, rulePoints: ReturnType<typeof outcomeRulePoints>) {
  const wrong = Math.max(0, stats.totalPredictions - stats.exactScores - stats.correctOutcomes - stats.correctDiff);
  const showPoints = rulePoints !== null;
  return [
    { name: 'Точный счёт', count: stats.exactScores, color: '#c4f135', points: showPoints ? rulePoints.exact : null },
    { name: 'Исход', count: stats.correctOutcomes, color: '#38bdf8', points: showPoints ? rulePoints.outcome : null },
    { name: 'Разница', count: stats.correctDiff, color: '#f59e0b', points: showPoints ? rulePoints.diff : null },
    { name: 'Неверно', count: wrong, color: '#5a6a8a', points: null },
  ];
}

function shortTournamentTitle(title: string) {
  return title.replace('Российская ', '').replace('ая ', '. ');
}

// ─── Chart tooltip ────────────────────────────────────────────────────────────

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <Box sx={{ bgcolor: '#141928', border: '1px solid rgba(26,34,64,0.8)', borderRadius: 1, p: 1.5 }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', display: 'block', mb: 0.5 }}>{label}</Typography>
      {payload.map((e: any) => (
        <Typography key={e.name} variant="caption" sx={{ color: e.color, fontSize: '0.8rem', display: 'block', fontFamily: '"JetBrains Mono", monospace', fontWeight: 600 }}>
          {e.name}: {e.value}{e.name === 'Точность' ? '%' : ''}
        </Typography>
      ))}
    </Box>
  );
};

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ title, value, subtitle, icon, accentColor, bgColor }: {
  title: string; value: string | number; subtitle?: string;
  icon: React.ReactNode; accentColor: string; bgColor: string;
}) {
  return (
    <Box sx={{ p: 2, borderRadius: 1.5, bgcolor: '#0d1120', border: `1px solid ${accentColor}25`, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', top: 0, right: 0, width: 56, height: 56, borderRadius: '0 6px 0 56px', bgcolor: bgColor }} />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{title}</Typography>
          <Box sx={{ color: accentColor, '& svg': { fontSize: '1rem' } }}>{icon}</Box>
        </Box>
        <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, fontSize: '1.6rem', color: accentColor, lineHeight: 1, mb: 0.5 }}>{value}</Typography>
        {subtitle && <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>{subtitle}</Typography>}
      </Box>
    </Box>
  );
}

// ─── Read-only favorites ──────────────────────────────────────────────────────

const WINNER_TYPE_LABELS: Record<TournamentFavorite['winner_type'], string> = {
  first: '1-й фаворит',
  second: '2-й фаворит',
  third: '3-й фаворит',
};

function favoriteAccent(index: number) {
  return index === 0 ? '#c4f135' : index === 1 ? '#38bdf8' : '#f59e0b';
}

function FavoritesReadOnly({ favorites, loading }: { favorites: TournamentFavorite[]; loading?: boolean }) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <CircularProgress size={22} />
      </Box>
    );
  }
  if (!favorites.length) {
    return <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>Фавориты не выбраны</Typography>;
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
      {favorites.map((item, i) => {
        const team = item.team;
        const accent = favoriteAccent(i);
        const badge = normalizeMediaUrl(team.badge);
        return (
          <Box key={`${item.winner_type}-${team.id}`} sx={{ display: 'flex', alignItems: 'center', gap: 1.25, p: 1.25, borderRadius: 1, bgcolor: i === 0 ? 'rgba(196,241,53,0.05)' : '#141928', border: `1px solid ${i === 0 ? 'rgba(196,241,53,0.15)' : 'rgba(26,34,64,0.8)'}` }}>
            <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: `${accent}22`, border: `1px solid ${accent}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 700, fontSize: '0.6rem', color: accent, lineHeight: 1 }}>{i + 1}</Typography>
            </Box>
            <Avatar src={badge ?? undefined} sx={{ width: 26, height: 26, bgcolor: '#1a2240', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: '0.6rem', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
              {(team.short_title || team.title).slice(0, 3).toUpperCase()}
            </Avatar>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="body2" sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '0.95rem' }} noWrap>{team.title}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem' }}>{WINNER_TYPE_LABELS[item.winner_type]}</Typography>
            </Box>
            {i === 0 && <StarIcon sx={{ fontSize: '0.75rem', color: '#FFD700', flexShrink: 0 }} />}
          </Box>
        );
      })}
    </Box>
  );
}

// ─── Avatar editor dialog ─────────────────────────────────────────────────────

interface AvatarEditorProps {
  open: boolean;
  saving?: boolean;
  initial: Pick<UserProfile, 'nickname' | 'avatarType' | 'avatarColor' | 'avatarEmoji' | 'avatarPhoto'>;
  onSave: (data: Pick<UserProfile, 'nickname' | 'avatarType' | 'avatarColor' | 'avatarEmoji' | 'avatarPhoto'>) => void;
  onClose: () => void;
}

function AvatarEditorDialog({ open, saving = false, initial, onSave, onClose }: AvatarEditorProps) {
  const [nickname, setNickname] = useState(initial.nickname);
  const [tab, setTab] = useState<AvatarType>(initial.avatarType);
  const [color, setColor] = useState(initial.avatarColor);
  const [emoji, setEmoji] = useState(initial.avatarEmoji);
  const [photo, setPhoto] = useState(initial.avatarPhoto);
  const [photoLoading, setPhotoLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoLoading(true);
    try { setPhoto(await resizeImage(file, 300)); setTab('photo'); } catch {}
    setPhotoLoading(false);
    e.target.value = '';
  };

  // Preview: emoji uses selected color background (fix applied here)
  const PreviewAvatar = () => {
    if (tab === 'photo' && photo) return <Avatar src={photo} sx={{ width: 56, height: 56, border: `2px solid ${color}50` }} />;
    if (tab === 'emoji') return <Avatar sx={{ width: 56, height: 56, bgcolor: color, border: `1px solid ${color}60`, fontSize: '1.75rem' }}>{emoji}</Avatar>;
    return <Avatar sx={{ width: 56, height: 56, bgcolor: color, color: '#080b14', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: '1.4rem' }}>{nickname.charAt(0).toUpperCase() || '?'}</Avatar>;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { mx: 2 } }}>
      <DialogTitle>Редактировать профиль</DialogTitle>
      <DialogContent sx={{ pt: '12px !important' }}>
        <TextField fullWidth label="Никнейм" value={nickname} onChange={e => setNickname(e.target.value)} inputProps={{ maxLength: 30 }} sx={{ mb: 2.5 }} />

        {/* Preview */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, bgcolor: '#141928', borderRadius: 1.5, mb: 2.5 }}>
          <PreviewAvatar />
          <Box>
            <Typography variant="body2" sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '1rem' }}>{nickname || 'Никнейм'}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>Предпросмотр</Typography>
          </Box>
        </Box>

        {/* Tab selector */}
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2, '& .MuiTab-root': { minHeight: 40, fontSize: '0.8rem', py: 0.5 } }}>
          <Tab value="color" icon={<PaletteIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label="Цвет" />
          <Tab value="emoji" icon={<EmojiIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label="Эмодзи" />
          <Tab value="photo" icon={<PhotoIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label="Фото" />
        </Tabs>

        {/* Color tab */}
        {tab === 'color' && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {AVATAR_COLORS.map(c => (
              <Box key={c} onClick={() => setColor(c)} sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: c, cursor: 'pointer', border: color === c ? '3px solid #e8f0ff' : '2px solid transparent', boxShadow: color === c ? `0 0 0 1px ${c}` : 'none', transition: 'all 0.15s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', '&:hover': { transform: 'scale(1.12)' } }}>
                {color === c && <Typography sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: '0.85rem', color: '#080b14', lineHeight: 1 }}>{nickname.charAt(0).toUpperCase() || '?'}</Typography>}
              </Box>
            ))}
          </Box>
        )}

        {/* Emoji tab — swatches show selected color bg to preview result */}
        {tab === 'emoji' && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {AVATAR_EMOJIS.map(e => (
              <Box key={e} onClick={() => setEmoji(e)} sx={{
                width: 42, height: 42, borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.35rem',
                bgcolor: emoji === e ? color : '#141928',
                border: emoji === e ? `1px solid ${color}80` : '1px solid rgba(26,34,64,0.8)',
                transition: 'all 0.12s ease',
                '&:hover': { bgcolor: emoji === e ? color : 'rgba(255,255,255,0.06)', transform: 'scale(1.1)' },
              }}>{e}</Box>
            ))}
          </Box>
        )}

        {/* Photo tab */}
        {tab === 'photo' && (
          <Box>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoSelect} />
            {photo ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Avatar src={photo} sx={{ width: 100, height: 100, border: '2px solid rgba(196,241,53,0.3)' }} />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" variant="outlined" startIcon={<PhotoIcon />} onClick={() => fileRef.current?.click()} sx={{ borderColor: 'rgba(26,34,64,0.8)', color: 'text.secondary' }}>Заменить</Button>
                  <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => setPhoto('')} sx={{ borderColor: 'rgba(239,68,68,0.3)', color: 'error.main' }}>Удалить</Button>
                </Box>
              </Box>
            ) : (
              <Box onClick={() => fileRef.current?.click()} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.5, p: 4, borderRadius: 2, cursor: 'pointer', border: '2px dashed rgba(26,34,64,0.8)', bgcolor: '#141928', transition: 'all 0.15s ease', '&:hover': { borderColor: 'rgba(196,241,53,0.4)', bgcolor: 'rgba(196,241,53,0.04)' } }}>
                <PhotoIcon sx={{ fontSize: '2rem', color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem', textAlign: 'center' }}>{photoLoading ? 'Загрузка...' : 'Нажмите, чтобы выбрать фото'}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>JPG, PNG, WebP · до 10 МБ</Typography>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 1, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderColor: 'rgba(26,34,64,0.8)', color: 'text.secondary' }} disabled={saving}>Отмена</Button>
        <Button onClick={() => onSave({ nickname: nickname.trim() || initial.nickname, avatarType: tab, avatarColor: color, avatarEmoji: emoji, avatarPhoto: photo })} variant="contained" disabled={!nickname.trim() || photoLoading || saving}>
          {saving ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface PlayerStatsViewProps {
  player: Player;
  rank: number;
  profile?: UserProfile;
  onProfileChange?: (updated: UserProfile) => void;
  onPlayerChange?: (updates: Partial<Player>) => void;
}

export function PlayerStatsView({ player, rank, profile, onProfileChange, onPlayerChange }: PlayerStatsViewProps) {
  const isOwnProfile = !!profile && !!onProfileChange;
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTournamentId, setSelectedTournamentId] = useState<number | null>(null);
  const [tournamentEntries, setTournamentEntries] = useState<TournamentEntry[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [tournamentFavorites, setTournamentFavorites] = useState<TournamentFavorite[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const [participantAvatar, setParticipantAvatar] = useState<string | null>(player.avatar ?? null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveError, setSaveError] = useState('');

  const nickname = profile?.nickname ?? player.name;

  const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
  const medalColor  = rank <= 3 ? medalColors[rank - 1] : undefined;

  const selectedEntry = selectedTournamentId
    ? tournamentEntries.find((entry) => entry.tournamentId === selectedTournamentId)
    : null;
  const stats = deriveStats(tournamentEntries, selectedTournamentId);
  const rulePoints = selectedTournamentId ? outcomeRulePoints(selectedEntry?.rules) : null;
  const correctPredictions = stats.exactScores + stats.correctOutcomes + stats.correctDiff;
  const accuracy = stats.totalPredictions > 0 ? (correctPredictions / stats.totalPredictions) * 100 : 0;
  const avgPoints = stats.totalPredictions > 0 ? (stats.points / stats.totalPredictions).toFixed(1) : '0';
  const matchForecasts = selectedTournamentId
    ? (selectedEntry?.matchForecasts ?? [])
    : tournamentEntries.flatMap((entry) => entry.matchForecasts);
  const matchBlockData = aggregateMatchBlocks(matchForecasts);
  const categories = getCategories(stats, rulePoints);
  const selectedTournamentTitle = selectedEntry?.title ?? null;
  const avgPointsPct = Math.min(100, parseFloat(avgPoints) * 20);

  const avatarProfile = resolveAvatarProfile({
    nickname: profile?.nickname ?? player.name,
    username: player.username,
    email: player.email,
    avatar: participantAvatar ?? player.avatar,
    avatar_type: player.avatarType,
    avatar_color: player.avatarColor,
    avatar_emoji: player.avatarEmoji,
  });

  useEffect(() => {
    let cancelled = false;
    setStatsLoading(true);
    setFavoritesLoading(true);

    async function loadTournamentStats() {
      try {
        const tournaments = await fetchTournaments();
        const userId = player.userId;
        if (!userId) {
          const fallback = await fetchParticipant(player.id);
          if (!cancelled) {
            setTournamentEntries([{
              tournamentId: fallback.tournament?.id ?? 0,
              title: fallback.tournament?.title ?? player.tournamentTitle ?? 'Турнир',
              participantId: player.id,
              stats: scoreToTournamentStats(fallback.tournament?.title ?? 'Турнир', fallback.score),
              rules: [],
              matchForecasts: fallback.match_forecasts ?? [],
              favorites: fallback.winner ?? [],
            }]);
            setTournamentFavorites(fallback.winner ?? []);
            if (fallback.user?.avatar) {
              setParticipantAvatar(normalizeMediaUrl(fallback.user.avatar));
            }
          }
          return;
        }

        const entries = (await Promise.all(
          tournaments.map(async (tournament) => {
            const table = await fetchTournamentTable(tournament.id);
            const participant = table.tournament_participant.find((item) => item.user.id === userId);
            if (!participant) return null;

            const details = await fetchParticipant(participant.id);
            return {
              tournamentId: tournament.id,
              title: table.title,
              participantId: participant.id,
              stats: scoreToTournamentStats(table.title, participant.score),
              rules: table.tournament_rules ?? [],
              matchForecasts: details.match_forecasts ?? [],
              favorites: details.winner ?? [],
              avatar: details.user?.avatar ?? null,
            } satisfies TournamentEntry & { avatar: string | null };
          }),
        )).filter((entry): entry is TournamentEntry & { avatar: string | null } => entry !== null);

        if (cancelled) return;

        setTournamentEntries(entries.map(({ avatar: _avatar, ...entry }) => entry));
        const currentEntry = entries.find((entry) => entry.participantId === player.id) ?? entries[0];
        setTournamentFavorites(currentEntry?.favorites ?? []);
        const avatar = (entries.find((entry) => entry.participantId === player.id) ?? entries[0])?.avatar;
        if (avatar) {
          setParticipantAvatar(normalizeMediaUrl(avatar));
        }
      } catch {
        if (!cancelled) {
          setTournamentEntries([]);
          setTournamentFavorites([]);
        }
      } finally {
        if (!cancelled) {
          setStatsLoading(false);
          setFavoritesLoading(false);
        }
      }
    }

    loadTournamentStats();
    return () => {
      cancelled = true;
    };
  }, [player.id, player.userId, player.tournamentTitle]);

  useEffect(() => {
    if (selectedTournamentId) {
      const entry = tournamentEntries.find((item) => item.tournamentId === selectedTournamentId);
      setTournamentFavorites(entry?.favorites ?? []);
      setFavoritesLoading(false);
    } else {
      const currentEntry = tournamentEntries.find((entry) => entry.participantId === player.id) ?? tournamentEntries[0];
      setTournamentFavorites(currentEntry?.favorites ?? []);
    }
  }, [selectedTournamentId, tournamentEntries, player.id]);

  const handleSaveAvatar = async (data: Pick<UserProfile, 'nickname' | 'avatarType' | 'avatarColor' | 'avatarEmoji' | 'avatarPhoto'>) => {
    if (!profile || !onProfileChange) return;
    setSavingProfile(true);
    setSaveError('');
    try {
      const payload = {
        nickname: data.nickname.trim() || profile.nickname,
        avatar_type: data.avatarType,
        avatar_color: data.avatarColor,
        avatar_emoji: data.avatarEmoji,
        clear_avatar: false as boolean,
        avatarDataUrl: undefined as string | undefined,
      };

      if (data.avatarType === 'photo') {
        if (data.avatarPhoto.startsWith('data:')) {
          payload.avatarDataUrl = data.avatarPhoto;
        } else if (!data.avatarPhoto) {
          payload.avatar_type = 'color';
          payload.clear_avatar = true;
        }
      } else {
        payload.clear_avatar = true;
      }

      const saved = await updateMe(payload);
      const updated = mergeUserIntoProfile(saved);
      onProfileChange(updated);
      saveUserProfile(updated);
      onPlayerChange?.(apiUserToPlayerFields(saved));
      setParticipantAvatar(normalizeMediaUrl(saved.avatar));
      setEditOpen(false);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Не удалось сохранить профиль');
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <Box>
      {/* ── Profile card ─────────────────────────────────────────────── */}
      <Box sx={{ p: 2.5, mb: 2.5, borderRadius: 1.5, background: 'linear-gradient(135deg, #0d1120 0%, #111a28 100%)', border: `1px solid ${medalColor ? `${medalColor}20` : 'rgba(196,241,53,0.15)'}`, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,241,53,0.07) 0%, transparent 70%)' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative', zIndex: 1 }}>
          <Box sx={{ position: 'relative', flexShrink: 0 }}>
            <UserAvatarDisplay profile={avatarProfile} size={60} />
            <Box sx={{ position: 'absolute', bottom: -2, right: -2, width: 22, height: 22, borderRadius: '50%', bgcolor: medalColor ?? '#1a2240', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #080b14' }}>
              <Typography sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: '0.6rem', color: rank <= 3 ? '#080b14' : 'text.secondary', lineHeight: 1 }}>{rank}</Typography>
            </Box>
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h6" sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.02em', lineHeight: 1.2 }} noWrap>{nickname}</Typography>
            {isOwnProfile && <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }} noWrap>{player.email || player.username || player.tournamentTitle}</Typography>}
          </Box>
          <Box sx={{ textAlign: 'right', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
            <Chip label={`#${rank} место`} size="small" color="primary" icon={<TrophyIcon sx={{ fontSize: '0.75rem !important' }} />} />
            <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, fontSize: '1.5rem', color: medalColor ?? 'primary.main', lineHeight: 1 }}>{player.points}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>очков (итого)</Typography>
          </Box>
          {isOwnProfile && (
            <Tooltip title="Редактировать профиль">
              <IconButton size="small" onClick={() => setEditOpen(true)} sx={{ alignSelf: 'flex-start', color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'rgba(196,241,53,0.08)' } }}>
                <EditIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      {/* ── Tournament selector ───────────────────────────────────────── */}
      {tournamentEntries.length > 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5, flexWrap: 'wrap' }}>
          <TournamentIcon sx={{ fontSize: '0.9rem', color: 'text.secondary', flexShrink: 0 }} />
          <Chip
            label="Все турниры"
            size="small"
            onClick={() => setSelectedTournamentId(null)}
            sx={{
              cursor: 'pointer',
              bgcolor: selectedTournamentId === null ? 'rgba(196,241,53,0.12)' : '#141928',
              color: selectedTournamentId === null ? 'primary.main' : 'text.secondary',
              border: selectedTournamentId === null ? '1px solid rgba(196,241,53,0.35)' : '1px solid rgba(26,34,64,0.8)',
              fontWeight: 600,
              '&:hover': { bgcolor: selectedTournamentId === null ? 'rgba(196,241,53,0.18)' : 'rgba(255,255,255,0.05)' },
            }}
          />
          {tournamentEntries.map((entry) => (
            <Chip
              key={entry.tournamentId}
              label={shortTournamentTitle(entry.title)}
              size="small"
              onClick={() => setSelectedTournamentId(entry.tournamentId)}
              sx={{
                cursor: 'pointer',
                bgcolor: selectedTournamentId === entry.tournamentId ? 'rgba(196,241,53,0.12)' : '#141928',
                color: selectedTournamentId === entry.tournamentId ? 'primary.main' : 'text.secondary',
                border: selectedTournamentId === entry.tournamentId ? '1px solid rgba(196,241,53,0.35)' : '1px solid rgba(26,34,64,0.8)',
                fontWeight: 600,
                '&:hover': { bgcolor: selectedTournamentId === entry.tournamentId ? 'rgba(196,241,53,0.18)' : 'rgba(255,255,255,0.05)' },
              }}
            />
          ))}
          {selectedTournamentId && (
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', ml: 0.5 }}>
              · {stats.totalPredictions} прогнозов
            </Typography>
          )}
        </Box>
      )}

      {/* ── Stat cards ───────────────────────────────────────────────── */}
      <Grid container spacing={1.5} sx={{ mb: 3 }}>
        {[
          { title: 'Точных счётов',  value: stats.exactScores,          subtitle: `из ${stats.totalPredictions} матчей`, icon: <AccuracyIcon />,   accent: '#c4f135', bg: 'rgba(196,241,53,0.06)' },
          { title: 'Точность',       value: `${accuracy.toFixed(0)}%`,  subtitle: 'прогнозов верных',                  icon: <TrendingUpIcon />, accent: '#38bdf8', bg: 'rgba(56,189,248,0.06)' },
          { title: 'Ср. очков/матч', value: avgPoints,                  subtitle: 'средний результат',                 icon: <StarsIcon />,      accent: '#f59e0b', bg: 'rgba(245,158,11,0.06)' },
          { title: 'Очков',          value: stats.points,               subtitle: selectedTournamentTitle ? shortTournamentTitle(selectedTournamentTitle) : 'Все турниры', icon: <TimelineIcon />,   accent: '#a855f7', bg: 'rgba(168,85,247,0.06)' },
        ].map(s => (
          <Grid size={{ xs: 6, md: 3 }} key={s.title}>
            <StatCard title={s.title} value={s.value} subtitle={s.subtitle} icon={s.icon} accentColor={s.accent} bgColor={s.bg} />
          </Grid>
        ))}
      </Grid>

      {/* ── Charts ───────────────────────────────────────────────────── */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Box sx={{ p: 2.5, borderRadius: 1.5, bgcolor: '#0d1120', border: '1px solid rgba(26,34,64,0.8)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.04em' }}>ПРОГРЕСС ПО 10 МАТЧЕЙ</Typography>
              <Chip label={selectedTournamentTitle ? shortTournamentTitle(selectedTournamentTitle) : 'Все турниры'} size="small" sx={{ fontSize: '0.65rem', height: 20 }} />
            </Box>
            {statsLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                <CircularProgress size={24} />
              </Box>
            ) : matchBlockData.length === 0 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Недостаточно данных для графика</Typography>
              </Box>
            ) : (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={matchBlockData} margin={{ top: 5, right: 5, bottom: 0, left: -24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,34,64,0.8)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: '#5a6a8a', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="points" domain={[0, 'auto']} tick={{ fill: '#5a6a8a', fontSize: 10, fontFamily: '"JetBrains Mono", monospace' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="accuracy" orientation="right" domain={[0, 100]} tick={{ fill: '#5a6a8a', fontSize: 10, fontFamily: '"JetBrains Mono", monospace' }} axisLine={false} tickLine={false} />
                <RechartsTooltip content={<ChartTooltip />} />
                <Line yAxisId="points" type="linear" dataKey="points" stroke="#c4f135" strokeWidth={2} dot={{ fill: '#c4f135', r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} name="Очки" />
                <Line yAxisId="accuracy" type="linear" dataKey="accuracy" stroke="#38bdf8" strokeWidth={2} dot={{ fill: '#38bdf8', r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} name="Точность" />
              </LineChart>
            </ResponsiveContainer>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Box sx={{ p: 2.5, borderRadius: 1.5, bgcolor: '#0d1120', border: '1px solid rgba(26,34,64,0.8)', height: '100%' }}>
            <Typography variant="h6" sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.04em', mb: 2 }}>РАСПРЕДЕЛЕНИЕ ПРОГНОЗОВ</Typography>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={categories} margin={{ top: 5, right: 5, bottom: 0, left: -24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,34,64,0.8)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#5a6a8a', fontSize: 8 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#5a6a8a', fontSize: 9, fontFamily: '"JetBrains Mono", monospace' }} axisLine={false} tickLine={false} />
                <RechartsTooltip content={<ChartTooltip />} />
                <Bar dataKey="count" name="Прогнозов" radius={[3, 3, 0, 0]} onMouseEnter={(_, i) => setActiveBar(i)} onMouseLeave={() => setActiveBar(null)}>
                  {categories.map((c, i) => <Cell key={i} fill={c.color} opacity={activeBar === null || activeBar === i ? 1 : 0.4} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <Box sx={{ mt: 1.5, display: 'flex', flexDirection: 'column', gap: 0.6 }}>
              {categories.map(cat => (
                <Box key={cat.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: 0.5, bgcolor: cat.color, flexShrink: 0 }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>{cat.name}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, fontSize: '0.78rem', color: cat.color }}>{cat.count}</Typography>
                    {cat.points != null && cat.points > 0 && <Chip label={`+${cat.points}очк`} size="small" sx={{ height: 15, fontSize: '0.55rem', bgcolor: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}30` }} />}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* ── Detailed stat bars ────────────────────────────────────────── */}
      <Box sx={{ p: 2.5, borderRadius: 1.5, bgcolor: '#0d1120', border: '1px solid rgba(26,34,64,0.8)', mb: 2 }}>
        <Typography variant="h6" sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.04em', mb: 2 }}>ДЕТАЛЬНАЯ СТАТИСТИКА</Typography>
        <Grid container spacing={2}>
          {[
            { label: 'Средние очки за матч', value: avgPoints, pct: avgPointsPct, color: '#c4f135' },
            { label: 'Точные счёты',         value: stats.totalPredictions ? `${((stats.exactScores / stats.totalPredictions) * 100).toFixed(0)}%` : '—', pct: stats.totalPredictions ? (stats.exactScores / stats.totalPredictions) * 100 : 0,     color: '#22c55e' },
            { label: 'Правильный исход',     value: stats.totalPredictions ? `${((stats.correctOutcomes / stats.totalPredictions) * 100).toFixed(0)}%` : '—', pct: stats.totalPredictions ? (stats.correctOutcomes / stats.totalPredictions) * 100 : 0, color: '#f59e0b' },
            { label: 'Правильная разница',   value: stats.totalPredictions ? `${((stats.correctDiff / stats.totalPredictions) * 100).toFixed(0)}%` : '—',    pct: stats.totalPredictions ? (stats.correctDiff / stats.totalPredictions) * 100 : 0,    color: '#38bdf8' },
          ].map(s => (
            <Grid size={{ xs: 12, sm: 6 }} key={s.label}>
              <Box sx={{ mb: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.73rem' }}>{s.label}</Typography>
                <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, fontSize: '0.82rem', color: s.color }}>{s.value}</Typography>
              </Box>
              <LinearProgress variant="determinate" value={s.pct} sx={{ height: 5, bgcolor: 'rgba(26,34,64,0.8)', borderRadius: 1, '& .MuiLinearProgress-bar': { bgcolor: s.color, borderRadius: 1 } }} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ── Favorites ─────────────────────────────────────────────────── */}
      <Box sx={{ p: 2.5, borderRadius: 1.5, bgcolor: '#0d1120', border: '1px solid rgba(26,34,64,0.8)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.75 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StarIcon sx={{ fontSize: '1rem', color: '#FFD700' }} />
            <Typography variant="h6" sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.04em' }}>КОМАНДЫ-ФАВОРИТЫ</Typography>
          </Box>
        </Box>
        <FavoritesReadOnly favorites={tournamentFavorites} loading={favoritesLoading} />
      </Box>

      {/* ── Dialogs ─────────────────────────────────────────────────── */}
      {isOwnProfile && (
        <>
          {saveError && (
            <Typography variant="caption" sx={{ color: 'error.main', display: 'block', mb: 1.5 }}>
              {saveError}
            </Typography>
          )}
          <AvatarEditorDialog
            open={editOpen}
            saving={savingProfile}
            initial={{ nickname, avatarType: avatarProfile.avatarType, avatarColor: avatarProfile.avatarColor, avatarEmoji: avatarProfile.avatarEmoji, avatarPhoto: avatarProfile.avatarPhoto }}
            onSave={handleSaveAvatar}
            onClose={() => { if (!savingProfile) setEditOpen(false); }}
          />
        </>
      )}
    </Box>
  );
}
