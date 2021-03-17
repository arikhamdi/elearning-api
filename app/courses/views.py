from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics


from .permissions import IsAdminOrReadOnly
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


class CourseListBySubjectAPIView(generics.ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        subject = Subject.objects.get(slug=self.kwargs['slug'])
        return Course.published.filter(subject=subject)


class CourseDetailAPIView(generics.RetrieveAPIView):
    queryset = Course.published.all()
    serializer_class = CourseSerializer
    lookup_field = 'slug'
