# Generated by Django 5.1.6 on 2025-03-01 23:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='work',
            name='name',
            field=models.CharField(max_length=256),
        ),
    ]
