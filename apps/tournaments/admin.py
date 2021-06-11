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
)


@admin.register(BaseTournament)
class BaseTournamentAdmin(admin.ModelAdmin):
    model = BaseTournament
    fields = [
        'title',
        'active',
    ]
    inlines = [
       
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
        'logo',
        'active',
    ]
    inlines = [
       
    ]
    list_display = ('title',)
    list_display_links = ('title',)
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
       
    ]
    list_display = ('base_tournament', 'stage', 'team_home', 'team_away',)
    list_display_links = ('base_tournament', 'stage', 'team_home', 'team_away',)
    list_filter = ()


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
        'admin',
        'active',
    ]
    inlines = [
       
    ]
    list_display = ('user', 'tournament',)
    list_display_links = ('user', 'tournament',)
    list_filter = ()
