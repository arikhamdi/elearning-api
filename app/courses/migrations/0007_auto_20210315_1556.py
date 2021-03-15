# Generated by Django 3.1.7 on 2021-03-15 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0006_file_image_video'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='image',
            field=models.FileField(max_length=250, upload_to='files'),
        ),
        migrations.AlterField(
            model_name='image',
            name='image',
            field=models.ImageField(max_length=250, upload_to='images'),
        ),
    ]
