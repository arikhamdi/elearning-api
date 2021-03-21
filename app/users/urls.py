from django.urls import path

from .views.teachers import (
    teacher_detail,
    teacher_list,

    modules_list,
    module_detail,
    content_list_by_module,
    content_detail,
    courses_list,
    course_detail
)

app_name = 'users'

urlpatterns = [
    # teacher interface

    # teachers
    path('teachers/', teacher_list),
    path('teacher/<int:id>/', teacher_detail),

    # Courses
    path('teacher/', courses_list,
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

    path('teacher/module/<int:module_id>/content/<model_name>/',
         content_list_by_module,
         name='module-content-create'),
    path('teacher/content/<int:content_id>/',
         content_detail,
         name='module-content-detail'),
]
