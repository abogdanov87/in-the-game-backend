import os
from django.db import models
import datetime
from django.utils import timezone
from django.conf import settings
from easy_thumbnails.fields import ThumbnailerImageField
from django.apps import apps
from simple_history.models import HistoricalRecords
from djrichtextfield.models import RichTextField

from django.utils.translation import gettext_lazy as _


PET_TYPES = (
    ('cat', 'Кошка'),
    ('dog', 'Собака'),
)

RANKS_V1 = (
    (1, 'Очень низкая',),
    (2, 'Низкая',),
    (3, 'Средняя',),
    (4, 'Высокая',),
    (5, 'Очень высокая',),
)

RANKS_V2 = (
    (1, 'Очень низкий',),
    (2, 'Низкий',),
    (3, 'Средний',),
    (4, 'Высокий',),
    (5, 'Очень высокий',),
)

RANKS_V3 = (
    (1, 'Очень плохое'),
    (2, 'Плохое'),
    (3, 'Среднее'),
    (4, 'Хорошее'),
    (5, 'Очень хорошее'),
)

RANKS_V4 = (
    (1, 'Очень низкое',),
    (2, 'Низкое',),
    (3, 'Среднее',),
    (4, 'Высокое',),
    (5, 'Очень высокое',),
)


class Breed(models.Model):
    """
        Порода 
    """
    WCF = (
        (1, 'Длинношёрстные'),
        (2, 'Полудлинношерстные'),
        (3, 'Короткошёрстные'),
        (4, 'Сиамо-Ориентальная короткошёрстные'),
    )

    pet_type = models.CharField(
        _('Вид питомца'),
        max_length=30,
        choices=PET_TYPES,
        blank=False, null=False,
        default='cat'
    )
    code = models.CharField(
        _('Код породы'),
        max_length=10,
        blank=True, null=True,
    )
    wcf = models.PositiveIntegerField(
        _('Группа породы по WCF'),
        choices=WCF,
        blank=False, null=False,
        default=1,
    )
    alias = models.CharField(
        _('Псевдоним (транслит)'),
        max_length=255,
        blank=False, null=False,
        default='alias',
    )
    title = models.CharField(
        _('Название породы'),
        max_length=255,
        blank=False, null=False,
        default='',
    )
    short_description = models.TextField(
        _('Краткое описание'),
        max_length=256,
        blank=False, null=False,
        default='',
    )
    full_description = RichTextField(
        _('Полное описание'),
        max_length=2000,
        blank=False, null=False,
        default='',
    )
    origin = RichTextField(
        _('Происхождение'),
        max_length=2000,
        blank=False, null=False,
        default='',
    )
    character = RichTextField(
        _('Характер и повадки'),
        max_length=2000,
        blank=False, null=False,
        default='',
    )
    image = ThumbnailerImageField(
        _('Изображение'),
        upload_to ='badges/',
        blank=True, null=True,
        resize_source=dict(size=(320, 320), sharpen=True),
    )
    allergenicity = models.PositiveIntegerField(
        _('Аллергенность'),
        choices=RANKS_V1,
        blank=False, null=False,
        default=3
    )
    molt = models.PositiveIntegerField(
        _('Линька'),
        choices=RANKS_V1,
        blank=False, null=False,
        default=3
    )
    intelligence = models.PositiveIntegerField(
        _('Интеллект'),
        choices=RANKS_V2,
        blank=False, null=False,
        default=3
    )
    sociability = models.PositiveIntegerField(
        _('Общительность'),
        choices=RANKS_V1,
        blank=False, null=False,
        default=3
    )
    need_for_care = models.PositiveIntegerField(
        _('Потребность в уходе'),
        choices=RANKS_V1,
        blank=False, null=False,
        default=3
    )
    activity = models.PositiveIntegerField(
        _('Активность'),
        choices=RANKS_V1,
        blank=False, null=False,
        default=3
    )
    friendliness = models.PositiveIntegerField(
        _('Дружелюбие'),
        choices=RANKS_V4,
        blank=False, null=False,
        default=3
    )
    health = models.PositiveIntegerField(
        _('Здоровье'),
        choices=RANKS_V3,
        blank=False, null=False,
        default=3
    )
    active = models.BooleanField(
        _('Статус активности'),
        blank=False, null=False,
        default=True,
    )
    history = HistoricalRecords()

    class Meta:
        db_table = 'breed'
        verbose_name = _('Порода')
        verbose_name_plural = _('Породы')

    def __str__(self):
        return '{}/{}'.format(self.pet_type, self.title)


