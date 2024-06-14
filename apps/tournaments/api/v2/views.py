from rest_framework import generics, permissions, status
from rest_framework_bulk import ListBulkCreateUpdateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
import glob, os
from django.conf import settings
import copy
import random
from django.db.models.functions import Lower
from django.utils import timezone
import datetime
from django.contrib.auth import login, authenticate

from transliterate import translit


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
from common.models import (
    User,
)
from .serializers import (
    BaseTournamentSerializer,
    ParticipantStatSerializer,
    TournamentSerializer,
    TournamentTableSerializer,
    TournamentShortSerializer,
    CountrySerializer,
    TeamSerializer,
    MatchSerializer,
    MatchScoreSerializer,
    StageSerializer,
    ParticipantSerializer,
    ParticipantShortSerializer,
    ResultSerializer,
    ForecastSerializer,
    ForecastShortSerializer,
    RuleSerializer,
    StageCoefficientSerializer,
)
from common.api.v1.serializers import (
    UserSerializer,
)
from .filters import (
    ParticipantFilter,
    MatchFilter,
)
from common.api.v1.filters import (
    UserFilter,
)


class TournamentRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = [permissions.IsAuthenticated]


class TournamentTableRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentTableSerializer
    permission_classes = [permissions.AllowAny]


class TournamentListAPIView(generics.ListAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentShortSerializer
    permission_classes = [permissions.AllowAny]


class TournamentCreateAPIView(generics.CreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentShortSerializer
    permission_classes = [permissions.IsAuthenticated]


class ParticipantListCreateUpdateAPIView(ListBulkCreateUpdateAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantShortSerializer
    filterset_class = ParticipantFilter
    permission_classes = [permissions.IsAuthenticated]


class ParticipantRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantStatSerializer
    permission_classes = [permissions.IsAuthenticated]


class RuleListCreateUpdateAPIView(ListBulkCreateUpdateAPIView):
    queryset = Rule.objects.all()
    serializer_class = RuleSerializer
    permission_classes = [permissions.IsAuthenticated]


class StageCoefficientListCreateUpdateAPIView(ListBulkCreateUpdateAPIView):
    queryset = StageCoefficient.objects.all()
    serializer_class = StageCoefficientSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all().order_by('username')[:5]
    serializer_class = UserSerializer
    filterset_class = UserFilter
    permission_classes = [permissions.IsAuthenticated]


class MatchListAPIView(generics.ListAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    filterset_class = MatchFilter
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        matches = self.get_queryset()
        response = []
        for match in self.get_queryset():
            f = Forecast.objects.filter(
                match=match.id,
                tournament=request.GET['tournament'],
                user=request.user.id,
            ).first()
            response += [{
                'match': MatchSerializer(match).data,
                'forecast': ForecastShortSerializer(f).data,
            }]

        return Response(response)


class MatchRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchScoreSerializer
    permission_classes = [permissions.AllowAny]


class ForecastListCreateAPIView(generics.ListCreateAPIView):
    queryset = Forecast.objects.all()
    serializer_class = ForecastSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        qs = Forecast.objects.filter(
            user=request.user.id,
            tournament=request.GET['tournament'],
        )
        return Response([ForecastShortSerializer(f).data for f in qs], status=status.HTTP_200_OK)

    def post(self, request, format=None):
        try:
            match = Match.objects.get(id=request.data['match'])
            user = request.user
            tournament = Tournament.objects.get(id=request.data['tournament'])
            forecast_type = request.data['forecast_type']
            score_home = request.data['score_home']
            score_away = request.data['score_away']
        except:
            return Response(data={'message': 'invalid data'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            forecast_inst = Forecast(
                forecast_type = forecast_type,
                tournament = tournament,
                user = user,
                match = match,
                score_home = score_home,
                score_away = score_away,
            )
        except:
            return Response(data={'message': 'instance is invalid'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            match_time = match.start_date.replace(tzinfo=None)
            now_time = timezone.now().replace(tzinfo=None)

            if (match_time - now_time).total_seconds() / (60*60) > 1:
                forecast_inst.save()
                return Response(ForecastSerializer(forecast_inst).data, status=status.HTTP_201_CREATED)
            else:
                return Response(data={'message': "cant't save forecast or time's up"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ForecastUpdateAPIView(generics.UpdateAPIView):
    queryset = Forecast.objects.all()
    serializer_class = ForecastSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk, format=None):
        try:
            forecast_inst = Forecast.objects.get(id=pk)
            match = Match.objects.get(id=forecast_inst.match.id)
            forecast_inst.score_home = request.data['score_home']
            forecast_inst.score_away = request.data['score_away']

            match_time = match.start_date.replace(tzinfo=None)
            now_time = timezone.now().replace(tzinfo=None)

            if (match_time - now_time).total_seconds() / (60*60) > 1:
                forecast_inst.save()
                return Response(ForecastSerializer(forecast_inst).data, status=status.HTTP_201_CREATED)
            else:
                return Response(data={'message': "cant't save forecast or time's up"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

class EmptyForecastsRetrieveAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        forecasts_qs = Forecast.objects.filter(
            match=request.GET['match'],
            tournament=request.GET['tournament'],
            forecast_type='full time',
        )
        participants_qs = Participant.objects.filter(
            tournament=request.GET['tournament'],
            active=True,
        ).exclude(user__in=[f.user for f in forecasts_qs])
        message = f""
        for p in participants_qs:
            message = message + f"@{p.user.nickname or p.user.email} "

        return Response(data={message}, status=status.HTTP_200_OK)
