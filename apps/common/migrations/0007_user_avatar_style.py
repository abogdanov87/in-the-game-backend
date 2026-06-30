from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0006_user_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='avatar_color',
            field=models.CharField(blank=True, default='#c4f135', max_length=9, verbose_name='Цвет аватара'),
        ),
        migrations.AddField(
            model_name='user',
            name='avatar_emoji',
            field=models.CharField(blank=True, default='', max_length=16, verbose_name='Эмодзи аватара'),
        ),
        migrations.AddField(
            model_name='user',
            name='avatar_type',
            field=models.CharField(
                blank=True,
                choices=[('color', 'Цвет'), ('emoji', 'Эмодзи'), ('photo', 'Фото')],
                default='color',
                max_length=10,
                verbose_name='Тип аватара',
            ),
        ),
    ]