class GenderSpec(models.Model):
    """
        Гендерные особенности 
    """
    GENDERS = (
        ('m', 'Самец'),
        ('f', 'Самка'),
    )

    breed = models.ForeignKey(
        Breed,
        on_delete=models.CASCADE,
        blank=False, null=False,
        verbose_name=_('Порода'),
        related_name='gender_spec',
    )
    gender = models.CharField(
        _('Пол'),
        max_length=1,
        choices=GENDERS,
        blank=False, null=False,
        default='m',
    )
    body_length_min = models.PositiveIntegerField(
        _('Длина от, см'),
        blank=False, null=False,
        default=30
    )
    body_length_max = models.PositiveIntegerField(
        _('Длина до, см'),
        blank=False, null=False,
        default=50
    )
    body_height_min = models.PositiveIntegerField(
        _('Высота от, см'),
        blank=False, null=False,
        default=10
    )
    body_height_max = models.PositiveIntegerField(
        _('Высота до, см'),
        blank=False, null=False,
        default=30
    )
    body_weight_min = models.PositiveIntegerField(
        _('Вес от, кг'),
        blank=False, null=False,
        default=10
    )
    body_weight_max = models.PositiveIntegerField(
        _('Вес до, кг'),
        blank=False, null=False,
        default=30
    )

    class Meta:
        db_table = 'gender_spec'
        verbose_name = _('Гендерная особенность')
        verbose_name_plural = _('Гендерные особенности')

    def __str__(self):
        return '{}, {}'.format(self.breed, self.gender)


class EyeColor(models.Model):
    """
        Цвет глаз
    """
    COLORS = (
        (61, 'Голубой'),
        (62, 'Оранжевый, желтый, золотистый'),
        (63, 'Разный цвет глаз, разноглазие'),
        (64, 'Зеленый'),
        (65, 'Цвет глаз бурманских кошек'),
        (66, 'Цвет глаз тонкинских кошек'),
        (67, 'Цвет глаз сиамских кошек'),
    )

    breed = models.ForeignKey(
        Breed,
        on_delete=models.CASCADE,
        blank=False, null=False,
        verbose_name=_('Порода'),
        related_name='eye_color',
    )
    color = models.IntegerField(
        _('Цвет'),
        choices=COLORS,
        blank=False, null=False,
        default='grey',
    )

    class Meta:
        db_table = 'eye_color'
        verbose_name = _('Цвет глаз')
        verbose_name_plural = _('Цвета глаз')

    def __str__(self):
        return '{}, {}'.format(self.breed, self.color)


