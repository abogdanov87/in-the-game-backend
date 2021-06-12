from rest_framework import serializers
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
        )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['match_result'] = ResultSerializer(
            instance.match_result,
            many=True
        ).data
        return response

    def validate(self, data):
        return data


class ParticipantSerializer(serializers.ModelSerializer):
    user = UserSerializer()

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
