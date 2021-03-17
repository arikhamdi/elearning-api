from django.urls import path

from .views import (
    SubjectListAPIView,
    SubjectDetailAPIView,
    CoursesListAPIView,
    CourseListBySubjectAPIView,
    CourseDetailAPIView,
    ManageCoursesListAPIView,
    CreateCourseAPIView,
    UpdateCourseAPIView,
    CreateModuleAPIView,
    UpdateDeleteModuleAPIView
)


app_name = 'courses'

urlpatterns = [
    # teacher interface
    path('teacher/dashboard/', ManageCoursesListAPIView.as_view(),
         name='teacher-dashboard'),
    path('teacher/course/create',
         CreateCourseAPIView.as_view(), name="courses-create"),
    path('teacher/course/<slug:slug>/create',
         CreateModuleAPIView.as_view(), name="module-create"),
    path('teacher/course/<slug:slug>/<int:pk>/edit-module/',
         UpdateDeleteModuleAPIView.as_view(), name="module-create"),
    path('teacher/course/<slug:slug>/',
         UpdateCourseAPIView.as_view(), name="courses-update"),


    # public interface
    path('subject/<slug:slug>/',
         SubjectDetailAPIView.as_view(), name="subject-detail"),
    path('subjects/', SubjectListAPIView.as_view(), name="subjects-list"),

    path('courses/<slug:slug>/', CourseListBySubjectAPIView.as_view(),
         name="courses-by-subject"),
    path('courses/', CoursesListAPIView.as_view(), name="courses-list"),

    path('course/<slug:slug>/', CourseDetailAPIView.as_view(), name="course-detail"),
]
