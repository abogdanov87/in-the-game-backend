from django.contrib import admin
from django.utils.translation import gettext_lazy as _

# Register your models here.
from .models import (
    Article,
    ArticleBreed,
)


class ArticleBreedInline(admin.TabularInline):
    model = ArticleBreed
    extra = 0


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    model = Article
    fields = [
        'title',
        'alias',
        'body',
        'created',
        'user',
        'source',
        'published',
    ]
    inlines = [
        ArticleBreedInline,
    ]
    list_display = ('title',)
    list_display_links = ('title',)