class CoatColor(models.Model):
    """
        Окрас шерсти
    """
    BASE_COLORS = (
        ('n', 'Чёрный'),
        ('n.1', 'Сил'),
        ('n.2', 'Коричневый'),
        ('n.3', 'Дикий'),
        ('n.4', 'Рыжевато-коричневый'),
        ('a', 'Голубой'),
        ('b', 'Шоколадный'),
        ('c', 'Лиловый'),
        ('d', 'Красный'),
        ('e', 'Кремовый'),
        ('f', 'Черный черепаховый'),
        ('g', 'Голубой черепаховый'),
        ('h', 'Шоколадный черепаховый'),
        ('j', 'Лиловый черепаховый'),
        ('o', 'Циннамон, соррель'),
        ('p', 'Фавн'),
        ('q', 'Циннамон черепаховый'),
        ('r', 'Фавн черепаховый'),
        ('w', 'Белый'),
        ('nt', 'Янтарный'),
        ('at', 'Светло-янтарный'),
        ('dt', 'Красный-янтарный'),
        ('et', 'Кремовый-янтарный'),
        ('ft', 'Янтарный черепаховый'),
        ('gt', 'Светло-янтарный черепаховый'),
    )

    SILVER_GOLD = (
        ('s', 'Серебро'),
        ('y', 'Золото'),
    )

    DILUTE_MODIFIER = (
        ('m', 'Модификатор'),
        ('am', 'Карамельный, на голубой основе'),
        ('cm', 'Карамельный, на лиловой основе или серо-коричневый'),
        ('em', 'Абрикосовый, на кремовой основе'),
        ('pm', 'Карамель, на фавн основе'),
        ('gm', 'Карамельный черепаховый, карамельный, на голубой основе черепаховый'),
        ('jm', 'Карамельный, на голубой основе черепаховый или серо-коричневый черепаховый'),
        ('rm', 'Карамель, на фавн основе черепаховый'),
        ('*m', 'Карамель, с неизвестной основой'),
    )

    AMOUNT_OF_WHITE = (
        ('01', 'Ван'),
        ('02', 'Арлекин'),
        ('03', 'Биколор'),
        ('04', 'Миттед'),
        ('05', 'Сноу-шу'),
        ('09', 'Любое другое количество белого'),
    )

    TABBY_PATTERN = (
        ('11', 'Затушеванный'),
        ('12', 'Завуалированный'),
        ('21', 'Табби без определенного рисунка'),
        ('22', 'Мраморный табби'),
        ('23', 'Тигровый табби'),
        ('24', 'Пятнистый табби'),
        ('25', 'Тикированный табби'),
    )

    POINTED_PATTERN = (
        ('31', 'Бурманские отметины'),
        ('32', 'Тонкинские отметины'),
        ('33', 'Сиамские отметины'),
        ('34', 'Сингапурский окрас'),
        ('35', 'Абиссинский окрас'),
    )

    breed = models.ForeignKey(
        Breed,
        on_delete=models.CASCADE,
        blank=False, null=False,
        verbose_name=_('Порода'),
        related_name='coat_color',
    )
    base_color = models.CharField(
        _('Основной цвет'),
        max_length=30,
        choices=BASE_COLORS,
        blank=False, null=False,
        default='n',
    )
    silver_gold = models.CharField(
        _('Серебро/золото'),
        max_length=30,
        choices=SILVER_GOLD,
        blank=True, null=True,
    )
    dilute_modifier = models.CharField(
        _('Модификатор осветления'),
        max_length=30,
        choices=DILUTE_MODIFIER,
        blank=True, null=True,
    )
    amount_of_white = models.CharField(
        _('Количество белого'),
        max_length=30,
        choices=AMOUNT_OF_WHITE,
        blank=True, null=True,
    )
    tabby_pattern = models.CharField(
        _('Табби рисунок'),
        max_length=30,
        choices=TABBY_PATTERN,
        blank=True, null=True,
    )
    pointed_pattern = models.CharField(
        _('Пойнтовые отметины'),
        max_length=30,
        choices=POINTED_PATTERN,
        blank=True, null=True,
    )

    class Meta:
        db_table = 'coat_color'
        verbose_name = _('Окрас шерсти')
        verbose_name_plural = _('Окрасы шерсти')

    def __str__(self):
        return '{}, {}'.format(self.breed, self.base_color)


class Gallery(models.Model):
    """
        Галерея пород животных
    """

    breed = models.ForeignKey(
        Breed,
        on_delete=models.CASCADE,
        blank=False, null=False,
        verbose_name=_('Порода'),
        related_name='gallery',
    )
    label = models.CharField(
        _('Заголовок'),
        max_length=1000,
        blank=True, null=True,
    )
    image = ThumbnailerImageField(
        _('Изображение'),
        upload_to ='gallery/',
        blank=False, null=False,
        resize_source=dict(size=(500, 500), sharpen=True),
    )

    class Meta:
        db_table = 'gallery'
        verbose_name = _('Галерея')
        verbose_name_plural = _('Галерея')

    def __str__(self):
        return '{}, {}'.format(self.breed, self.image)        
