from rest_framework import serializers

from django.contrib.auth import get_user_model
from .models import File, Image, Subject, Course, Module, Text, Video, Content


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'date_joined', 'last_login']
        read_only_fields = ('id',)


class TextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = ['id', 'title', 'content']


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
        """
        Serialize conte objects to a simple textual representation.
        """
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
    contents = ContentSerializer(many=True)

    class Meta:
        model = Module
        fields = ['id', 'order', 'title', 'description', 'contents']


class ModuleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Module
        fields = ['id', 'title', 'description', 'publish', 'status', 'order']
        read_only_fields = ('id',)


class CourseSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer(read_only=True)
    modules = ModuleSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'slug', 'subject', 'owner',
                  'overview', 'status', 'publish', 'updated', 'modules']
        read_only_fields = ('id',)


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'title', 'slug']
        read_only_fields = ('id',)
