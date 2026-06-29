import { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  IconButton,
  Avatar,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  SportsSoccer as SoccerIcon,
  EmojiEvents as TrophyIcon,
  Visibility as ViewIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
} from '@mui/icons-material';
import { matches, predictions, myPredictions as initialMyPredictions, currentUser } from '../utils/mockData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function calcPoints(
  pred: { homeScore: number; awayScore: number },
  actual: { homeScore: number | null; awayScore: number | null },
): number | null {
  if (actual.homeScore === null || actual.awayScore === null) return null;
  if (pred.homeScore === actual.homeScore && pred.awayScore === actual.awayScore) return 5;
  const pDiff = pred.homeScore - pred.awayScore;
  const aDiff = actual.homeScore - actual.awayScore;
  if (pDiff === aDiff) return 2;
  if (Math.sign(pDiff) === Math.sign(aDiff)) return 3;
  return 0;
}

const pointsChipProps = (pts: number) => {
  if (pts === 5) return { label: '⭐ +5', sx: { bgcolor: 'rgba(196,241,53,0.12)', color: '#c4f135', border: '1px solid rgba(196,241,53,0.3)' } };
  if (pts === 3) return { label: '+3', sx: { bgcolor: 'rgba(56,189,248,0.12)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.3)' } };
  if (pts === 2) return { label: '+2', sx: { bgcolor: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' } };
  return { label: '+0', sx: { bgcolor: 'rgba(90,106,138,0.12)', color: '#5a6a8a', border: '1px solid rgba(90,106,138,0.3)' } };
};

const teamColors: Record<string, string> = {
  'Спартак': '#e8102c',
  'ЦСКА': '#003478',
  'Зенит': '#0070CC',
  'Локомотив': '#00923F',
  'Краснодар': '#1d5e2a',
  'Динамо': '#005baa',
  'Ростов': '#003d79',
  'Рубин': '#82001e',
};

function TeamAvatar({ name }: { name: string }) {
  const color = teamColors[name] || '#1a2240';
  return (
    <Avatar
      sx={{
        width: 40,
        height: 40,
        bgcolor: color,
        fontFamily: '"Barlow Condensed", sans-serif',
        fontWeight: 800,
        fontSize: '0.85rem',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {name.slice(0, 3).toUpperCase()}
    </Avatar>
  );
}

function ScoreStepper({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.65rem', textAlign: 'center' }} noWrap>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          size="small"
          onClick={() => onChange(Math.max(0, value - 1))}
          sx={{
            width: 36,
            height: 36,
            bgcolor: '#141928',
            border: '1px solid rgba(26, 34, 64, 0.8)',
            color: 'text.secondary',
            '&:hover': { bgcolor: '#1a2240', color: 'text.primary' },
          }}
        >
          <RemoveIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
        <Box
          sx={{
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(196, 241, 53, 0.06)',
            border: '1px solid rgba(196, 241, 53, 0.2)',
            borderRadius: 1,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"JetBrains Mono", monospace',
              fontWeight: 600,
              fontSize: '1.75rem',
              color: 'primary.main',
              lineHeight: 1,
            }}
          >
            {value}
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={() => onChange(Math.min(99, value + 1))}
          sx={{
            width: 36,
            height: 36,
            bgcolor: 'rgba(196, 241, 53, 0.1)',
            border: '1px solid rgba(196, 241, 53, 0.2)',
            color: 'primary.main',
            '&:hover': { bgcolor: 'rgba(196, 241, 53, 0.18)', borderColor: 'primary.main' },
          }}
        >
          <AddIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export function MatchesPage() {
  const [tabValue, setTabValue] = useState(0);
  const [sortDesc, setSortDesc] = useState(true);
  const [predictionDialog, setPredictionDialog] = useState<number | null>(null);
  const [predictionsDialog, setPredictionsDialog] = useState<number | null>(null);
  const [myPredictions, setMyPredictions] = useState(initialMyPredictions);
  const [tempPrediction, setTempPrediction] = useState({ homeScore: 0, awayScore: 0 });

  const openPredictionDialog = (matchId: number) => {
    const existing = myPredictions[matchId];
    setTempPrediction(existing || { homeScore: 0, awayScore: 0 });
    setPredictionDialog(matchId);
  };

  const savePrediction = () => {
    if (predictionDialog !== null) {
      setMyPredictions({ ...myPredictions, [predictionDialog]: tempPrediction });
      setPredictionDialog(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const sortFn = (a: typeof matches[0], b: typeof matches[0]) =>
    sortDesc
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime();

  const completedMatches = matches.filter((m) => m.status === 'completed').sort(sortFn);
  const upcomingMatches = matches.filter((m) => m.status === 'upcoming').sort(sortFn);

  const currentDialogMatch = predictionDialog !== null ? matches.find((m) => m.id === predictionDialog) : null;
  const currentPredictionsMatch = predictionsDialog !== null ? matches.find((m) => m.id === predictionsDialog) : null;
  const matchPredictions = predictionsDialog !== null ? predictions.filter((p) => p.matchId === predictionsDialog) : [];

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Tabs + sort */}
      <Box sx={{ borderBottom: '1px solid rgba(26, 34, 64, 0.8)', mb: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          <Tab
            icon={<ScheduleIcon sx={{ fontSize: '1rem' }} />}
            iconPosition="start"
            label={`Предстоящие (${upcomingMatches.length})`}
            sx={{ minHeight: 48, gap: 0.75 }}
          />
          <Tab
            icon={<CheckIcon sx={{ fontSize: '1rem' }} />}
            iconPosition="start"
            label={`Завершённые (${completedMatches.length})`}
            sx={{ minHeight: 48, gap: 0.75 }}
          />
        </Tabs>
        <Button
          size="small"
          onClick={() => setSortDesc((v) => !v)}
          startIcon={sortDesc ? <ArrowDownIcon sx={{ fontSize: '0.9rem' }} /> : <ArrowUpIcon sx={{ fontSize: '0.9rem' }} />}
          sx={{
            mr: 0.5,
            py: 0.5,
            px: 1.25,
            color: 'text.secondary',
            border: '1px solid rgba(26, 34, 64, 0.8)',
            borderRadius: 1,
            fontSize: '0.72rem',
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 600,
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
            '&:hover': { borderColor: 'rgba(90,106,138,0.5)', color: 'text.primary', bgcolor: 'rgba(26,34,64,0.4)' },
          }}
        >
          {sortDesc ? 'Новые' : 'Старые'}
        </Button>
      </Box>

      {/* Upcoming matches */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={2}>
          {upcomingMatches.map((match) => {
            const myPrediction = myPredictions[match.id];
            return (
              <Grid size={{ xs: 12, md: 6 }} key={match.id}>
                <Box
                  sx={{
                    bgcolor: '#0d1120',
                    border: myPrediction ? '1px solid rgba(196, 241, 53, 0.2)' : '1px solid rgba(26, 34, 64, 0.8)',
                    borderRadius: 1.5,
                    p: 2.5,
                    transition: 'border-color 0.15s ease',
                  }}
                >
                  {/* Header */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2, gap: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                      <Chip
                        icon={<SoccerIcon sx={{ fontSize: '0.75rem !important' }} />}
                        label={match.tournament.replace('Российская ', '')}
                        size="small"
                        color="primary"
                      />
                      <Chip
                        label={match.stage}
                        size="small"
                        sx={{
                          bgcolor: 'transparent',
                          border: '1px solid rgba(90,106,138,0.35)',
                          color: 'text.secondary',
                          fontSize: '0.65rem',
                          height: 20,
                          alignSelf: 'flex-start',
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexShrink: 0 }}>
                      <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: 'success.main', boxShadow: '0 0 6px rgba(34,197,94,0.5)' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>
                        {formatDate(match.date)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Teams + central score/VS */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
                      <TeamAvatar name={match.homeTeam} />
                      <Typography variant="body2" sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.02em', textAlign: 'center' }}>
                        {match.homeTeam}
                      </Typography>
                    </Box>

                    {myPrediction ? (
                      /* Prediction shown like a score box */
                      <Box sx={{ px: 2, py: 1, bgcolor: 'rgba(196,241,53,0.07)', borderRadius: 1, border: '1px solid rgba(196,241,53,0.25)', textAlign: 'center', minWidth: 80 }}>
                        <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, fontSize: '1.75rem', color: 'primary.main', lineHeight: 1 }}>
                          {myPrediction.homeScore}:{myPrediction.awayScore}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'primary.main', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.8 }}>
                          прогноз
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ px: 1, py: 0.5, bgcolor: '#141928', borderRadius: 1, border: '1px solid rgba(26,34,64,0.8)' }}>
                        <Typography sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: '1.25rem', color: 'text.secondary', letterSpacing: '0.1em' }}>
                          VS
                        </Typography>
                      </Box>
                    )}

                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
                      <TeamAvatar name={match.awayTeam} />
                      <Typography variant="body2" sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.02em', textAlign: 'center' }}>
                        {match.awayTeam}
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    fullWidth
                    variant={myPrediction ? 'outlined' : 'contained'}
                    color="primary"
                    onClick={() => openPredictionDialog(match.id)}
                    sx={{ py: 1.25, fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.04em' }}
                  >
                    {myPrediction ? 'Изменить прогноз' : 'Сделать прогноз'}
                  </Button>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </TabPanel>

      {/* Completed matches */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={2}>
          {completedMatches.map((match) => (
            <Grid size={{ xs: 12, md: 6 }} key={match.id}>
              <Box
                sx={{
                  bgcolor: '#0d1120',
                  border: '1px solid rgba(26, 34, 64, 0.8)',
                  borderRadius: 1.5,
                  p: 2.5,
                }}
              >
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2, gap: 1 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                    <Chip label="Завершён" size="small" color="success" />
                    <Chip
                      label={match.stage}
                      size="small"
                      sx={{
                        bgcolor: 'transparent',
                        border: '1px solid rgba(90,106,138,0.35)',
                        color: 'text.secondary',
                        fontSize: '0.65rem',
                        height: 20,
                        alignSelf: 'flex-start',
                      }}
                    />
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem', flexShrink: 0 }}>
                    {formatDate(match.date)}
                  </Typography>
                </Box>

                {/* Teams + Score */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
                    <TeamAvatar name={match.homeTeam} />
                    <Typography variant="body2" sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '0.9rem', textAlign: 'center' }}>
                      {match.homeTeam}
                    </Typography>
                  </Box>

                  <Box sx={{ px: 2.5, py: 1, bgcolor: '#141928', borderRadius: 1, border: '1px solid rgba(26,34,64,0.8)', textAlign: 'center', minWidth: 80 }}>
                    <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, fontSize: '1.75rem', color: 'text.primary', letterSpacing: '0.1em', lineHeight: 1 }}>
                      {match.homeScore}:{match.awayScore}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      итог
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
                    <TeamAvatar name={match.awayTeam} />
                    <Typography variant="body2" sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '0.9rem', textAlign: 'center' }}>
                      {match.awayTeam}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  startIcon={<ViewIcon sx={{ fontSize: '1rem' }} />}
                  onClick={() => setPredictionsDialog(match.id)}
                  sx={{
                    py: 1.1,
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    borderColor: 'rgba(26, 34, 64, 0.8)',
                    color: 'text.secondary',
                    '&:hover': { borderColor: 'rgba(90,106,138,0.5)', color: 'text.primary', bgcolor: 'rgba(26,34,64,0.4)' },
                  }}
                >
                  Прогнозы участников
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Prediction dialog */}
      <Dialog
        open={predictionDialog !== null}
        onClose={() => setPredictionDialog(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { mx: 2 } }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SoccerIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
            Ваш прогноз
          </Box>
          {currentDialogMatch && (
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', display: 'block', mt: 0.5, fontFamily: '"DM Sans", sans-serif', fontWeight: 400 }}>
              {currentDialogMatch.homeTeam} — {currentDialogMatch.awayTeam}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent sx={{ pt: '20px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2.5, py: 1 }}>
            <ScoreStepper
              label={currentDialogMatch?.homeTeam ?? 'Хозяева'}
              value={tempPrediction.homeScore}
              onChange={(v) => setTempPrediction({ ...tempPrediction, homeScore: v })}
            />
            <Typography
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 600,
                fontSize: '1.5rem',
                color: 'text.secondary',
                mt: 2,
              }}
            >
              :
            </Typography>
            <ScoreStepper
              label={currentDialogMatch?.awayTeam ?? 'Гости'}
              value={tempPrediction.awayScore}
              onChange={(v) => setTempPrediction({ ...tempPrediction, awayScore: v })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1.5, gap: 1 }}>
          <Button
            onClick={() => setPredictionDialog(null)}
            sx={{ color: 'text.secondary', borderColor: 'rgba(26,34,64,0.8)', '&:hover': { borderColor: 'rgba(90,106,138,0.5)' } }}
            variant="outlined"
          >
            Отмена
          </Button>
          <Button onClick={savePrediction} variant="contained" sx={{ flex: 1, fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.04em' }}>
            Сохранить прогноз
          </Button>
        </DialogActions>
      </Dialog>

      {/* Predictions viewer dialog */}
      <Dialog
        open={predictionsDialog !== null}
        onClose={() => setPredictionsDialog(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { mx: 2 } }}
      >
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
          {currentPredictionsMatch && (
            <>
              <Box
                sx={{
                  mx: 3,
                  mt: 2,
                  mb: 2,
                  p: 2,
                  bgcolor: '#141928',
                  borderRadius: 1,
                  border: '1px solid rgba(26, 34, 64, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                }}
              >
                <Typography sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '1rem', color: 'text.secondary' }}>
                  {currentPredictionsMatch.homeTeam}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontWeight: 600,
                    fontSize: '2rem',
                    color: 'text.primary',
                    letterSpacing: '0.1em',
                  }}
                >
                  {currentPredictionsMatch.homeScore}:{currentPredictionsMatch.awayScore}
                </Typography>
                <Typography sx={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '1rem', color: 'text.secondary' }}>
                  {currentPredictionsMatch.awayTeam}
                </Typography>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {/* Width 100% goes to this column; the other two are pinned narrow */}
                      <TableCell sx={{ width: '100%' }}>Участник</TableCell>
                      <TableCell align="center" sx={{ whiteSpace: 'nowrap', width: 72 }}>Прогноз</TableCell>
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap', width: 56 }}>Очки</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {matchPredictions.map((pred) => {
                      const isMe = pred.playerId === currentUser.id;
                      return (
                        <TableRow
                          key={pred.id}
                          sx={{ bgcolor: isMe ? 'rgba(196, 241, 53, 0.04)' : 'inherit' }}
                        >
                          {/* Name cell: takes all leftover space, truncates safely */}
                          <TableCell sx={{ maxWidth: 0, width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                              <Avatar
                                sx={{
                                  width: 24,
                                  height: 24,
                                  bgcolor: isMe ? 'primary.main' : '#141928',
                                  color: isMe ? 'background.default' : 'text.secondary',
                                  fontFamily: '"Barlow Condensed", sans-serif',
                                  fontWeight: 700,
                                  fontSize: '0.7rem',
                                  border: `1px solid ${isMe ? 'rgba(196,241,53,0.4)' : 'rgba(26,34,64,0.8)'}`,
                                  flexShrink: 0,
                                }}
                              >
                                {pred.playerName.charAt(0)}
                              </Avatar>
                              <Typography variant="body2" sx={{ fontSize: '0.85rem', fontWeight: isMe ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                                {pred.playerName}
                              </Typography>
                              {isMe && (
                                <Chip label="Вы" size="small" color="primary" sx={{ height: 16, fontSize: '0.6rem', flexShrink: 0 }} />
                              )}
                            </Box>
                          </TableCell>
                          <TableCell align="center" sx={{ width: 72 }}>
                            <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, fontSize: '1rem', color: 'text.primary', whiteSpace: 'nowrap' }}>
                              {pred.homeScore}:{pred.awayScore}
                            </Typography>
                          </TableCell>
                          <TableCell align="right" sx={{ width: 56 }}>
                            <Chip
                              label={pred.points === 5 ? `+${pred.points} ⭐` : pred.points! > 0 ? `+${pred.points}` : '0'}
                              size="small"
                              color={pred.points === 5 ? 'primary' : pred.points! > 0 ? 'warning' : 'default'}
                              sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, height: 22 }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setPredictionsDialog(null)} variant="outlined" sx={{ borderColor: 'rgba(26,34,64,0.8)', color: 'text.secondary' }}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
