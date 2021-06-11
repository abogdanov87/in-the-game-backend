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


from feedbacks.models import (
    Feedback, 
)
from .serializers import (
    FeedbackSerializer, 
)
from .filters import (
    FeedbackFilter, 
)


class CustomPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'size'


class FeedbackListCreateAPIView(generics.ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    filterset_class = FeedbackFilter
    permission_classes = [permissions.AllowAny]
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        return Feedback.objects.all().order_by('-created')
