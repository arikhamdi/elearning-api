from rest_framework import serializers

from django.contrib.auth import get_user_model
from .models import File, Image, Subject, Course, Module, Text, Video, Content


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'first_name', 'last_name',
                  'email', 'last_login', 'date_joined']
        read_only_fields = ('id',)


class TextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = ['id', 'title', 'content']
        # fields = '__all__'


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'title', 'file']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'title', 'image']


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'title', 'url']


class ItemRelatedField(serializers.RelatedField):
    """
    A custom field to use for the `content_object` generic relationship.
    """

    def to_representation(self, value):
        if isinstance(value, Text):
            return TextSerializer(value).data
        if isinstance(value, File):
            return FileSerializer(value).data
        if isinstance(value, Video):
            return VideoSerializer(value).data
        if isinstance(value, Image):
            return ImageSerializer(value).data


class ContentSerializer(serializers.ModelSerializer):
    item = ItemRelatedField(read_only=True)

    class Meta:
        model = Content
        fields = '__all__'


class ModuleWithContentsSerializer(serializers.ModelSerializer):
    contents = ContentSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ['id', 'title', 'overview', 'order',  'contents']
        read_only_fields = ('id',)


class ModuleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Module
        fields = ['id', 'title', 'overview', 'publish', 'status', 'order']
        read_only_fields = ('id',)


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'title', 'slug']
        read_only_fields = ('id',)


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'name', 'email', 'last_login', 'date_joined']
        read_only_fields = ('id',)


class CourseSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer(read_only=True)
    modules = ModuleSerializer(many=True, read_only=True)
    subject = SubjectSerializer(read_only=True)
    students = StudentSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'slug', 'image', 'subject', 'owner',
                  'overview', 'status', 'publish', 'updated', 'modules', 'students']
        read_only_fields = ('id',)


class EnrolledCourseSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer(read_only=True)
    modules = ModuleWithContentsSerializer(many=True, read_only=True)
    subject = SubjectSerializer(read_only=True)
    students = StudentSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'slug', 'image', 'subject', 'owner',
                  'overview', 'status', 'publish', 'updated', 'modules', 'students']
        read_only_fields = ('id',)
