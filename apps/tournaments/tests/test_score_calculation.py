from django.contrib.auth import get_user_model
from django.test import TestCase

from tournaments.api.v2.serializers import get_calc_score
from tournaments.models import (
    BaseTournament,
    Country,
    Forecast,
    ForecastWinner,
    Match,
    Participant,
    Result,
    Rule,
    Stage,
    Team,
    Tournament,
)

User = get_user_model()


class ScoreCalculationWinnerBonusTests(TestCase):
    def setUp(self):
        self.country = Country.objects.create(title='Testland')
        self.team_winner = Team.objects.create(country=self.country, title='Winner FC')
        self.team_other = Team.objects.create(country=self.country, title='Other FC')
        self.team_third = Team.objects.create(country=self.country, title='Third FC')

        self.base_tournament = BaseTournament.objects.create(
            title='Base Cup',
            winner=self.team_winner,
        )
        self.tournament = Tournament.objects.create(
            base_tournament=self.base_tournament,
            title='Season Cup',
            code='season-cup-test',
        )
        self.stage = Stage.objects.create(
            base_tournament=self.base_tournament,
            title='Group A',
            stage_type='group stage',
        )
        self.user = User.objects.create_user(
            username='player1',
            email='player1@example.com',
            password='pass',
        )
        self.participant = Participant.objects.create(
            user=self.user,
            tournament=self.tournament,
        )

        Rule.objects.create(
            tournament=self.tournament,
            rule_type='exact result',
            points=2,
        )
        Rule.objects.create(
            tournament=self.tournament,
            rule_type='winner1',
            points=10,
        )
        Rule.objects.create(
            tournament=self.tournament,
            rule_type='winner2',
            points=5,
        )
        Rule.objects.create(
            tournament=self.tournament,
            rule_type='winner3',
            points=3,
        )

    def _create_finished_match_with_forecast(self, forecast_home, forecast_away, result_home, result_away):
        match = Match.objects.create(
            base_tournament=self.base_tournament,
            stage=self.stage,
            team_home=self.team_winner,
            team_away=self.team_other,
            status='finished',
        )
        Forecast.objects.create(
            forecast_type='full time',
            match=match,
            tournament=self.tournament,
            score_home=forecast_home,
            score_away=forecast_away,
            user=self.user,
        )
        Result.objects.create(
            result_type='full time',
            match=match,
            score_home=result_home,
            score_away=result_away,
        )
        return match

    def _create_winner_forecasts(self, first=None, second=None, third=None):
        if first is not None:
            ForecastWinner.objects.create(
                tournament=self.tournament,
                user=self.user,
                winner_type='first',
                team=first,
            )
        if second is not None:
            ForecastWinner.objects.create(
                tournament=self.tournament,
                user=self.user,
                winner_type='second',
                team=second,
            )
        if third is not None:
            ForecastWinner.objects.create(
                tournament=self.tournament,
                user=self.user,
                winner_type='third',
                team=third,
            )

    def _score_queryset(self):
        return Match.objects.filter(
            match_forecast__tournament=self.tournament.id,
            match_forecast__forecast_type='full time',
            base_tournament=self.tournament.base_tournament,
            match_forecast__user=self.user,
            status='finished',
            match_result__result_type='full time',
        ).values(
            'match_forecast__tournament',
            'match_forecast__user',
            'team_home',
            'team_away',
            'match_forecast__score_home',
            'match_forecast__score_away',
            'match_result__score_home',
            'match_result__score_away',
            'stage',
        )

    def test_adds_bonuses_for_all_correct_winner_favorites(self):
        self._create_finished_match_with_forecast(2, 1, 2, 1)
        self._create_winner_forecasts(
            first=self.team_winner,
            second=self.team_winner,
            third=self.team_winner,
        )

        score = get_calc_score(self._score_queryset(), self.participant)

        self.assertEqual(score['points'], 20.0)
        self.assertEqual(score['tournament_bonuses'], 18.0)
        self.assertEqual(score['exact_result'], 1)
        self.assertEqual(score['forecasts_count'], 1)

    def test_adds_only_matching_winner_favorite_bonuses(self):
        self._create_finished_match_with_forecast(1, 0, 1, 0)
        self._create_winner_forecasts(
            first=self.team_winner,
            second=self.team_other,
            third=self.team_winner,
        )

        score = get_calc_score(self._score_queryset(), self.participant)

        self.assertEqual(score['tournament_bonuses'], 13.0)
        self.assertEqual(score['points'], 15.0)

    def test_no_winner_bonus_when_favorites_are_wrong(self):
        self._create_finished_match_with_forecast(1, 0, 1, 0)
        self._create_winner_forecasts(
            first=self.team_other,
            second=self.team_third,
            third=self.team_other,
        )

        score = get_calc_score(self._score_queryset(), self.participant)

        self.assertEqual(score['tournament_bonuses'], 0.0)
        self.assertEqual(score['points'], 2.0)

    def test_no_winner_bonus_when_tournament_winner_not_set(self):
        self.base_tournament.winner = None
        self.base_tournament.save(update_fields=['winner'])

        self._create_finished_match_with_forecast(1, 0, 1, 0)
        self._create_winner_forecasts(
            first=self.team_winner,
            second=self.team_winner,
            third=self.team_winner,
        )

        score = get_calc_score(self._score_queryset(), self.participant)

        self.assertEqual(score['tournament_bonuses'], 0.0)
        self.assertEqual(score['points'], 2.0)

    def test_awards_first_favorite_bonus_when_other_favorites_missing(self):
        self._create_finished_match_with_forecast(1, 0, 1, 0)
        ForecastWinner.objects.create(
            tournament=self.tournament,
            user=self.user,
            winner_type='first',
            team=self.team_winner,
        )

        score = get_calc_score(self._score_queryset(), self.participant)

        self.assertEqual(score['tournament_bonuses'], 10.0)
        self.assertEqual(score['points'], 12.0)

    def test_match_points_without_winner_favorites(self):
        self._create_finished_match_with_forecast(2, 1, 2, 1)

        score = get_calc_score(self._score_queryset(), self.participant)

        self.assertEqual(score['tournament_bonuses'], 0.0)
        self.assertEqual(score['points'], 2.0)
        self.assertEqual(score['exact_result'], 1)
