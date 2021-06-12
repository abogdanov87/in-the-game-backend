from django.conf.urls import url

from .api.v1 import views as api_v1_views
from . import apps

app_name = apps.TournamentConfig.name

urlpatterns = [
    url(
        r'^api/v1/tournament/(?P<pk>\d+)/$',
        api_v1_views.TournamentRetrieveUpdateAPIView.as_view(),
        name='detail',
    ),
    url(
        r'^api/v1/matches/$',
        api_v1_views.MatchListAPIView.as_view(),
        name='detail',
    ),
    url(
        r'^api/v1/forecasts/$',
        api_v1_views.ForecastListCreateAPIView.as_view(),
        name='detail',
    ),
    url(
        r'^api/v1/forecast/(?P<pk>\d+)/$',
        api_v1_views.ForecastUpdateAPIView.as_view(),
        name='detail',
    ),
]
