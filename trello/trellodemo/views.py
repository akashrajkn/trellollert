from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

import json

from .models import Board, BoardForm

@login_required
def index(request):
    return render(request, 'trellodemo/room.html', {})

@login_required
def board(request, board_id):
    board = get_object_or_404(Board, pk=board_id)
    return render(request, 'trellodemo/board.html', {'board':board})

def room(request):
    if request.method =='POST':
        board_data = BoardForm(request.POST)
        if board_data.is_valid():
            new_board_data = board_data.save()

    data = []
    board_list = Board.objects.all()

    for board in board_list:
        data.append({"id": board.id, "boardname":board.boardname})

    return HttpResponse(json.dumps(data))

