from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from courses.permissions import IsAuthorOrReadOnly

from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from courses.serializers import (
    CourseSerializer,

)

from courses.models import (Course, Module, Content)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAuthorOrReadOnly])
def dashboard(request):
    courses = Course.published.filter(students__in=[request.user])

    if request.user.is_teacher:
        if request.method == 'GET':
            courses = Course.objects.filter(owner=request.user)
            serializer = CourseSerializer(courses, many=True)
            return Response(serializer.data)

        elif request.method == 'POST':
            serializer = CourseSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(owner=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)
