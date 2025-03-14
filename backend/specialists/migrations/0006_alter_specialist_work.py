# Generated by Django 5.1.6 on 2025-03-14 13:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0003_alter_category_options_alter_service_options'),
        ('specialists', '0005_remove_specialist_works_specialist_work'),
    ]

    operations = [
        migrations.AlterField(
            model_name='specialist',
            name='work',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='specialists', to='services.work'),
        ),
    ]
