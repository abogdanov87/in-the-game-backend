# Generated by Django 2.2.6 on 2021-06-23 08:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tournaments', '0007_auto_20210619_0443'),
    ]

    operations = [
        migrations.AddField(
            model_name='basetournament',
            name='winner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='tournaments.Team', verbose_name='Победитель'),
        ),
        migrations.AlterField(
            model_name='rule',
            name='rule_type',
            field=models.CharField(choices=[('exact result', 'Точный результат матча'), ('goals difference', 'Разница голов (кроме ничейного исхода)'), ('match result', 'Исход матча (в том числе ничейный исход)'), ('winner', 'Победитель турнира')], default='match result', max_length=32, verbose_name='Правило'),
        ),
        migrations.CreateModel(
            name='ForecastWinner',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='tournaments.Team', verbose_name='Команда')),
                ('tournament', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='tournament_forecast_winner', to='tournaments.Tournament', verbose_name='Турнир')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Прогноз на победителя',
                'verbose_name_plural': 'Прогнозы на победителя',
                'db_table': 'forecast_winner',
                'unique_together': {('tournament', 'team', 'user')},
            },
        ),
    ]
