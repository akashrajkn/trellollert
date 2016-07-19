from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

from .models import Board

@login_required
def index(request):
	board_list = Board.objects.all()
	context = {'board_list': board_list}
	return render(request, 'trellodemo/index.html', context)

@login_required
def board(request, board_id):
	board = get_object_or_404(Board, pk=board_id)
	return render(request, 'trellodemo/board.html', {'board':board})
