# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-20 08:53
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reactwithdjango', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='comment_author',
            new_name='author',
        ),
        migrations.RenameField(
            model_name='comment',
            old_name='comment_text',
            new_name='text',
        ),
    ]
