from django.conf.urls import url

from . import views

app_name = 'trellodemo'
urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^room/$', views.room, name='room'),
	url(r'^(?P<board_id>[0-9]+)/$', views.board, name='board'),
	url(r'^cards/(?P<board_id>[0-9]+)/$', views.cards, name = 'cards'),
	url(r'^messages/(?P<card_id>[0-9]+)/$', views.messages, name='messages'),
	url(r'^deleteboard/(?P<board_id>[0-9]+)/$', views.deleteboard, name='deleteboard'),
	url(r'^modifyboard/(?P<board_id>[0-9]+)/(?P<new_boardname>[a-zA-Z]+)/$', views.modifyboard, name='modifyboard'),
	url(r'^logout/$', views.logout_view, name='logout_view'),
]