from django.contrib import admin
from django.utils.translation import gettext_lazy as _

# Register your models here.
from .models import (
    Feedback,
)


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    model = Feedback
    fields = [
        'breed',
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
    ]
    list_display = ('breed', 'title',)
    list_display_links = ('breed','title')
