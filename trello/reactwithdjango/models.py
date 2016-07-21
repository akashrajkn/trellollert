from django.db import models
from django.forms import ModelForm

class Comment(models.Model):
	text = models.CharField(max_length=255)
	author = models.CharField(max_length=255)

	def __str__(self):
		return self.text

class CommentForm(ModelForm):
	class Meta:
		model = Comment
		fields = '__all__'
