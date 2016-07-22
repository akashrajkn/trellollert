from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

import json

from .models import Board, BoardForm, Card, CardForm, Message

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


@login_required
def cards(request, board_id):

    board = get_object_or_404(Board, pk=board_id)
    if request.method == 'POST':
        card_text = request.POST['card_text']
        card_data = Card(card_text = card_text, board = board, created_by = request.user.username)
        card_data.save() 
    cards_list = Card.objects.filter(board=board)

    data = []

    for card in cards_list:
        messages_list = Message.objects.filter(card=card)

        message_data = []
        for message in messages_list:
            message_data.append({"id":message.id, "message_title":message.title})
        data.append({"id": card.id, "card_text":card.card_text, "message_data":message_data})

    return HttpResponse(json.dumps(data))

