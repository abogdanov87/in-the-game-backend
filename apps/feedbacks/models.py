import os
from django.db import models
from datetime import datetime, timedelta
from django.utils import timezone
from django.conf import settings
from django.apps import apps

from django.utils.translation import gettext_lazy as _


class Feedback(models.Model):
    """
        Отзыв 
    """
    breed = models.ForeignKey(
        'catalogs.Breed',
        on_delete=models.CASCADE,
        blank=False, null=False,
        verbose_name=_('Порода'),
        related_name='feedback',
    )
    title = models.TextField(
        _('Заголовок'),
        max_length=500,
        blank=True, null=True,
    )
    description = models.TextField(
        _('Текст отзыва'),
        max_length=2000,
        blank=False, null=False,
        default='',
    )
    created = models.DateTimeField(
        _('Создан'), 
        default=datetime.now
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        blank=True, null=True,
        verbose_name=_('Пользователь'),
        related_name='feedback',
    )
    allergenicity = models.PositiveIntegerField(
        _('Аллергенность'),
        blank=False, null=False,
        default=3
    )
    molt = models.PositiveIntegerField(
        _('Линька'),
        blank=False, null=False,
        default=3
    )
    intelligence = models.PositiveIntegerField(
        _('Интеллект'),
        blank=False, null=False,
        default=3
    )
    sociability = models.PositiveIntegerField(
        _('Общительность'),
        blank=False, null=False,
        default=3
    )
    need_for_care = models.PositiveIntegerField(
        _('Потребность в уходе'),
        blank=False, null=False,
        default=3
    )
    activity = models.PositiveIntegerField(
        _('Активность'),
        blank=False, null=False,
        default=3
    )
    friendliness = models.PositiveIntegerField(
        _('Дружелюбие'),
        blank=False, null=False,
        default=3
    )
    health = models.PositiveIntegerField(
        _('Здоровье'),
        blank=False, null=False,
        default=3
    )
    active = models.BooleanField(
        _('Статус активности'),
        blank=False, null=False,
        default=True,
    )

    class Meta:
        db_table = 'feedback'
        verbose_name = _('Отзыв')
        verbose_name_plural = _('Отзывы')

    def __str__(self):
        return '{}'.format(self.title)
