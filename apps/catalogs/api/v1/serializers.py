from rest_framework import serializers
from rest_framework_bulk import BulkListSerializer, BulkSerializerMixin
from catalogs.models import (
    Breed, 
    GenderSpec,
    EyeColor,
    CoatColor,
    Gallery,
)


class GenderSpecSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenderSpec
        fields = (
            'gender',
            'body_length_min',
            'body_length_max',
            'body_height_min',
            'body_height_max',
            'body_weight_min',
            'body_weight_max',
        )

    def validate(self, data):
        return data


class EyeColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = EyeColor
        fields = (
            'color',
        )

    def validate(self, data):
        return data


class CoatColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoatColor
        fields = (
            'base_color',
            'silver_gold',
            'dilute_modifier',
            'amount_of_white',
            'tabby_pattern',
            'pointed_pattern',
        )

    def validate(self, data):
        return data


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = (
            'label',
            'image',
        )

    def validate(self, data):
        return data


class BreedSerializer(serializers.ModelSerializer):
    allergenicity = serializers.SerializerMethodField()
    molt = serializers.SerializerMethodField()
    intelligence = serializers.SerializerMethodField()
    sociability = serializers.SerializerMethodField()
    need_for_care = serializers.SerializerMethodField()
    activity = serializers.SerializerMethodField()
    friendliness = serializers.SerializerMethodField()
    health = serializers.SerializerMethodField()
    pet_type_name = serializers.SerializerMethodField()

    class Meta:
        model = Breed
        fields = (
            'id',
            'pet_type',
            'pet_type_name',
            'code',
            'wcf',
            'alias',
            'title',
            'short_description',
            'full_description',
            'origin',
            'character',
            'image',
            'allergenicity',
            'molt',
            'intelligence',
            'sociability',
            'need_for_care',
            'activity',
            'friendliness',
            'health',
            'gender_spec',
            'active',
        )

    def get_allergenicity(self, obj):
        return {
            'rank': obj.allergenicity,
            'title': obj.get_allergenicity_display(),
        }

    def get_molt(self, obj):
        return {
            'rank': obj.molt,
            'title': obj.get_molt_display(),
        }

    def get_intelligence(self, obj):
        return {
            'rank': obj.intelligence,
            'title': obj.get_intelligence_display(),
        }

    def get_sociability(self, obj):
        return {
            'rank': obj.sociability,
            'title': obj.get_sociability_display(),
        }

    def get_need_for_care(self, obj):
        return {
            'rank': obj.need_for_care,
            'title': obj.get_need_for_care_display(),
        }

    def get_activity(self, obj):
        return {
            'rank': obj.activity,
            'title': obj.get_activity_display(),
        }

    def get_friendliness(self, obj):
        return {
            'rank': obj.friendliness,
            'title': obj.get_friendliness_display(),
        }

    def get_health(self, obj):
        return {
            'rank': obj.health,
            'title': obj.get_health_display(),
        }

    def get_pet_type_name(self, obj):
        return obj.get_pet_type_display()

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['gender_spec'] = GenderSpecSerializer(
            instance.gender_spec,
            many=True
        ).data
        response['eye_color'] = EyeColorSerializer(
            instance.eye_color,
            many=True
        ).data
        response['coat_color'] = CoatColorSerializer(
            instance.coat_color,
            many=True
        ).data
        response['gallery'] = GallerySerializer(
            instance.gallery,
            many=True
        ).data
        return response

    def validate(self, data):
        return data


class BreedShortSerializer(serializers.ModelSerializer):
    allergenicity = serializers.SerializerMethodField()
    molt = serializers.SerializerMethodField()
    intelligence = serializers.SerializerMethodField()
    sociability = serializers.SerializerMethodField()
    need_for_care = serializers.SerializerMethodField()
    activity = serializers.SerializerMethodField()
    friendliness = serializers.SerializerMethodField()
    health = serializers.SerializerMethodField()
    pet_type_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Breed
        fields = (
            'id',
            'pet_type',
            'pet_type_name',
            'code',
            'wcf',
            'alias',
            'title',
            'short_description',
            'image',
            'allergenicity',
            'molt',
            'intelligence',
            'sociability',
            'need_for_care',
            'activity',
            'friendliness',
            'health',
        )

    def get_allergenicity(self, obj):
        return {
            'rank': obj.allergenicity,
            'title': obj.get_allergenicity_display(),
        }

    def get_molt(self, obj):
        return {
            'rank': obj.molt,
            'title': obj.get_molt_display(),
        }

    def get_intelligence(self, obj):
        return {
            'rank': obj.intelligence,
            'title': obj.get_intelligence_display(),
        }

    def get_sociability(self, obj):
        return {
            'rank': obj.sociability,
            'title': obj.get_sociability_display(),
        }

    def get_need_for_care(self, obj):
        return {
            'rank': obj.need_for_care,
            'title': obj.get_need_for_care_display(),
        }

    def get_activity(self, obj):
        return {
            'rank': obj.activity,
            'title': obj.get_activity_display(),
        }

    def get_friendliness(self, obj):
        return {
            'rank': obj.friendliness,
            'title': obj.get_friendliness_display(),
        }

    def get_health(self, obj):
        return {
            'rank': obj.health,
            'title': obj.get_health_display(),
        }

    def get_pet_type_name(self, obj):
        return obj.get_pet_type_display()

    def validate(self, data):
        return data
