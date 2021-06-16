from django.db import models
from django.contrib.auth.models import AbstractUser
from easy_thumbnails.fields import ThumbnailerImageField
from django.utils import timezone

from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """
        CustomUser
    """

    email = models.EmailField(
        _('Адрес электронной почты'),
        blank=False, null=False,
        unique=True,
    )
    avatar = ThumbnailerImageField(
        _('Аватарка'),
        upload_to ='avatars/',
        blank=True, null=True,
        resize_source=dict(size=(128, 128), sharpen=True),
    )
    password_change_date = models.DateTimeField(
        _('Дата изменения пароля'),
        default=timezone.datetime(year=1970, month=1, day=1),
    )

    class Meta:
        db_table = 'auth_user'
        verbose_name = _('Пользователь')
        verbose_name_plural = _('Пользователи')


class Entity(models.Model):
    """
        Абстрактная сущность для таблиц у которых должны быть дополнительные параметры
    """
    pass


class PeriodHistoricalModel(models.Model):
    """
        Модель расширяющая историю по данным
    """
    start_date = models.DateTimeField(
        _('Дата создания записи'),
        default=timezone.datetime.now,
    ),
    end_date = models.DateTimeField(
        _('Дата закрытия записи'),
        default=timezone.datetime.now,
    ),

    class Meta:
        abstract = True


class Param(models.Model):
    """
        Дополнительный параметр
    """
    VALUE_TYPES = (
        ('text', 'Строка'),
        ('number', 'Число'),
        ('date', 'Дата'),
        ('boolean', 'Булево'),
    )

    code = models.CharField(
        _('Код'),
        max_length=255,
        blank=False, null=False,
        default='',
    )
    name = models.CharField(
        _('Название'),
        max_length=255,
        blank=False, null=False,
        default='',
    )
    value_type = models.CharField(
        _('Формат значения'),
        max_length=10,
        choices=VALUE_TYPES,
        blank=False, null=False,
        default='text',
    )
    value = models.CharField(
        _('Значение'),
        max_length=2000,
        blank=True, null=True,
    )
    entity = models.ForeignKey(
        Entity,
        on_delete=models.PROTECT,
        related_name='params',
        blank=False, null=False,
        verbose_name=_('Сущность'),
    )
    active = models.BooleanField(
        _('Статус активности'),
        blank=False, null=False,
        default=True,
    )

    class Meta:
        db_table = 'param'
        verbose_name = _('Дополнительный параметр')
        verbose_name_plural = _('Дополнительные параметры')

    def __str__(self):
        return '{} ({})'.format(self.name, self.entity.__str__)


class Mail(models.Model):
    """
        Письмо
    """
    email = models.EmailField(
        _('Адрес электронной почты'),
        blank=False, null=False,
    )
    sent_date = models.DateTimeField(
        _('Дата отправки'),
        default=timezone.datetime(year=1970, month=1, day=1),
    )
    code = models.CharField(
        _('Код'),
        max_length=255,
        blank=False, null=False,
        default='',
    )

    class Meta:
        db_table = 'mail'
        verbose_name = _('Письмо')
        verbose_name_plural = _('Письма')

    def __str__(self):
        return '{} ({})'.format(self.email, self.sent_date)