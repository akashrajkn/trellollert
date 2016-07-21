from django.conf.urls import url

from . import views

app_name = 'reactwithdjango'
urlpatterns = [
	url(r'^$', views.index, name = 'index'),
	url(r'^comments', views.comments, name = 'comments'),
]