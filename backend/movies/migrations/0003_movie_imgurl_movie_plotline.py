# Generated by Django 4.1.2 on 2022-11-24 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_movie_aggrating_movie_cast_movie_directors_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='imgurl',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.AddField(
            model_name='movie',
            name='plotline',
            field=models.TextField(blank=True, max_length=1000, null=True),
        ),
    ]
