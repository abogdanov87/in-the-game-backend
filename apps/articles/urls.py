from django.conf.urls import url

from .api.v1 import views as api_v1_views
from . import apps

app_name = apps.ArticlesConfig.name

urlpatterns = [
    url(
        r'^api/v1/articles/$',
        api_v1_views.ArticleListAPIView.as_view(),
        name='list',
    ),
]
