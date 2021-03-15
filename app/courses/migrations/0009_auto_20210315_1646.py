# Generated by Django 3.1.7 on 2021-03-15 16:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0008_content_order'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='content',
            options={'ordering': ['order']},
        ),
        migrations.AlterModelOptions(
            name='course',
            options={'ordering': ['-created'], 'verbose_name': 'cours', 'verbose_name_plural': 'cours'},
        ),
        migrations.AlterModelOptions(
            name='module',
            options={'ordering': ['order']},
        ),
        migrations.AlterModelOptions(
            name='subject',
            options={'ordering': ['title'], 'verbose_name': 'sujet', 'verbose_name_plural': 'sujets'},
        ),
    ]
