# Generated by Django 3.2.6 on 2021-08-27 05:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0010_alter_event_event_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='event_date',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Date & Time...'),
        ),
    ]
