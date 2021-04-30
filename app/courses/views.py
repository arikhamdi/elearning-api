from django.contrib.contenttypes.models import ContentType
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django.urls import reverse

from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from django.shortcuts import get_object_or_404, redirect
from django.apps import apps

from django.contrib.auth.mixins import PermissionRequiredMixin


from .permissions import IsAdminOrReadOnly, IsAuthorOrReadOnly
from .serializers import (
    SubjectSerializer,
    CourseSerializer,
    ContentSerializer

)
from .models import (File, Image, Subject, Course,
                     Module, Text, Video, Content)

# Public


class SubjectListAPIView(generics.ListAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = (IsAdminOrReadOnly,)


class CoursesListAPIView(generics.ListAPIView):
    queryset = Course.published.all()
    serializer_class = CourseSerializer


class CourseListBySubjectAPIView(generics.ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        subject = Subject.objects.get(slug=self.kwargs['subject_slug'])
        return Course.published.filter(subject=subject)


class CourseDetailAPIView(generics.RetrieveAPIView):
    queryset = Course.published.all()
    serializer_class = CourseSerializer
    permission_classes = (IsAuthorOrReadOnly,)
    lookup_field = 'slug'
    lookup_url_kwarg = 'course_slug'



