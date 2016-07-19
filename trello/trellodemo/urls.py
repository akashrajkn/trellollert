from django.conf.urls import url

from . import views

app_name = 'trellodemo'
urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^(?P<board_id>[0-9]+)/$', views.board, name='board'),
]