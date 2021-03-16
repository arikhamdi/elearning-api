from django.urls import path

from .views import SubjectAPIView


app_name = 'courses'

urlpatterns = [
    path('subjects/', SubjectAPIView.as_view(), name="subjects-list"),
]
