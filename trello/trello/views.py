from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404,redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

from django.contrib.auth import logout, login, authenticate

import json

import trellodemo


def index(request):

    if request.user.is_authenticated():
        return HttpResponseRedirect('/trello/')

    username = password = ''
    if request.POST:
        username = request.POST.get('username')
        password = request.POST.get('password')

        print(username)
        print(password)

        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponse(json.dumps([{}]))

        return HttpResponse(json.dumps([{}]))

    return render(request, 'registration/login.html', {})

