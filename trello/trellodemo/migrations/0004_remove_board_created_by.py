# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-21 10:04
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trellodemo', '0003_board_created_by'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='board',
            name='created_by',
        ),
    ]
