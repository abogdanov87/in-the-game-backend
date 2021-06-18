from django.db.models import Q, CharField
from django.db.models.functions import Lower
from django_filters import rest_framework as filters
from common.models import (
    Param,
    User,
)


CharField.register_lookup(Lower)


class ParamFilter(filters.FilterSet):
    class Meta:
        model = Param
        fields = ('active', 'entity')


class UserFilter(filters.FilterSet):
    username = filters.CharFilter(field_name='username', method='filter_username')

    class Meta:
        model = User
        fields = ('username',)

    def filter_username(self, queryset, username, value):
        return queryset.filter(Q(username__icontains=value) | Q(email__icontains=value))
