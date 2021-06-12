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
    CountrySerializer,
    TeamSerializer,
    MatchSerializer,
    StageSerializer,
    ParticipantSerializer,
    ResultSerializer,
    ForecastSerializer,
)
from common.api.v1.serializers import (
    UserSerializer,
)


class TournamentRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = [permissions.AllowAny]


class MatchListAPIView(generics.ListAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [permissions.AllowAny]


class ForecastListCreateAPIView(generics.ListCreateAPIView):
    queryset = Forecast.objects.all()
    serializer_class = ForecastSerializer
    permission_classes = [permissions.AllowAny]


class ForecastUpdateAPIView(generics.UpdateAPIView):
    queryset = Forecast.objects.all()
    serializer_class = ForecastSerializer
    permission_classes = [permissions.AllowAny]
