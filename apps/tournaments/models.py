import os
from django.db import models
from datetime import datetime
from django.utils import timezone
from django.conf import settings
from easy_thumbnails.fields import ThumbnailerImageField
from django.apps import apps

from django.utils.translation import gettext_lazy as _


PET_TYPES = (
    ('cat', 'Кошка'),
    ('dog', 'Собака'),
)


class BaseTournament(models.Model):
    """
        Базовый турнир 
    """
    title = models.CharField(
        _('Название'),
        max_length=255,
        blank=False, null=False,
        default='',
    )
    ordering = models.IntegerField(
        _('Позиция'),
        blank=False, null=False,
        default=1,
    )
    active = models.BooleanField(
        _('Активный'),
        blank=False, null=False,
        default=True,
    )

    class Meta:
        db_table = 'base_tournament'
        verbose_name = _('Базовый турнир')
        verbose_name_plural = _('Базовые турниры')

    def __str__(self):
        return '{}'.format(self.title)


class Tournament(models.Model):
    """
        Турнир 
    """
    base_tournament = models.ForeignKey(
        BaseTournament,
        on_delete=models.PROTECT,
        blank=False, null=False,
        verbose_name=_('Турнир'),
        related_name='tournament_base',
    )
    title = models.CharField(
        _('Название'),
        max_length=255,
        blank=False, null=False,
        default='',
    )
    logo = ThumbnailerImageField(
        _('Логотип'),
        upload_to ='logos/',
        blank=True, null=True,
        resize_source=dict(size=(128, 128), sharpen=True),
    )
    active = models.BooleanField(
        _('Активный'),
        blank=False, null=False,
        default=True,
    )

    class Meta:
        db_table = 'tournament'
        verbose_name = _('Турнир')
        verbose_name_plural = _('Турниры')

    def __str__(self):
        return '{}'.format(self.title)


class Country(models.Model):
    """
        Страна
    """
    title = models.CharField(
        _('Название'),
        max_length=255,
        blank=False, null=False,
        default='',
    )
    abbreviation = models.CharField(
        _('Аббревиатура'),
        max_length=32,
        blank=True, null=True,
    )
    flag = ThumbnailerImageField(
        _('Флаг'),
        upload_to ='flags/',
        blank=True, null=True,
        resize_source=dict(size=(128, 128), sharpen=True),
    )
    active = models.BooleanField(
        _('Активный'),
        blank=False, null=False,
        default=True,
    )

    class Meta:
        db_table = 'country'
        verbose_name = _('Страна')
        verbose_name_plural = _('Страны')

    def __str__(self):
        return '{}'.format(self.title)


