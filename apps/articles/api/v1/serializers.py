from rest_framework import serializers
from rest_framework_bulk import BulkListSerializer, BulkSerializerMixin
from articles.models import (
    Article,
)


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = (
            'id',
            'title',
            'alias',
            'body',
            'created',
            'user',
            'breed',
            'source',
            'published',
        )

    def validate(self, data):
        return data
