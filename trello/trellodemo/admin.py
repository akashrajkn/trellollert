from django.contrib import admin

from .models import Board, Card, Message, Member


myModels = [Board, Card, Message, Member]


admin.site.register(myModels)