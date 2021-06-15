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
)
from .serializers import (
    BaseTournamentSerializer,
    TournamentSerializer,
    TournamentShortSerializer,
    CountrySerializer,
    TeamSerializer,
    MatchSerializer,
    StageSerializer,
    ParticipantSerializer,
    ResultSerializer,
    ForecastSerializer,
    ForecastShortSerializer,
)
from common.api.v1.serializers import (
    UserSerializer,
)


class TournamentRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = [permissions.AllowAny]


class TournamentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentShortSerializer
    permission_classes = [permissions.AllowAny]


class MatchListAPIView(generics.ListAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [permissions.AllowAny]


class ForecastListCreateAPIView(generics.ListCreateAPIView):
    queryset = Forecast.objects.all()
    serializer_class = ForecastSerializer
    permission_classes = [permissions.AllowAny]

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

            forecast_inst = Forecast(
                forecast_type = request.data['forecast_type'],
                tournament = tournament,
                user = user,
                match = match,
                score_home = request.data['score_home'],
                score_away = request.data['score_away'],
            )

            match_time = match.start_date.replace(tzinfo=None)
            now_time = timezone.now().replace(tzinfo=None)

            if (match_time - now_time).seconds / (60*60) > 1:
                forecast_inst.save()
                return Response(ForecastSerializer(forecast_inst).data, status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ForecastUpdateAPIView(generics.UpdateAPIView):
    queryset = Forecast.objects.all()
    serializer_class = ForecastSerializer
    permission_classes = [permissions.AllowAny]

    def patch(self, request, pk, format=None):
        try:
            forecast_inst = Forecast.objects.get(id=pk)
            match = Match.objects.get(id=forecast_inst.match.id)
            forecast_inst.score_home = request.data['score_home']
            forecast_inst.score_away = request.data['score_away']

            match_time = match.start_date.replace(tzinfo=None)
            now_time = timezone.now().replace(tzinfo=None)

            if (match_time - now_time).seconds / (60*60) > 1:
                forecast_inst.save()
                return Response(ForecastSerializer(forecast_inst).data, status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
