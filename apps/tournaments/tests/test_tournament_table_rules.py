from django.contrib.auth import get_user_model
from django.test import TestCase

from tournaments.api.v3.serializers import TournamentTableSerializer
from tournaments.models import BaseTournament, Rule, Tournament

User = get_user_model()


class TournamentTableRulesTests(TestCase):
    def test_table_serializer_includes_active_rules(self):
        base = BaseTournament.objects.create(title='Base Cup')
        tournament = Tournament.objects.create(
            base_tournament=base,
            title='Season Cup',
            code='season-rules-test',
        )
        Rule.objects.create(
            tournament=tournament,
            rule_type='exact result',
            points=4,
            active=True,
        )
        Rule.objects.create(
            tournament=tournament,
            rule_type='match result',
            points=2,
            active=True,
        )
        Rule.objects.create(
            tournament=tournament,
            rule_type='winner1',
            points=10,
            active=False,
        )

        data = TournamentTableSerializer(tournament).data

        self.assertEqual(len(data['tournament_rules']), 2)
        rule_types = {rule['rule_type'] for rule in data['tournament_rules']}
        self.assertEqual(rule_types, {'exact result', 'match result'})
        exact_rule = next(rule for rule in data['tournament_rules'] if rule['rule_type'] == 'exact result')
        self.assertEqual(exact_rule['points'], 4)
