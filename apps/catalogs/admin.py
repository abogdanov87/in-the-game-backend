from django.contrib import admin
from django.utils.translation import gettext_lazy as _

# Register your models here.
from .models import (
    Breed,
    GenderSpec,
    EyeColor,
    CoatColor,
    Gallery,
)


class GenderSpecInline(admin.TabularInline):
    model = GenderSpec
    extra = 2
    max_num = 2


class EyeColorInline(admin.TabularInline):
    model = EyeColor
    extra = 0
    def has_delete_permission(self, request, obj):
        return True


class CoatColorInline(admin.TabularInline):
    model = CoatColor
    extra = 0
    def has_delete_permission(self, request, obj):
        return True


class GalleryInline(admin.TabularInline):
    model = Gallery
    extra = 0
    def has_delete_permission(self, request, obj):
        return True


@admin.register(Breed)
class BreedAdmin(admin.ModelAdmin):
    model = Breed
    fields = [
        'pet_type',
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
        'active',
    ]
    inlines = [
        GenderSpecInline,
        EyeColorInline,
        CoatColorInline,
        GalleryInline,
    ]
    list_display = ('pet_type', 'title',)
    list_display_links = ('pet_type','title')
