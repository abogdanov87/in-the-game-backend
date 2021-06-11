from django_filters import rest_framework as filters
from django.db.models import Q, CharField
from django.db.models.functions import Lower
from datetime import datetime
from catalogs.models import (
    Breed, 
)


CharField.register_lookup(Lower)


class BreedFilter(filters.FilterSet):
    title = filters.CharFilter(field_name='title', method='filter_title')
    wcf = filters.NumberFilter(field_name='wcf', method='filter_wcf')

    class Meta:
        model = Breed
        fields = ('active', 'pet_type', 'title', 'wcf',)

    def filter_title(self, queryset, title, value):
        return queryset.filter(title__icontains=value)

    def filter_wcf(self, queryset, wcf, value):
        return queryset.filter(wcf=value)
