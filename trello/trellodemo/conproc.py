def user(request):
	return {'current_user' : request.user}