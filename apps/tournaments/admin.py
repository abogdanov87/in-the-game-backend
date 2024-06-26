from django.contrib import admin
from django.utils.translation import gettext_lazy as _

# Register your models here.
from .models import (
    BaseTournament,
    Tournament,
    Country,
    Team,
    Match,
    Stage,
    Participant,
    Result,
    Forecast,
    Rule,
    StageCoefficient,
    ForecastWinner,
)


class ResultInline(admin.TabularInline):
    model = Result
    extra = 0
    max_num = 1


class ParticipantInline(admin.TabularInline):
    model = Participant
    extra = 0


class StageInline(admin.TabularInline):
    model = Stage
    extra = 0


class StageCoefficientInline(admin.TabularInline):
    model = StageCoefficient
    extra = 0


class RuleInline(admin.TabularInline):
    model = Rule
    extra = 0


@admin.register(BaseTournament)
class BaseTournamentAdmin(admin.ModelAdmin):
    model = BaseTournament
    fields = [
        'title',
        'winner',
        'ordering',
        'active',
    ]
    inlines = [
       StageInline,
    ]
    list_display = ('title',)
    list_display_links = ('title',)
    list_filter = ()


@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    model = Tournament
    fields = [
        'base_tournament',
        'title',
        'open',
        'active',
    ]
    inlines = [
       ParticipantInline,
       StageCoefficientInline,
       RuleInline,
    ]
    list_display = ('display_title',)
    list_display_links = ('display_title',)
    list_filter = ()


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    model = Country
    fields = [
        'title',
        'abbreviation',
        'flag',
        'active',
    ]
    inlines = [
       
    ]
    list_display = ('title',)
    list_display_links = ('title',)
    list_filter = ()


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    model = Team
    fields = [
        'team_type',
        'country',
        'title',
        'town',
        'short_title',
        'abbreviation',
        'badge',
        'active',
    ]
    inlines = [
       
    ]
    list_display = ('title',)
    list_display_links = ('title',)
    list_filter = ()
    ordering = ('title',)


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    model = Match
    fields = [
        'base_tournament',
        'stage',
        'team_home',
        'team_away',
        'start_date',
        'place',
        'status',
    ]
    inlines = [
       ResultInline,
    ]
    list_display = ('display_title',)
    list_display_links = ('display_title',)
    list_filter = ('status',)
    ordering = ('start_date',)


@admin.register(Stage)
class StageAdmin(admin.ModelAdmin):
    model = Stage
    fields = [
        'stage_type',
        'base_tournament',
        'title',
        'ordering',
    ]
    inlines = [
       
    ]
    list_display = ('stage_type', 'base_tournament', 'title',)
    list_display_links = ('stage_type', 'base_tournament', 'title',)
    list_filter = ()


@admin.register(Participant)
class ParticipantAdmin(admin.ModelAdmin):
    model = Participant
    fields = [
        'user',
        'tournament',
        'description',
        'checkin',
        'admin',
        'active',
    ]
    inlines = [
       
    ]
    list_display = ('user', 'tournament', 'checkin', 'description',)
    list_display_links = ('user', 'tournament',)
    list_filter = ()


@admin.register(Forecast)
class ForecastAdmin(admin.ModelAdmin):
    model = Forecast
    fields = [
        'user',
        'tournament',
        'forecast_type',
        'match',
        'score_home',
        'score_away',
    ]
    inlines = [
       
    ]
    list_display = ('display_title',)
    list_display_links = ('display_title',)
    list_filter = ('tournament__title', 'user__username', 'match__status', 'match__start_date')
    ordering = ('match__start_date',)


@admin.register(ForecastWinner)
class ForecastWinnerAdmin(admin.ModelAdmin):
    model = ForecastWinner
    fields = [
        'tournament',
        'team',
        'user',
    ]
    inlines = []
    list_display = ('display_title',)
    list_display_links = ('display_title',)
    list_filter = ('tournament', 'user')
