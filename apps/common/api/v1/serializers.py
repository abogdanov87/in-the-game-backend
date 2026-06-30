import re

from rest_framework import serializers
from rest_framework_bulk import BulkListSerializer, BulkSerializerMixin
from common.models import (
    Param,
    User, 
)

HEX_COLOR_RE = re.compile(r'^#[0-9A-Fa-f]{6}$')


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
    clear_avatar = serializers.BooleanField(write_only=True, required=False, default=False)

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'nickname',
            'avatar',
            'avatar_type',
            'avatar_color',
            'avatar_emoji',
            'clear_avatar',
        )
        read_only_fields = (
            'id',
            'username',
            'email',
        )

    def validate_avatar_type(self, value):
        allowed = {choice[0] for choice in User.AVATAR_TYPE_CHOICES}
        if value not in allowed:
            raise serializers.ValidationError('Недопустимый тип аватара.')
        return value

    def validate_avatar_color(self, value):
        if value and not HEX_COLOR_RE.match(value):
            raise serializers.ValidationError('Цвет должен быть в формате #RRGGBB.')
        return value

    def validate(self, data):
        avatar_type = data.get('avatar_type', getattr(self.instance, 'avatar_type', 'color'))
        avatar_emoji = data.get('avatar_emoji', getattr(self.instance, 'avatar_emoji', ''))
        if avatar_type == 'emoji' and not avatar_emoji:
            raise serializers.ValidationError({'avatar_emoji': 'Укажите эмодзи для типа «emoji».'})
        return data

    def update(self, instance, validated_data):
        clear_avatar = validated_data.pop('clear_avatar', False)
        if clear_avatar and instance.avatar:
            instance.avatar.delete(save=False)
            instance.avatar = None
        return super().update(instance, validated_data)


class UserShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'nickname',
            'avatar',
            'avatar_type',
            'avatar_color',
            'avatar_emoji',
        )

    def validate(self, data):
        return data
