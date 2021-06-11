from django.conf.urls import url

from .api.v1 import views as api_v1_views
from . import apps

app_name = apps.BreedConfig.name

urlpatterns = [
    url(
        r'^api/v1/breeds/$',
        api_v1_views.BreedListCreateAPIView.as_view(),
        name='list',
    ),
    url(
        r'^api/v1/breeds/(?P<pk>\d+)/$',
        api_v1_views.BreedRetrieveAPIView.as_view(),
        name='detail',
    ),
]
