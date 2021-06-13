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
)
from common.api.v1.serializers import (
    UserSerializer,
)


def sign(x):
    return 1 if x > 0 else -1 if x < 0 else 0


class BaseTournamentSerializer(BulkSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = BaseTournament
        list_serializer_class = BulkListSerializer
        fields = (
            'id',
            'title',
            'active',
        )

    def validate(self, data):
        return data


class TournamentSerializer(BulkSerializerMixin, serializers.ModelSerializer):
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
        )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['tournament_participant'] = ParticipantSerializer(
            instance.tournament_participant,
            many=True
        ).data
        return response

    def validate(self, data):
        return data


class TeamSerializer(serializers.ModelSerializer):
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
        # import pdb; pdb.set_trace()
        if (match_time - now_time).seconds / (60*60) > 1 and (match_time - now_time).days >= 0:
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
            'tournament',
            'admin',
            'active',
            'score',
        )

    def get_score(self, obj):
        qs = Match.objects.filter(
            match_forecast__forecast_type='full time',
            base_tournament=obj.tournament.base_tournament,
            match_forecast__user=obj.user,
            status='finished',
            match_result__result_type='full time',
        ).values(
            'match_forecast__user',
            'team_home',
            'team_away',
            'match_forecast__score_home',
            'match_forecast__score_away',
            'match_result__score_home',
            'match_result__score_away',
        )
        score = 0
        for q in qs:
            if (q['match_forecast__score_home'] == q['match_result__score_home']) and (q['match_forecast__score_away'] == q['match_result__score_away']):
                score = score + 3
            elif (q['match_forecast__score_home'] - q['match_forecast__score_away']) == (q['match_result__score_home'] - q['match_result__score_away']) and (q['match_result__score_home'] != q['match_result__score_away']) and (sign(q['match_forecast__score_home']) == sign(q['match_result__score_home'])):
                score = score + 2
            elif sign(q['match_forecast__score_home'] - q['match_forecast__score_away']) == sign(q['match_result__score_home'] - q['match_result__score_away']):
                score = score + 1
            elif (q['match_result__score_home'] == q['match_result__score_away']) and (q['match_forecast__score_home'] == q['match_forecast__score_away']) and (q['match_result__score_home'] != q['match_forecast__score_home']):
                score = score + 1
            else:
                score = score + 0

        # import pdb; pdb.set_trace()
        return score

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
