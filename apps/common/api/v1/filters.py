from django_filters import rest_framework as filters
from common.models import (
    Param,
)


class ParamFilter(filters.FilterSet):
    class Meta:
        model = Param
        fields = ('active', 'entity')