from rest_framework import generics, permissions, status, filters
from rest_framework_bulk import ListBulkCreateUpdateAPIView
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from PIL import Image
import glob, os
from django.conf import settings
from django.db.models import Q, CharField
from django.http import HttpResponse, Http404, JsonResponse


from articles.models import (
    Article, 
)
from .serializers import (
    ArticleSerializer, 
)


class CustomPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'size'


class ArticleListAPIView(generics.ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        return Article.objects.all().order_by('-created')
