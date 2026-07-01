from django.contrib.auth import get_user_model
from django.test import TestCase

from tournaments.api.v2.serializers import TournamentTableSerializer
from tournaments.models import BaseTournament, Participant, Tournament

User = get_user_model()


class TournamentTableParticipantsTests(TestCase):
    def setUp(self):
        base = BaseTournament.objects.create(title='Base Cup')
        self.tournament = Tournament.objects.create(
            base_tournament=base,
            title='Season Cup',
            code='season-participants-test',
        )
        self.active_user = User.objects.create_user(
            username='active-player',
            email='active@example.com',
            password='pass',
        )
        self.inactive_user = User.objects.create_user(
            username='inactive-player',
            email='inactive@example.com',
            password='pass',
        )
        Participant.objects.create(
            user=self.active_user,
            tournament=self.tournament,
            active=True,
        )
        Participant.objects.create(
            user=self.inactive_user,
            tournament=self.tournament,
            active=False,
        )

    def test_table_excludes_inactive_participants(self):
        data = TournamentTableSerializer(self.tournament).data

        participant_ids = {item['id'] for item in data['tournament_participant']}
        active_participant = Participant.objects.get(user=self.active_user, tournament=self.tournament)
        inactive_participant = Participant.objects.get(user=self.inactive_user, tournament=self.tournament)

        self.assertEqual(participant_ids, {active_participant.id})
        self.assertNotIn(inactive_participant.id, participant_ids)

    def test_table_includes_winner_favorites(self):
        data = TournamentTableSerializer(self.tournament).data

        self.assertIn('winner', data['tournament_participant'][0])
        self.assertEqual(data['tournament_participant'][0]['active'], True)
