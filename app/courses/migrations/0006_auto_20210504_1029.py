# Generated by Django 3.1.8 on 2021-05-04 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0005_auto_20210501_2343'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='publish',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
