from django.urls import path
# from .views import QuizListView, quiz_view
from .views import DetailquizView, quiz_data_view, save_quiz_view

urlpatterns = [
    path('detail/<int:pk>/', DetailquizView.as_view(), name='detail_quiz'), 
    path('detail/<int:pk>/data/', quiz_data_view, name="detail_quiz_data"),
    path('detail/<int:pk>/save/', save_quiz_view, name="save-view"),
]
