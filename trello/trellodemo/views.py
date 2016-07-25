from django.shortcuts import render, get_object_or_404,redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

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
            board_data.save()

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
        data.append({"id": card.id, "card_text":card.card_text, "created_by":card.created_by})

    return HttpResponse(json.dumps(data))


@login_required
def messages(request, card_id):

    card = get_object_or_404(Card, pk=card_id)
    if request.method == 'POST':
        print(request.POST['message_text'])
        title = request.POST['message_text']
        message_data = Message(title = title, card = card, created_by = request.user.username)
        message_data.save() 
    message_list = Message.objects.filter(card=card)

    data = []

    for message in message_list:
        data.append({"id": message.id, "message_title":message.title, "created_by":message.created_by})

    return HttpResponse(json.dumps(data))    


def logout_view(request):
    logout(request)
    return redirect('trellodemo/room.html')

