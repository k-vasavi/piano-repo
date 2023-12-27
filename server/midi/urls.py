from django.urls import path
from . import views
from .views import FetchView

urlpatterns = [
    path('fetch/', FetchView.as_view()),
]