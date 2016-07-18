from django.contrib import admin

from .models import Board, Card

class CardsInline(admin.TabularInline):
	model = Card
	extra = 1

class BoardAdmin(admin.ModelAdmin):
	fieldsets = [
		(None, {'fields' : ['board_text']}),
		('Created By', {'fields' : ['created_by']}),
		('Created On', {'fields' : ['created_time']}),
		('Last Modified', {'fields' : ['last_modified']}),		
	]
	inlines = [CardsInline]

	list_display = ('board_text', 'created_by', 'created_time')
	list_filter = ['created_time']
	search_fields = ['created_by']
admin.site.register(Board, BoardAdmin)