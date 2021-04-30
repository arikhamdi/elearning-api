from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from django.shortcuts import get_object_or_404

from courses.serializers import (
    ModuleWithContentsSerializer,
    ModuleSerializer,
    ContentSerializer,
    EnrolledCourseSerializer,
    CourseSerializer
)

from courses.models import (Course, Module, Content)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_course_detail(request, course_slug, content_item):
    course = get_object_or_404(Course, slug=course_slug)
    is_enrolled = course.students.filter(id=request.user.id).exists()

    if is_enrolled:
        if request.method == 'GET':
            serializer = EnrolledCourseSerializer(course)
            return Response(serializer.data)

    return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_get_modules_list(request, course_slug):
    course = get_object_or_404(Course, slug=course_slug)
    modules = course.modules.all()
    is_enrolled = course.students.filter(id=request.user.id).exists()

    if is_enrolled:
        if request.method == 'GET':
            serializer = ModuleSerializer(modules)
            return Response(serializer.data)

    return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_content_by_id(request, course_slug, content_item):
    course = get_object_or_404(Course, slug=course_slug)
    content = get_object_or_404(
        Content, id=content_item, module__course__slug=course_slug)
    is_enrolled = course.students.filter(id=request.user.id).exists()

    if is_enrolled:
        if request.method == 'GET':
            serializer = ContentSerializer(content)
            return Response(serializer.data)

    return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_course_to_user_favoris(request, course_slug):
    course = get_object_or_404(Course, slug=course_slug)

    if request.method == 'POST':
        if not course.students.filter(id=request.user.id).exists():
            course.students.add(request.user)
    serializer = CourseSerializer(course)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_course_to_user_favoris(request, course_slug):
    course = get_object_or_404(Course, slug=course_slug)

    if request.method == 'POST':
        if course.students.filter(id=request.user.id).exists():
            course.students.remove(request.user)
    serializer = CourseSerializer(course)
    return Response(serializer.data)
