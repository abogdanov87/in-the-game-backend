from django.conf.urls import url

from .api.v1 import views as api_v1_views
from .api.v2 import views as api_v2_views
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

urlpatterns += [
    url(
        r'^api/v2/tournament/(?P<pk>\d+)/$',
        api_v2_views.TournamentRetrieveUpdateAPIView.as_view(),
        name='retrieve_and_update',
    ),
    url(
        r'^api/v2/tournaments/$',
        api_v2_views.TournamentListAPIView.as_view(),
        name='list',
    ),
    url(
        r'^api/v2/tournaments/$',
        api_v2_views.TournamentCreateAPIView.as_view(),
        name='create',
    ),
    url(
        r'^api/v2/users/$',
        api_v2_views.UserListAPIView.as_view(),
        name='list',
    ),
    url(
        r'^api/v2/matches/$',
        api_v2_views.MatchListAPIView.as_view(),
        name='list',
    ),
     url(
        r'^api/v2/match/(?P<pk>\d+)/$',
        api_v2_views.MatchRetrieveAPIView.as_view(),
        name='retrieve',
    ),
    url(
        r'^api/v2/forecast/(?P<pk>\d+)/$',
        api_v2_views.ForecastUpdateAPIView.as_view(),
        name='update',
    ),
    url(
        r'^api/v2/forecasts//$',
        api_v2_views.ForecastListCreateAPIView.as_view(),
        name='create',
    ),
]
