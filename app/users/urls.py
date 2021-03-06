from django.urls import path

from .views.users import user

from .views.teachers import (
    teacher_detail,
    teacher_list,
    teacher_list_courses,
    teacher_modules_list,
    teacher_module_details,
    teacher_get_content_list_by_module,
    content_detail,
    teacher_course_detail,
    teacher_publish_course,
    teacher_unpublish_course
)
from .views.students import (
    get_favorite_courses,
    student_course_detail,
    student_get_modules_list,
    get_content_by_id,
    add_course_to_user_favoris,
    remove_course_to_user_favoris,
    mark_content_as_already_seen,
    unmark_content_as_already_seen,
    user_has_subscribe,
    student_course_progess
)

app_name = 'users'

urlpatterns = [

    path('user/', user),

    path('get_favorite_courses/', get_favorite_courses),

    path('<slug:course_slug>/favoris-add/', add_course_to_user_favoris),
    path('<slug:course_slug>/favoris-remove/', remove_course_to_user_favoris),

    path('<slug:course_slug>/<int:content_item>/add/',
         mark_content_as_already_seen),
    path('<slug:course_slug>/<int:content_item>/remove/',
         unmark_content_as_already_seen),

    # Students interfaces
    path('student/<slug:course_slug>/',
         student_course_detail),
     path('student/<slug:course_slug>/progress',
         student_course_progess),
    path('student/<slug:course_slug>/content/<int:content_item>/', get_content_by_id),
    #     path('student/<slug:course_slug>/', student_get_modules_list),

    path('subscribe/<str:duration>/', user_has_subscribe),
    # teachers interfaces

    # teachers
    path('teachers/', teacher_list),
    path('teacher/<int:id>/', teacher_detail),


    path('teacher/courses/', teacher_list_courses),

    path('teacher/<slug:course_slug>/',
         teacher_course_detail, name="courses-detail"),

    path('teacher/<slug:course_slug>/publish', teacher_publish_course),
    path('teacher/<slug:course_slug>/unpublish', teacher_unpublish_course),

    # Modules
    path('teacher/<slug:course_slug>/modules/',
         teacher_modules_list, name='modules-list'),
    path('teacher/module/<int:module_id>/',
         teacher_module_details, name="module-detail"),


    # Contents
    path('teacher/module/<int:module_id>/content/',
         teacher_get_content_list_by_module,
         name='module-content-list'),

    path('teacher/module/<int:module_id>/content/<model_name>/',
         teacher_get_content_list_by_module,
         name='module-content-create'),
    path('teacher/content/<int:content_id>/',
         content_detail,
         name='module-content-detail'),
]
