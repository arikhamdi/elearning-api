# Generated by Django 3.1.8 on 2021-05-02 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20210320_2054'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='subscribed',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]