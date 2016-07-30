from django.contrib import admin

from .models import Board, Card, Message


myModels = [Board, Card, Message]


admin.site.register(myModels)