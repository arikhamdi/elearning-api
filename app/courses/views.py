from django.contrib.contenttypes.models import ContentType
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from rest_framework.decorators import api_view, permission_classes
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


# # Teachers DashBoard
# # Courses

# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated, IsAuthorOrReadOnly])
# def courses_list(request):

#     if request.method == 'GET':
#         courses = Course.objects.filter(owner=request.user)
#         serializer = CourseSerializer(courses, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = CourseSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(owner=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET', 'PUT', 'DELETE'])
# def course_detail(request, course_slug):
#     course = get_object_or_404(Course, slug=course_slug)

#     if request.method == 'GET':
#         serializer = CourseSerializer(course)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = CourseSerializer(course, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         course.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# # Module

# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated, IsAuthorOrReadOnly])
# def modules_list(request, course_slug):
#     course = get_object_or_404(Course, slug=course_slug)

#     if request.method == 'GET':
#         modules = course.modules.all()
#         serializer = ModuleSerializer(modules, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = ModuleSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(course=course)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET', 'PUT', 'DELETE'])
# def module_detail(request, module_id):
#     module = get_object_or_404(Module, id=module_id)

#     if request.method == 'GET':
#         serializer = ModuleSerializer(module)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = ModuleSerializer(module, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         module.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# # Content type

# def get_model(model_name):
#     """
#     Return content models, based on the courses apps models
#     Return courses.models.Text as default value
#     """
#     if model_name in ['video', 'image', 'file']:
#         return apps.get_model(app_label='courses', model_name=model_name)

#     return apps.get_model(app_label='courses', model_name='text')


# def get_serializer_class(model_name, *args, **kwargs):
#     """
#     Return content type model serializer for asked content type
#     Return TextSerializer as default value
#     """
#     if 'file' == model_name:
#         return FileSerializer(*args, **kwargs)
#     if 'image' == model_name:
#         return ImageSerializer(*args, **kwargs)
#     if 'video' == model_name:
#         return VideoSerializer(*args, **kwargs)

#     return TextSerializer(*args, **kwargs)


# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def content_list_by_module(request, module_id, model_name=""):
#     """
#     Get list of contents or post a new one for the current module
#     """
#     module = get_object_or_404(Module, id=module_id)

#     if request.method == 'GET':
#         content = module.contents.all()
#         serializer = ContentSerializer(content, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':

#         serializer = get_serializer_class(model_name, data=request.data)

#         if serializer.is_valid():
#             if serializer.save(owner=request.user):
#                 content = Content(
#                     module=module,
#                     content_type=ContentType.objects.get(model=model_name),
#                     object_id=serializer.data['id']
#                 )
#                 content.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes([IsAuthenticated])
# def content_detail(request, pk):
#     """
#     Get content detail,
#     """
#     content = get_object_or_404(Content, id=pk)
#     contenttype = get_model(content.content_type.name)
#     model = get_object_or_404(contenttype, id=content.object_id)

#     if request.method == 'GET':
#         serializer = get_serializer_class(content.content_type.name, model)

#         return Response(serializer.data)

#     elif request.method == 'PUT':

#         serializer = get_serializer_class(
#             content.content_type.name, model, data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         content.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
