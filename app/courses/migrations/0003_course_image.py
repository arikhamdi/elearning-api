# Generated by Django 3.1.7 on 2021-04-09 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0002_course_students'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='image',
            field=models.URLField(default=''),
            preserve_default=False,
        ),
    ]
