# Generated by Django 2.2.6 on 2022-11-25 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0005_user_nickname'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='description',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Описание'),
        ),
    ]
