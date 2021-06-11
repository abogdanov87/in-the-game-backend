from django.conf.urls import url

from .api.v1 import views as api_v1_views
from . import apps

app_name = apps.CommonConfig.name

urlpatterns = [
    url(
        r'^api/v1/me/$',
        api_v1_views.MeAPIView.as_view(),
        name='me',
    ),
    url(
        r'^api/v1/me/(?P<pk>\d+)/$',
        api_v1_views.MeUpdateAPIView.as_view(),
        name='detail',
    ),
    url(
        r'^api/v1/params/$',
        api_v1_views.ParamListCreateAPIView.as_view(),
        name='list',
    ),
    url(
        r'^api/v1/params/(?P<pk>\d+)/$',
        api_v1_views.ParamRetrieveUpdateAPIView.as_view(),
        name='detail',
    ),
    url(
        r'^api/v1/auth/$',
        api_v1_views.AuthAPIView().as_view(),
        name='auth',
    ),
    url(
        r'^api/v1/mail/$',
        api_v1_views.MailAPIView().as_view(),
        name='mail',
    ),
]