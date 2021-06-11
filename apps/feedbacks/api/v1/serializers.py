from rest_framework import serializers
from rest_framework_bulk import BulkListSerializer, BulkSerializerMixin
from feedbacks.models import (
    Feedback,
)
from catalogs.api.v1.serializers import (
    BreedShortSerializer,
)
from catalogs.models import (
    Breed,
)


class FeedbackSerializer(serializers.ModelSerializer):
    # breed_title = serializers.SerializerMethodField()

    class Meta:
        model = Feedback
        fields = (
            'id',
            'breed',
            # 'breed_title',
            'title',
            'description',
            'created',
            'user',
            'allergenicity',
            'molt',
            'intelligence',
            'sociability',
            'need_for_care',
            'activity',
            'friendliness',
            'health',
            'active',
        )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['breed'] = BreedShortSerializer(
            instance.breed,
            many=False
        ).data
        return response

    def validate(self, data):
        return data
