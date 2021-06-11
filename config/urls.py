"""mrlapkins URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from django.conf.urls import include
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from catalogs import token
from django.contrib.auth import views as auth_views
from django.views.generic.base import RedirectView, TemplateView
from django.conf import settings
from django.conf.urls.static import static

auth_token_urls = [
    url(
        r'^api/token/$',
        token.UserTokenObtainPairView.as_view(),
        name='token_obtain_pair',
    ),
    url(r'^api/token/refresh/$', TokenRefreshView.as_view(),
        name='token_refresh'),
    url(r'^api/token/verify/$', TokenVerifyView.as_view(),
        name='token_verify'),
]

auth_urls = [
    url(
        r'^admin/json/api-auth/login/$',
        auth_views.LoginView.as_view(template_name='admin/login.html'),
        name='login',
    ),
    url(
        r'^admin/json/api-auth/logout/$',
        auth_views.LogoutView.as_view(),
        name='logout',
    ),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('djrichtextfield/', include('djrichtextfield.urls')),
    path('', include('catalogs.urls', namespace='catalogs')),
    path('', include('common.urls', namespace='common')),
    path('', include('feedbacks.urls', namespace='feedback')),
    path('', include('articles.urls', namespace='article')),
    url(r'^$', TemplateView.as_view(template_name='index.html'), name='index'),
]

urlpatterns += auth_token_urls
urlpatterns += auth_urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)