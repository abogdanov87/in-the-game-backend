from rest_framework import serializers
from rest_framework_bulk import BulkListSerializer, BulkSerializerMixin
from common.models import (
    Param,
    User, 
)


class ParamSerializer(BulkSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = Param
        list_serializer_class = BulkListSerializer
        fields = (
            'id',
            'code',
            'name',
            'value_type',
            'value',
            'entity',
            'active',
        )

    def validate(self, data):
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'nickname',
            'avatar',
        )

    def validate(self, data):
        return data
    

class UserShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username',
            'nickname',
        )

    def validate(self, data):
        return data
                