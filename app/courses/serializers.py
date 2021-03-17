from django.db.models import fields
from rest_framework import serializers

from django.contrib.auth import get_user_model
from .models import Subject, Course, Module


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'date_joined', 'last_login']
        read_only_fields = ('id',)


class ModuleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Module
        fields = ['id', 'title', 'description', 'publish', 'status']
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
