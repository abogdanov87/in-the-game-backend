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
        api_v2_views.TournamentRetrieveAPIView.as_view(),
        name='retrieve_and_update',
    ),
    url(
        r'^api/v2/tournament/(?P<pk>\d+)/update/$',
        api_v2_views.TournamentUpdateAPIView.as_view(),
        name='update logo',
    ),
    url(
        r'^api/v2/tournaments/$',
        api_v2_views.TournamentListAPIView.as_view(),
        name='list',
    ),
    url(
        r'^api/v2/tournaments/my/$',
        api_v2_views.MyTournamentListAPIView.as_view(),
        name='list',
    ),
    url(
        r'^api/v2/tournament/create/$',
        api_v2_views.TournamentCreateAPIView.as_view(),
        name='create',
    ),
    url(
        r'^api/v2/base-tournaments/$',
        api_v2_views.BaseTournamentListAPIView.as_view(),
        name='list',
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
        r'^api/v2/forecasts/$',
        api_v2_views.ForecastListCreateAPIView.as_view(),
        name='create',
    ),
    url(
        r'^api/v2/participant/(?P<pk>\d+)/$',
        api_v2_views.ParticipantRetrieveAPIView.as_view(),
        name='retrieve',
    ),
    url(
        r'^api/v2/tournament/(?P<pk>\d+)/join/$',
        api_v2_views.ParticipantJoinUpdateAPIView.as_view(),
        name='join',
    ),
    url(
        r'^api/v2/tournament/(?P<pk>\d+)/quit/$',
        api_v2_views.ParticipantQuitUpdateAPIView.as_view(),
        name='quit',
    ),
    url(
        r'^api/v2/tournament/code-check/$',
        api_v2_views.TournamentCodeListAPIView.as_view(),
        name='check',
    ),
    url(
        r'^api/v2/participants/$',
        api_v2_views.ParticipantListCreateUpdateAPIView.as_view(),
        name='edit participants',
    ),
]
