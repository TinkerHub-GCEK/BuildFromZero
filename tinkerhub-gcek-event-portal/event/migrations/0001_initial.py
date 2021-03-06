# Generated by Django 3.2.6 on 2021-08-24 10:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120, verbose_name='Event Name')),
                ('venue', models.CharField(max_length=120, verbose_name='Venue Name')),
                ('event_date', models.DateTimeField(verbose_name='Event Date')),
                ('description', models.TextField(blank=True)),
            ],
        ),
    ]
