from django.urls import path

from .views import (
    SubjectListAPIView,
    SubjectDetailAPIView
)


app_name = 'courses'

urlpatterns = [
    path('subjects/', SubjectListAPIView.as_view(), name="subjects-list"),
    path('subject/<slug:slug>/',
         SubjectDetailAPIView.as_view(), name="subject-detail"),
]
