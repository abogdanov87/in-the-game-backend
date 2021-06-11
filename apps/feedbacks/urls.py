from django.conf.urls import url

from .api.v1 import views as api_v1_views
from . import apps

app_name = apps.FeedbackConfig.name

urlpatterns = [
    url(
        r'^api/v1/feedbacks/$',
        api_v1_views.FeedbackListCreateAPIView.as_view(),
        name='list',
    ),
]
