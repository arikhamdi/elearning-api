from django.contrib.contenttypes.models import ContentType
from django.db.models.query import QuerySet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from rest_framework import status

from django.shortcuts import get_object_or_404
from django.apps import apps

from django.contrib.auth.mixins import PermissionRequiredMixin


from .permissions import IsAdminOrReadOnly, IsAuthorOrReadOnly
from .serializers import (
    ImageSerializer,
    SubjectSerializer,
    CourseSerializer,
    ModuleSerializer,
    ContentSerializer,
    TextSerializer,
    FileSerializer,
    ModuleWithContentsSerializer,
    VideoSerializer
)
from .models import (File, Image, Subject, Course,
                     Module, Text, Video, Content)

# Public


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


class CourseDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.published.all()
    serializer_class = CourseSerializer
    permission_classes = (IsAuthorOrReadOnly,)
    lookup_field = 'slug'


# Teacher

class ManageCoursesListAPIView(PermissionRequiredMixin, generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (IsAuthorOrReadOnly, IsAuthenticated,)
    permission_required = 'courses.view_course'

    def list(self, request):
        queryset = self.get_queryset().filter(owner=request.user)
        serializer = CourseSerializer(queryset, many=True)
        return Response(serializer.data)


class CreateCourseAPIView(PermissionRequiredMixin, generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (IsAuthorOrReadOnly, IsAuthenticated,)
    permission_required = 'courses.add_course'

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UpdateCourseAPIView(PermissionRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (IsAuthorOrReadOnly, IsAuthenticated,)
    permission_required = ('courses.change_course', 'courses.delete_course')
    lookup_field = 'slug'


class CreateModuleAPIView(PermissionRequiredMixin, generics.ListCreateAPIView):
    serializer_class = ModuleSerializer
    permission_classes = (IsAuthorOrReadOnly, IsAuthenticated,)
    permission_required = 'courses.change_course'

    def get_queryset(self):
        course = Course.objects.get(slug=self.kwargs['slug'])
        return course.modules.all()

    def perform_create(self, serializer):
        course = Course.objects.get(slug=self.kwargs['slug'])
        serializer.save(course=course)


class UpdateDeleteModuleAPIView(PermissionRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ModuleWithContentsSerializer
    permission_classes = (IsAuthorOrReadOnly, IsAuthenticated,)
    permission_required = 'courses.change_course'

    def get_queryset(self):
        course = Course.objects.get(slug=self.kwargs['slug'])
        return course.modules.all()


class ContentListAPIView(PermissionRequiredMixin, generics.ListAPIView):
    serializer_class = ContentSerializer
    permission_classes = (IsAuthorOrReadOnly, IsAuthenticated,)
    permission_required = 'courses.change_course'

    def get_queryset(self):
        module = Module.objects.get(id=self.kwargs['pk'])
        return module.contents.all()


class ContentCreateApiView(PermissionRequiredMixin, generics.CreateAPIView):
    permission_classes = (IsAuthorOrReadOnly, IsAuthenticated,)
    permission_required = 'courses.change_course'

    def get_model(self, model_name):
        if model_name in ['text', 'video', 'image', 'file']:
            return apps.get_model(app_label='courses', model_name=model_name)

        return None

    def dispatch(self, request, slug, pk, model_name):
        self.module = get_object_or_404(
            Module,
            id=pk,
            course__owner=request.user
        )
        self.model = self.get_model(model_name)
        return super().dispatch(request, pk, model_name)

    def get_queryset(self):
        return self.model.objects.all()

    def get_serializer_class(self):
        if self.model == Text:
            return TextSerializer
        if self.model == File:
            return FileSerializer
        if self.model == Image:
            return ImageSerializer
        if self.model == Video:
            return VideoSerializer

    def post(self, request, *args, **kwargs):
        if self.model == Text:
            model_name = 'text'
            serializer = TextSerializer(data=request.data)
        if self.model == File:
            model_name = 'file'
            serializer = FileSerializer(data=request.data)
        if self.model == Image:
            model_name = 'image'
            serializer = ImageSerializer(data=request.data)
        if self.model == Video:
            model_name = 'video'
            serializer = VideoSerializer(data=request.data)

        if serializer.is_valid():
            if serializer.save(owner=request.user):
                content = Content(
                    module=self.module,
                    content_type=ContentType.objects.get(model=model_name),
                    object_id=serializer.data['id']
                )
                content.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContentUpdateAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer
    permission_classes = (IsAuthenticated,)
    permission_required = 'courses.change_course'
