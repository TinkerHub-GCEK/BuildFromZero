# Generated by Django 3.2.6 on 2021-08-28 04:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0023_alter_student_semester'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='event_date',
            field=models.CharField(blank=True, max_length=80, null=True, verbose_name='Event Date'),
        ),
    ]
