from django.shortcuts import render
from django.urls.base import reverse_lazy
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from django.contrib.auth.mixins import PermissionRequiredMixin


from .permissions import IsAdminOrReadOnly, IsAuthorOrReadOnly
from .serializers import SubjectSerializer, CourseSerializer
from .models import Subject, Course


class SubjectListAPIView(generics.ListAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = (IsAdminOrReadOnly,)


class SubjectDetailAPIView(generics.RetrieveAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = (IsAdminOrReadOnly,)
    lookup_field = 'slug'


class CoursesListAPIView(generics.ListAPIView):
    queryset = Course.published.all()
    serializer_class = CourseSerializer


class ManageCoursesListAPIView(PermissionRequiredMixin, generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    # authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)
    permission_required = 'courses.view_course'

    def list(self, request):
        queryset = self.get_queryset().filter(owner=request.user)
        serializer = CourseSerializer(queryset, many=True)
        return Response(serializer.data)


class CreateCourseAPIView(PermissionRequiredMixin, generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    # authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)
    permission_required = 'courses.add_course'

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UpdateCourseAPIView(PermissionRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (IsAuthenticated,)
    permission_required = ('courses.change_course', 'courses.delete_course')
    lookup_field = 'slug'


class CourseListBySubjectAPIView(generics.ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        subject = Subject.objects.get(slug=self.kwargs['slug'])
        return Course.published.filter(subject=subject)


class CourseDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.published.all()
    serializer_class = CourseSerializer
    permission_classes = (IsAuthorOrReadOnly,)
    lookup_field = 'slug'
