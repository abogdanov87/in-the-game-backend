from django_filters import rest_framework as filters
from django.db.models import Q, CharField
from django.db.models.functions import Lower
from datetime import datetime
from tournaments.models import (
    Participant, 
)


CharField.register_lookup(Lower)


class ParticipantFilter(filters.FilterSet):

    class Meta:
        model = Participant
        fields = ('active', 'tournament',)
