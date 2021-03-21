from django.urls import path

from .views import (
    SubjectListAPIView,
    CoursesListAPIView,
    CourseListBySubjectAPIView,
    CourseDetailAPIView,
    enroll_student
)


app_name = 'courses'

urlpatterns = [
    path('<slug:course_slug>/enroll/',
         enroll_student, name="course-enroll"),

    # public interface
    path('subjects/', SubjectListAPIView.as_view(), name="subjects-list"),
    path('subject/<slug:subject_slug>/', CourseListBySubjectAPIView.as_view(),
         name="courses-by-subject"),

    path('<slug:course_slug>/', CourseDetailAPIView.as_view(), name="course-detail"),
    path('', CoursesListAPIView.as_view(), name="courses-list"),
]
