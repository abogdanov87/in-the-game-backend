import { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import {
  fetchMe,
  fetchTournamentTable,
  fetchTournaments,
  participantToPlayer,
  type Player,
} from '../utils/api';
import { loadUserProfile, mergeUserIntoProfile, type UserProfile } from '../utils/userProfile';
import { PlayerStatsView } from './PlayerStatsView';

export function StatsPage() {
  const [profile, setProfile] = useState<UserProfile>(loadUserProfile);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [rank, setRank] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function loadProfile() {
      setLoading(true);
      setError('');
      try {
        const [me, tournaments] = await Promise.all([fetchMe(), fetchTournaments()]);
        if (cancelled) return;
        setProfile(mergeUserIntoProfile(me));

        const tournament = tournaments.find((item) => item.active) ?? tournaments[0];
        if (!tournament) {
          setCurrentPlayer(null);
          return;
        }

        const table = await fetchTournamentTable(tournament.id);
        if (cancelled) return;
        const players = table.tournament_participant.map((participant) => participantToPlayer(participant, table.title));
        const playerIndex = players.findIndex((player) => (
          (me.id && player.userId === me.id) || player.username === me.username || player.email === me.email
        ));
        setCurrentPlayer(playerIndex >= 0 ? players[playerIndex] : null);
        setRank(playerIndex + 1);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Не удалось загрузить профиль');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={28} />
        </Box>
      )}
      {!loading && currentPlayer && (
        <PlayerStatsView
          player={currentPlayer}
          rank={rank}
          profile={profile}
          onProfileChange={setProfile}
        />
      )}
      {!loading && !currentPlayer && !error && (
        <Box sx={{ p: 3, borderRadius: 1.5, bgcolor: '#0d1120', border: '1px solid rgba(26,34,64,0.8)', textAlign: 'center' }}>
          <Typography sx={{ color: 'text.secondary' }}>
            Вы пока не участвуете в активном турнире.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
