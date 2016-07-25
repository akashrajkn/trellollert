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

	def __str__(self):
		return self.card_text

class CardForm(ModelForm):
	class Meta:
		model = Card
		fields = '__all__'


class Message(models.Model):
	card = models.ForeignKey(Card, on_delete=models.CASCADE)
	title = models.CharField(max_length=255)
	created_by = models.CharField(max_length=255)

	def __str__(self):
		return self.title


class MessageForm(ModelForm):
	class Meta:
		model = Message
		fields = '__all__'


