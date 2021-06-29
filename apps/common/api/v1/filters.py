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
    nickname = filters.CharFilter(field_name='nickname', method='filter_nickname')

    class Meta:
        model = User
        fields = ('nickname',)

    def filter_nickname(self, queryset, nickname, value):
        return queryset.filter(Q(nickname__icontains=value) | Q(username__icontains=value)).order_by('nickname')[:5]
