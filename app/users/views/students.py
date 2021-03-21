from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from django.shortcuts import get_object_or_404


from courses.serializers import (
    CourseSerializer,
    ModuleSerializer,
    ContentSerializer,

)
from courses.models import (Course, Module, Content)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_dashboard(request):
    courses = Course.published.filter(students__in=[request.user])

    if request.method == 'GET':
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_course_detail(request, course_slug):
    course = get_object_or_404(Course, slug=course_slug)
    is_enrolled = course.students.filter(id=request.user.id).exists()

    if is_enrolled:
        if request.method == 'GET':
            serializer = CourseSerializer(course)
            return Response(serializer.data)

    return Response(status=status.HTTP_403_FORBIDDEN)
