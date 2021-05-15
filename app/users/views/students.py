from rest_framework.response import Response
from datetime import datetime
import time
from dateutil.relativedelta import relativedelta
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

from users.serializers import UserSerializer

from courses.models import (Course, Module, Content)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_favorite_courses(request):
    courses = Course.objects.filter(students__in=[request.user])

    if request.method == 'GET':
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_course_detail(request, course_slug):
    course = get_object_or_404(Course, slug=course_slug)
    is_enrolled = course.students.filter(id=request.user.id).exists()

    if is_enrolled:
        if request.method == 'GET':
            serializer = EnrolledCourseSerializer(course)
            return Response(serializer.data, status=status.HTTP_200_OK)

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
            return Response(serializer.data, status=status.HTTP_200_OK)

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
            return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_course_to_user_favoris(request, course_slug):
    course = get_object_or_404(Course, slug=course_slug)

    if request.method == 'POST':
        if not course.students.filter(id=request.user.id).exists():
            course.students.add(request.user)
        serializer = CourseSerializer(course)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_course_to_user_favoris(request, course_slug):
    course = get_object_or_404(Course, slug=course_slug)

    if request.method == 'POST':
        if course.students.filter(id=request.user.id).exists():
            course.students.remove(request.user)
    serializer = CourseSerializer(course)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_content_as_already_seen(request, course_slug, content_item):
    content = get_object_or_404(
        Content, id=content_item, module__course__slug=course_slug)

    if request.method == 'POST':
        if not content.already_seen.filter(id=request.user.id).exists():
            content.already_seen.add(request.user)
        serializer = ContentSerializer(content)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unmark_content_as_already_seen(request, course_slug, content_item):
    content = get_object_or_404(
        Content, id=content_item, module__course__slug=course_slug)

    if request.method == 'POST':
        if content.already_seen.filter(id=request.user.id).exists():
            content.already_seen.remove(request.user)
        serializer = ContentSerializer(content)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_has_subscribe(request, duration):

    if request.method == "GET":
        if request.user.subscribed == None or request.user.subscribed.replace(tzinfo=None) < datetime.now():
            if duration == 'month':
                request.user.subscribed = datetime.now() + relativedelta(months=1)
            if duration == 'year':
                request.user.subscribed = datetime.now() + relativedelta(years=1)
        else:
            if duration == 'month':
                request.user.subscribed = request.user.subscribed + \
                    relativedelta(months=1)
            if duration == 'year':
                request.user.subscribed = request.user.subscribed + \
                    relativedelta(years=1)
        request.user.save()
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
