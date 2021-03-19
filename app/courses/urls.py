from django.urls import path

from .views import (
    SubjectListAPIView,
    CoursesListAPIView,
    CourseListBySubjectAPIView,
    CourseDetailAPIView,
    modules_list,
    module_detail,
    content_list_by_module,
    content_detail,
    courses_list,
    course_detail

)


app_name = 'courses'

urlpatterns = [
    # teacher interface

    # Courses
    path('teacher/', courses_list,
         name='teacher-dashboard'),
    path('teacher/dashboard/', courses_list,
         name='teacher-dashboard'),

    path('teacher/<slug:course_slug>/',
         course_detail, name="courses-detail"),

    # Modules
    path('teacher/<slug:course_slug>/modules/',
         modules_list, name='modules-list'),
    path('teacher/module/<int:module_id>/',
         module_detail, name="module-detail"),


    # Contents
    path('teacher/module/<int:module_id>/content/',
         content_list_by_module,
         name='module-content-list'),
    path('teacher/<int:module_id>/<model_name>/',
         content_list_by_module,
         name='module-content-create'),
    path('teacher/content/<int:pk>',
         content_detail,
         name='module_content_update'),


    # public interface
    path('subjects/', SubjectListAPIView.as_view(), name="subjects-list"),

    path('courses/<slug:slug>/', CourseListBySubjectAPIView.as_view(),
         name="courses-by-subject"),
    path('courses/', CoursesListAPIView.as_view(), name="courses-list"),

    path('course/<slug:slug>/', CourseDetailAPIView.as_view(), name="course-detail"),
]
