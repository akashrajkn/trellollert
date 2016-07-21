from django.db import models
from django.forms import ModelForm

class Board(models.Model):
	boardname = models.CharField(max_length=255)
	
	def __str__(self):
		return self.boardname

class BoardForm(ModelForm):
	class Meta:
		model = Board
		fields = '__all__'


class Card(models.Model):
	board = models.ForeignKey(Board, on_delete=models.CASCADE)
	card_text = models.CharField(max_length=255)
	created_by = models.CharField(max_length=255)
	created_time = models.DateTimeField('Time of Creation')
	last_modified = models.DateTimeField('Last Modified')

	def __str__(self):
		return self.card_text

class List(models.Model):
	card = models.ForeignKey(Card, on_delete=models.CASCADE)
	title = models.CharField(max_length=255)
	description = models.CharField(max_length=1000)
	created_by = models.CharField(max_length=255)
	created_time = models.DateTimeField('Time of Creation')
	last_modified = models.DateTimeField('Last Modified')

	def __str__(self):
		return self.title