# Generated by Django 3.1.9 on 2021-05-04 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0006_auto_20210504_1029'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='course',
            options={'ordering': ('-publish', '-created'), 'verbose_name': 'cours', 'verbose_name_plural': 'cours'},
        ),
        migrations.RenameField(
            model_name='module',
            old_name='description',
            new_name='overview',
        ),
        migrations.AlterField(
            model_name='module',
            name='status',
            field=models.CharField(choices=[('draft', 'Draft'), ('published', 'Published')], default='publish', max_length=10),
        ),
    ]
