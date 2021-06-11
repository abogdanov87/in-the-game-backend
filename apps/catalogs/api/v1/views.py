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


from catalogs.models import (
    Breed, 
)
from .serializers import (
    BreedSerializer, 
    BreedShortSerializer,
)
from .filters import (
    BreedFilter, 
)


class CustomPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'size'


class BreedListCreateAPIView(generics.ListAPIView):
    queryset = Breed.objects.all()
    serializer_class = BreedShortSerializer
    filterset_class = BreedFilter
    permission_classes = [permissions.AllowAny]
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        return Breed.objects.all().order_by('title')


class BreedRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Breed.objects.all()
    serializer_class = BreedSerializer
    permission_classes = [permissions.AllowAny]
