# Generated by Django 3.1.7 on 2021-03-18 20:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0015_auto_20210318_1454'),
    ]

    operations = [
        migrations.RenameField(
            model_name='file',
            old_name='image',
            new_name='file',
        ),
    ]
