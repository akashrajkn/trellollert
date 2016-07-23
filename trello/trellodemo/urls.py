from django.conf.urls import url

from . import views

app_name = 'trellodemo'
urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^room/$', views.room, name='room'),
	url(r'^(?P<board_id>[0-9]+)/$', views.board, name='board'),
	url(r'^cards/(?P<board_id>[0-9]+)/$', views.cards, name = 'cards'),
	url(r'^logout/$', views.logout_view, name='logout_view'),
]