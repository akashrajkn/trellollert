import json

from django.shortcuts import render
from django.http import HttpResponse

from .models import Comment,CommentForm

def index(request):
    return render(request, 'reactwithdjango/reacttest.html', {})


def comments(request):
    if request.method =='POST':
        comment_data = CommentForm(request.POST)
        if comment_data.is_valid():
            new_comment_data = comment_data.save()

    data = []
    comment_list = Comment.objects.all()

    for comment in comment_list:
        data.append({"id": comment.id, "author":comment.author, "text":comment.text})

    return HttpResponse(json.dumps(data))
