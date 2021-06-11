import os
from django.db import models
from datetime import datetime, timedelta
from django.utils import timezone
from django.conf import settings
from django.apps import apps
from djrichtextfield.models import RichTextField

from django.utils.translation import gettext_lazy as _


class ArticleBreed(models.Model):
    """
        Статья - Порода
    """
    article = models.ForeignKey(
        'Article',
        to_field='id',
        on_delete=models.PROTECT,
        verbose_name=_('Статья'),
        blank=False, null=False,
        db_column='article_id',
    )
    breed = models.ForeignKey(
        'catalogs.Breed',
        to_field='id',
        on_delete=models.PROTECT,
        verbose_name=_('Порода'),
        blank=False, null=False,
        db_column='breed_id',
    )

    class Meta:
        db_table = 'article_breed'
        verbose_name = _('Статья - Порода')
        verbose_name_plural = _('Статьи - Породы')

    def __str__(self):
        return '{} // {}'.format(self.article.title, self.breed.username)


class Article(models.Model):
    """
        Статья 
    """
    title = models.CharField(
        _('Заголовок'),
        max_length=500,
        blank=False, null=False,
    )
    alias = models.CharField(
        _('Псевдоним'),
        max_length=500,
        blank=False, null=False,
    )
    body = RichTextField(
        _('Текст'),
        blank=False, null=False,
        default='',
    )
    created = models.DateTimeField(
        _('Создана'), 
        default=datetime.now
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        blank=True, null=True,
        verbose_name=_('Пользователь'),
        related_name='article',
    )
    breed = models.ManyToManyField(
        'catalogs.Breed',
        verbose_name=_('Порода'),
        through='ArticleBreed',
        through_fields=['article', 'breed',],
        related_name='article_breed',
    )
    source = models.CharField(
        _('Источник'),
        max_length=1000,
        blank=True, null=True,
    )
    published = models.BooleanField(
        _('Опубликована'),
        blank=False, null=False,
        default=False,
    )

    class Meta:
        db_table = 'article'
        verbose_name = _('Статья')
        verbose_name_plural = _('Статьи')

    def __str__(self):
        return '{}'.format(self.title)
