from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.apps import apps


from courses.permissions import IsAuthorOrReadOnly, IsTeacher
from courses.serializers import (
    ImageSerializer,
    CourseSerializer,
    ModuleSerializer,
    ContentSerializer,
    TextSerializer,
    FileSerializer,
    VideoSerializer,
    OwnerSerializer
)
from courses.models import (Course, Module, Content)


@api_view(['GET'])
def teacher_list(request):

    if request.method == 'GET':
        teachers = get_user_model().objects.filter(is_teacher=True)
        serializer = OwnerSerializer(teachers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def teacher_detail(request, id):

    if request.method == 'GET':
        teacher = get_object_or_404(get_user_model(), id=id)
        serializer = OwnerSerializer(teacher)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Teachers DashBoard
# Courses

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated, IsAuthorOrReadOnly, IsTeacher])
def teacher_list_courses(request):

    if request.user.is_teacher:
        if request.method == 'GET':
            courses = Course.objects.filter(owner=request.user)
            serializer = CourseSerializer(courses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user,
                            subject_id=request.data['subject'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated, IsAuthorOrReadOnly, IsTeacher])
# def teacher_add_new_course(request):

#     if request.user.is_teacher:
#         if request.method == 'POST':
#             serializer = CourseSerializer(data=request.data)
#             if serializer.is_valid():
#                 serializer.save(owner=request.user,
#                                 subject_id=request.data['subject'])
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, IsAuthorOrReadOnly, IsTeacher])
def teacher_course_detail(request, course_slug):
    course = get_object_or_404(Course, slug=course_slug)

    if request.method == 'GET':
        serializer = CourseSerializer(course)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CourseSerializer(course, data=request.data)
        print(request.data['subject'])
        if serializer.is_valid():
            serializer.save(subject_id=request.data['subject'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Module

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, IsAuthorOrReadOnly, IsTeacher])
def teacher_modules_list(request, course_slug):
    course = get_object_or_404(Course, slug=course_slug)

    if request.method == 'GET':
        modules = course.modules.all()
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ModuleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(course=course)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated, IsAuthorOrReadOnly, IsTeacher])
def teacher_module_details(request, module_id):
    module = get_object_or_404(Module, id=module_id)

    if request.method == 'GET':
        serializer = ModuleSerializer(module)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        serializer = ModuleSerializer(module, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        module.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAuthorOrReadOnly, IsTeacher])
def teacher_publish_course(request, course_slug):
    course = get_object_or_404(Course, slug=course_slug)

    if request.method == 'GET':
        course.status = 'published'
        course.save()
        serializer = CourseSerializer(course)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAuthorOrReadOnly, IsTeacher])
def teacher_unpublish_course(request, course_slug):
    course = get_object_or_404(Course, slug=course_slug)

    if request.method == 'GET':
        course.status = 'draft'
        course.save()
        serializer = CourseSerializer(course)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Content type


def get_model(model_name):
    """
    Return content models, based on the courses apps models
    Return courses.models.Text as default value  
    """
    if model_name in ['video', 'image', 'file']:
        return apps.get_model(app_label='courses', model_name=model_name)

    return apps.get_model(app_label='courses', model_name='text')


def get_serializer_class(model_name, *args, **kwargs):
    """
    Return content type model serializer for asked content type
    Return TextSerializer as default value  
    """
    if 'file' == model_name:
        return FileSerializer(*args, **kwargs)
    if 'image' == model_name:
        return ImageSerializer(*args, **kwargs)
    if 'video' == model_name:
        return VideoSerializer(*args, **kwargs)

    return TextSerializer(*args, **kwargs)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, IsAuthorOrReadOnly, IsTeacher])
def teacher_get_content_list_by_module(request, module_id, model_name="text"):
    """
    Get list of contents or post a new one for the current module
    """
    module = get_object_or_404(Module, id=module_id)

    if request.method == 'GET':
        content = module.contents.all()
        serializer = ContentSerializer(content, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        model_name = 'text' if model_name not in [
            'video', 'file', 'image'] else model_name

        serializer = get_serializer_class(model_name, data=request.data)

        if serializer.is_valid():

            if serializer.save(owner=request.user):
                content = Content(
                    module=module,
                    content_type=ContentType.objects.get(model=model_name),
                    object_id=serializer.data['id']
                )
                content.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated, IsAuthorOrReadOnly, IsTeacher])
def content_detail(request, content_id):
    """
    Get content detail,
    """
    content = get_object_or_404(Content, id=content_id)
    contenttype = get_model(content.content_type.name)
    model = get_object_or_404(contenttype, id=content.object_id)

    if request.method == 'GET':
        serializer = get_serializer_class(content.content_type.name, model)

        return Response(serializer.data)

    elif request.method == 'PATCH':

        serializer = get_serializer_class(
            content.content_type.name, model, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        content.delete()
        model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
