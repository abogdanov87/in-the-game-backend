from django.utils.translation import activate
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
    BaseTournamentShortSerializer,
    ParticipantStatSerializer,
    TournamentSerializer,
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
    TournamentFilter,
)
from common.api.v1.filters import (
    UserFilter,
)


class TournamentRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk, format=None):
        return Response(TournamentSerializer(
            self.get_queryset().get(pk=pk),
            context={'user': request.user},
        ).data)


class TournamentListAPIView(generics.ListAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentShortSerializer
    filterset_class = TournamentFilter
    permission_classes = [permissions.AllowAny]


class BaseTournamentListAPIView(generics.ListAPIView):
    queryset = BaseTournament.objects.filter(active=True)
    serializer_class = BaseTournamentSerializer
    permission_classes = [permissions.AllowAny]


class MyTournamentListAPIView(generics.ListAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentShortSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        serializer = self.serializer_class
        if request.user.id:
            return Response([
                serializer(q).data for q in Tournament.objects.filter(
                    tournament_participant__user=request.user.id,
                    tournament_participant__active=True
                )
            ])
        else:
            return Response([])


class TournamentCreateAPIView(generics.CreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentShortSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        try:
            base_tournament = BaseTournament.objects.get(pk=request.data['data']['baseTournament']['id'])

            new_tournament = Tournament(
                title=request.data['data']['title'],
                base_tournament=base_tournament,
                code=request.data['data']['code'],
                open=False,
                active=True
            )
            new_tournament.save()

            new_participant = Participant(
                tournament=new_tournament,
                user=request.user,
                active=True,
                admin=True
            )
            new_participant.save()

            new_rules = []
            rule = Rule(
                rule_type='wrong forecast',
                tournament=new_tournament,
                points=request.data['score']['wrongForecast'],
                active=True
            )
            rule.save()
            new_rules.append(RuleSerializer(rule).data)
            rule = Rule(
                rule_type='match result',
                tournament=new_tournament,
                points=request.data['score']['matchResult'],
                active=True
            )
            rule.save()
            new_rules.append(RuleSerializer(rule).data)
            rule = Rule(
                rule_type='goals difference',
                tournament=new_tournament,
                points=request.data['score']['goalsDifference'],
                active=True
            )
            rule.save()
            new_rules.append(RuleSerializer(rule).data)
            rule = Rule(
                rule_type='exact result',
                tournament=new_tournament,
                points=request.data['score']['exactResult'],
                active=True
            )
            rule.save()
            new_rules.append(RuleSerializer(rule).data)

            new_stages = []
            for s in request.data['coefficients']:
                stage = Stage.objects.get(pk=s['id'])
                new_stage = StageCoefficient(
                    tournament=new_tournament,
                    stage=stage,
                    coefficient=(s['coefficient'] if 'coefficient' in s else 1),
                    active=True
                )
                new_stage.save()
                new_stages.append(StageCoefficient(new_stage).data)
            
            return Response({
                'tournament': TournamentSerializer(new_tournament).data,
                'participant': ParticipantSerializer(new_participant).data,
                'rules': new_rules,
                'stages': new_stages
            }, status=status.HTTP_201_CREATED) 
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


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
    permission_classes = [permissions.IsAuthenticated]

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


class ParticipantJoinUpdateAPIView(generics.UpdateAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantShortSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk, format=None):
        try:
            tournament = Tournament.objects.get(pk=pk)
            if tournament.open:
                q = Participant.objects.filter(
                    user=request.user,
                    tournament=tournament,
                )
                obj = None
                if q.count() > 0:
                    obj = q.first()
                    obj.active = True
                    obj.save()
                else:
                    obj = Participant(
                        user=request.user,
                        tournament=tournament,
                        admin=False,
                        active=True,
                    )
                    obj.save()
                return Response(data=ParticipantShortSerializer(obj).data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ParticipantQuitUpdateAPIView(generics.UpdateAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantShortSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk, format=None):
        try:
            tournament = Tournament.objects.get(pk=pk)
            obj = Participant.objects.get(
                user=request.user,
                tournament=tournament,
            )
            obj.active = False
            obj.save()
            return Response(data=ParticipantShortSerializer(obj).data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