class Participant(models.Model):
    """
        Участник
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        blank=False, null=False,
        verbose_name=_('Пользователь'),
        related_name='users_participant',
    )
    tournament = models.ForeignKey(
        Tournament,
        on_delete=models.PROTECT,
        blank=False, null=False,
        verbose_name=_('Турнир'),
        related_name='tournament_participant',
    )
    admin = models.BooleanField(
        _('Админ'),
        blank=False, null=False,
        default=False,
    )
    active = models.BooleanField(
        _('Активный'),
        blank=False, null=False,
        default=True,
    )

    class Meta:
        db_table = 'participant'
        verbose_name = _('Участник')
        verbose_name_plural = _('Участники')

    def __str__(self):
        return '{} / {}'.format(self.tournament.title, self.user.username)


class Stage(models.Model):
    """
        Стадия
    """
    STAGE_TYPES = (
        ('qualification', 'Квалификация'),
        ('group stage', 'Групповая стадия'),
        ('round of 32', '1/16 финала'),
        ('round of 16', '1/8 финала'),
        ('quarterfinal', 'Четвертьфинал'),
        ('semifinal', 'Полуфинал'),
        ('final', 'Финал'),
    )
    stage_type = models.CharField(
        _('Стадия'),
        choices=STAGE_TYPES,
        max_length=32,
        blank=False, null=False,
        default='group stage',
    )
    base_tournament = models.ForeignKey(
        BaseTournament,
        on_delete=models.PROTECT,
        blank=False, null=False,
        verbose_name=_('Турнир'),
        related_name='tournament_stage',
    )
    title = models.CharField(
        _('Название'),
        max_length=255,
        blank=False, null=False,
        default='',
    )
    ordering = models.IntegerField(
        _('Порядок'),
        blank=False, null=False,
        default=1,
    )

    class Meta:
        db_table = 'stage'
        verbose_name = _('Стадия')
        verbose_name_plural = _('Стадии')

    def __str__(self):
        return '{}'.format(self.title)


class Team(models.Model):
    """
        Команда
    """
    TEAM_TYPES = (
        ('club', 'Клуб'),
        ('national', 'Сборная'),
    )
    team_type = models.CharField(
        _('Тип'),
        choices=TEAM_TYPES,
        max_length=32,
        blank=False, null=False,
        default='club',
    )
    country = models.ForeignKey(
        Country,
        on_delete=models.PROTECT,
        blank=False, null=False,
        verbose_name=_('Страна'),
        related_name='country_team',
    )
    title = models.CharField(
        _('Название'),
        max_length=255,
        blank=False, null=False,
        default='',
    )
    town = models.CharField(
        _('Город'),
        max_length=255,
        blank=True, null=True,
    )
    short_title = models.CharField(
        _('Краткое название'),
        max_length=255,
        blank=True, null=True,
    )
    abbreviation = models.CharField(
        _('Аббревиатура'),
        max_length=32,
        blank=True, null=True,
    )
    badge = ThumbnailerImageField(
        _('Эмблема'),
        upload_to ='badges/',
        blank=True, null=True,
        resize_source=dict(size=(128, 128), sharpen=True),
    )
    active = models.BooleanField(
        _('Активный'),
        blank=False, null=False,
        default=True,
    )

    class Meta:
        db_table = 'team'
        verbose_name = _('Команда')
        verbose_name_plural = _('Команды')

    def __str__(self):
        return '{} / {}'.format(self.country.title, self.title)


class Match(models.Model):
    """
        Матч
    """
    STATUSES = (
        ('not started', 'Не начался'),
        ('started', 'Начался'),
        ('finished', 'Завершен'),
        ('canceled', 'Отменен'),
    )
    base_tournament = models.ForeignKey(
        BaseTournament,
        on_delete=models.PROTECT,
        blank=False, null=False,
        verbose_name=_('Турнир'),
        related_name='tournament_match',
    )
    stage = models.ForeignKey(
        Stage,
        on_delete=models.PROTECT,
        blank=False, null=False,
        verbose_name=_('Стадия'),
        related_name='stage_match',
    )
    team_home = models.ForeignKey(
        Team,
        on_delete=models.PROTECT,
        blank=False, null=False,
        verbose_name=_('Команда (дома)'),
        related_name='team_home_match',
    )
    team_away = models.ForeignKey(
        Team,
        on_delete=models.PROTECT,
        blank=False, null=False,
        verbose_name=_('Команда (выезд)'),
        related_name='team_away_match',
    )
    start_date = models.DateTimeField(
        _('Дата'),
        default=timezone.datetime(year=1970, month=1, day=1),
    )
    place = models.CharField(
        _('Место проведения'),
        max_length=128,
        blank=True, null=True,
    )
    status = models.CharField(
        _('Статус'),
        choices=STATUSES,
        max_length=32,
        blank=False, null=False,
        default='not started',
    )

    class Meta:
        db_table = 'match'
        verbose_name = _('Матч')
        verbose_name_plural = _('Матчи')

    def __str__(self):
        return '{} / {} / {} - {}'.format(
            self.base_tournament.title, 
            self.start_date,
            self.team_home.title,
            self.team_away.title,
        )


class Result(models.Model):
    """
        Результат
    """
    RESULT_TYPES = (
        ('full time', 'Игра'),
        ('first half', 'Первый тайм'),
        ('second half', 'Второй тайм'),
    )
    result_type = models.CharField(
        _('Тип'),
        choices=RESULT_TYPES,
        max_length=32,
        blank=False, null=False,
        default='full time',
    )
    match = models.ForeignKey(
        Match,
        on_delete=models.PROTECT,
        blank=False, null=False,
        verbose_name=_('Матч'),
        related_name='match_result',
    )
    score_home = models.IntegerField(
        _('Домашняя команда'),
        blank=False, null=False,
        default=0,
    )
    score_away = models.IntegerField(
        _('Выездная команда'),
        blank=False, null=False,
        default=0,
    )

    class Meta:
        db_table = 'result'
        verbose_name = _('Результат')
        verbose_name_plural = _('Результаты')


class Forecast(models.Model):
    """
        Прогноз
    """
    RESULT_TYPES = (
        ('full time', 'Игра'),
        ('first half', 'Первый тайм'),
        ('second half', 'Второй тайм'),
    )
    forecast_type = models.CharField(
        _('Тип'),
        choices=RESULT_TYPES,
        max_length=32,
        blank=False, null=False,
        default='full time',
    )
    match = models.ForeignKey(
        Match,
        on_delete=models.PROTECT,
        blank=False, null=False,
        verbose_name=_('Матч'),
        related_name='match_forecast',
    )
    tournament = models.ForeignKey(
        Tournament,
        on_delete=models.PROTECT,
        blank=False, null=False,
        verbose_name=_('Турнир'),
        related_name='tournament_forecast',
    )
    score_home = models.IntegerField(
        _('Домашняя команда'),
        blank=False, null=False,
        default=0,
    )
    score_away = models.IntegerField(
        _('Выездная команда'),
        blank=False, null=False,
        default=0,
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        blank=False, null=False,
        verbose_name=_('Пользователь'),
        related_name='user_forecast',
    )

    class Meta:
        db_table = 'forecast'
        verbose_name = _('Прогноз')
        verbose_name_plural = _('Прогнозы')
