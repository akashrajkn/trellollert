# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-20 07:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment_text', models.CharField(max_length=255)),
                ('comment_author', models.CharField(max_length=255)),
            ],
        ),
    ]
