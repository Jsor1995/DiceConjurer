# Generated by Django 3.2.5 on 2021-11-30 01:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CONJURE', '0002_auto_20211130_0123'),
    ]

    operations = [
        migrations.AddField(
            model_name='animallist',
            name='animal',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
