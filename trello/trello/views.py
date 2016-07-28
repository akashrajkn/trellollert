from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404,redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout


def index(request):
    return HttpResponseRedirect('/trello/')


def user_login(request):
    username = password = ''
    if request.POST:
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('birthdayreminder.views.main')

    return render_to_response('login.html',{'username': username}, context_instance=RequestContext(request))

