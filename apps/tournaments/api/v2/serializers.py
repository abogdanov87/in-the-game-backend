from rest_framework import serializers
from django.utils import timezone
from rest_framework_bulk import BulkListSerializer, BulkSerializerMixin
from tournaments.models import (
    BaseTournament,
    Tournament,
    Country,
    Team,
    Match,
    Stage,
    Participant,
    Result,
    Forecast,
    Rule,
    StageCoefficient,
)
from common.api.v1.serializers import (
    UserSerializer,
)


def sign(x):
    return 1 if x > 0 else -1 if x < 0 else 0


class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rule
        fields = (
            'id',
            'rule_type',
            'tournament',
            'points',
            'active',
        )

    def validate(self, data):
        return data


class StageCoefficientSerializer(serializers.ModelSerializer):
    class Meta:
        model = StageCoefficient
        fields = (
            'id',
            'tournament',
            'stage',
            'coefficient',
            'active',
        )

    def validate(self, data):
        return data


class BaseTournamentSerializer(BulkSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = BaseTournament
        list_serializer_class = BulkListSerializer
        fields = (
            'id',
            'title',
            'stages',
            'active',
        )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['stages'] = StageSerializer(
            instance.stages,
            many=True
        ).data
        return response

    def validate(self, data):
        return data


class BaseTournamentShortSerializer(BulkSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = BaseTournament
        list_serializer_class = BulkListSerializer
        fields = (
            'id',
            'title',
        )

    def validate(self, data):
        return data


class TournamentSerializer(BulkSerializerMixin, serializers.ModelSerializer):
    base_tournament = BaseTournamentShortSerializer()
    # teams = serializers.SerializerMethodField()

    class Meta:
        model = Tournament
        list_serializer_class = BulkListSerializer
        fields = (
            'id',
            'base_tournament',
            'title',
            'logo',
            'active',
            'tournament_participant',
            'tournament_stage_coef',
            'tournament_rules',
            # 'teams',
        )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['tournament_participant'] = ParticipantSerializer(
            instance.tournament_participant,
            many=True
        ).data
        response['tournament_stage_coef'] = StageCoefficientSerializer(
            instance.tournament_stage_coef,
            many=True
        ).data
        response['tournament_rules'] = RuleSerializer(
            instance.tournament_rules,
            many=True
        ).data
        return response

    # def get_teams(self, obj):
    #     qs = Match.objects.filter(
    #         base_tournament=obj.base_tournament.id,
    #     ).values(
    #         'team_home__id',
    #     ).distinct()
    #     return [TeamSerializer(
    #         Team.objects.get(id=q['team_home__id'])
    #     ).data for q in qs]

    def validate(self, data):
        return data


class TournamentShortSerializer(BulkSerializerMixin, serializers.ModelSerializer):
    base_tournament = BaseTournamentShortSerializer()
    participants = serializers.SerializerMethodField()

    class Meta:
        model = Tournament
        list_serializer_class = BulkListSerializer
        fields = (
            'id',
            'base_tournament',
            'title',
            'logo',
            'active',
            'participants',
        )

    def get_participants(self, obj):
        qs = Participant.objects.filter(
            tournament=obj.id,
            active=True,
        ).values('id').count()
        return qs

    def validate(self, data):
        return data


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = (
            'id',
            'title',
            'abbreviation',
            'flag',
            'active',
        )

    def validate(self, data):
        return data


class CountryShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = (
            'id',
            'title',
            'abbreviation',
        )

    def validate(self, data):
        return data


class TeamSerializer(serializers.ModelSerializer):
    country = CountrySerializer()

    class Meta:
        model = Team
        fields = (
            'id',
            'team_type',
            'country',
            'title',
            'town',
            'short_title',
            'abbreviation',
            'badge',
            'active',
        )

    def validate(self, data):
        return data


class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = (
            'id',
            'stage_type',
            'base_tournament',
            'title',
            'ordering',
        )

    def validate(self, data):
        return data


class StageShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = (
            'id',
            'stage_type',
            'title',
            'ordering',
        )

    def validate(self, data):
        return data


class ResultSerializer(BulkSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = Result
        list_serializer_class = BulkListSerializer
        fields = (
            'id',
            'result_type',
            'score_home',
            'score_away',
        )

    def validate(self, data):
        return data


class MatchSerializer(serializers.ModelSerializer):
    team_home = TeamSerializer()
    team_away = TeamSerializer()
    stage = StageSerializer()
    forecasts = serializers.SerializerMethodField()

    class Meta:
        model = Match
        fields = (
            'id',
            'base_tournament',
            'stage',
            'team_home',
            'team_away',
            'start_date',
            'place',
            'status',
            'match_result',
            'forecasts',
        )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['match_result'] = ResultSerializer(
            instance.match_result,
            many=True
        ).data
        return response

    def get_forecasts(self, obj):
        match_time = obj.start_date.replace(tzinfo=None)
        now_time = timezone.now().replace(tzinfo=None)
        
        if (match_time - now_time).total_seconds() / (60*60) > 1:
            return []
        else:
            frcsts = Forecast.objects.filter(
                match=obj.id,
                forecast_type='full time',
            )
            return [ForecastSerializer(f).data for f in frcsts]

    def validate(self, data):
        return data


class ParticipantSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    score = serializers.SerializerMethodField()

    class Meta:
        model = Participant
        fields = (
            'id',
            'user',
            'admin',
            'active',
            'score',
        )

    def get_score(self, obj):
        #calculate score for all tournaments
        scores = []
        qs = Match.objects.filter(
            match_forecast__tournament=obj.tournament.id,
            match_forecast__forecast_type='full time',
            base_tournament=obj.tournament.base_tournament,
            match_forecast__user=obj.user,
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

        qs_rules = Rule.objects.filter(
            active=True,
            tournament=obj.tournament.id,
        ).values('rule_type', 'points',)
        rules = {q['rule_type']: q['points'] for q in qs_rules}

        qs_coefficients = StageCoefficient.objects.filter(
            active=True,
            tournament=obj.tournament.id,
        ).values('stage', 'coefficient')
        coefficients = {q['stage']: q['coefficient'] for q in qs_coefficients}
        
        points = 0.
        exact_result = 0
        goals_difference = 0
        match_result = 0
        for q in qs:
            if (q['match_forecast__score_home'] == q['match_result__score_home']) and (q['match_forecast__score_away'] == q['match_result__score_away']):
                points = points + (rules['exact result'] if 'exact result' in rules else 1.) * (coefficients[q['stage']] if q['stage'] in coefficients else 1.)
                exact_result = exact_result + 1
            elif (q['match_forecast__score_home'] - q['match_forecast__score_away']) == (q['match_result__score_home'] - q['match_result__score_away']) and (q['match_result__score_home'] != q['match_result__score_away']) and (sign(q['match_forecast__score_home']) == sign(q['match_result__score_home'])):
                points = points + (rules['goals difference'] if 'goals difference' in rules else 1.) * (coefficients[q['stage']] if q['stage'] in coefficients else 1.)
                goals_difference = goals_difference + 1
            elif sign(q['match_forecast__score_home'] - q['match_forecast__score_away']) == sign(q['match_result__score_home'] - q['match_result__score_away']):
                points = points + (rules['match result'] if 'match result' in rules else 1.) * (coefficients[q['stage']] if q['stage'] in coefficients else 1.)
                match_result = match_result + 1
            elif (q['match_result__score_home'] == q['match_result__score_away']) and (q['match_forecast__score_home'] == q['match_forecast__score_away']) and (q['match_result__score_home'] != q['match_forecast__score_home']):
                points = points + (rules['match result'] if 'match result' in rules else 1.) * (coefficients[q['stage']] if q['stage'] in coefficients else 1.)
                match_result = match_result + 1
            else:
                points = points + 0.

        scores = {
            'points': points,
            'exact_result': exact_result,
            'goals_difference': goals_difference,
            'match_result': match_result,
        }

        return scores

    def validate(self, data):
        return data


class ParticipantShortSerializer(serializers.ModelSerializer):

    class Meta:
        model = Participant
        fields = (
            'id',
            'user',
            'tournament',
            'admin',
            'active',
        )

    def validate(self, data):
        return data


class ForecastSerializer(BulkSerializerMixin, serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Forecast
        list_serializer_class = BulkListSerializer
        fields = (
            'id',
            'user',
            'tournament',
            'forecast_type',
            'match',
            'score_home',
            'score_away',
        )

    def validate(self, data):
        return data


class ForecastShortSerializer(BulkSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = Forecast
        list_serializer_class = BulkListSerializer
        fields = (
            'id',
            'forecast_type',
            'score_home',
            'score_away',
        )

    def validate(self, data):
        return data
