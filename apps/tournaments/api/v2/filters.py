from django_filters import rest_framework as filters
from django.db.models import Q, CharField
from django.db.models.functions import Lower
from datetime import datetime
from tournaments.models import (
    Participant, 
    Match,
    Tournament,
)


CharField.register_lookup(Lower)


class ParticipantFilter(filters.FilterSet):

    class Meta:
        model = Participant
        fields = ('active', 'tournament',)


class MatchFilter(filters.FilterSet):

    class Meta:
        model = Match
        fields = ('base_tournament',)


class TournamentFilter(filters.FilterSet):
    title = filters.CharFilter(field_name='title', method='filter_title')

    class Meta:
        model = Tournament
        fields = ('title',)

    def filter_title(self, queryset, title, value):
        user = self.request.user.id
        qs = queryset.filter(
            (Q(title__icontains=value) | Q(code__contains=value)),
            open=True
        )
        if user:
            qs = qs.exclude(tournament_participant__user=user)
        return qs.order_by('title')[:10]
