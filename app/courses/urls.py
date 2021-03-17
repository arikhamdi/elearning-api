from django.urls import path

from .views import (
    SubjectListAPIView,
    SubjectDetailAPIView,
    CoursesListAPIView,
    CourseListBySubjectAPIView,
    CourseDetailAPIView
)


app_name = 'courses'

urlpatterns = [
    path('subject/<slug:slug>/',
         SubjectDetailAPIView.as_view(), name="subject-detail"),
    path('subjects/', SubjectListAPIView.as_view(), name="subjects-list"),
    

    path('courses/<slug:slug>/', CourseListBySubjectAPIView.as_view(),
         name="courses-by-subject"),
    path('courses/', CoursesListAPIView.as_view(), name="courses-list"),
    
    path('course/<slug:slug>', CourseDetailAPIView.as_view(), name="course-detail"),
]
