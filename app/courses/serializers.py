from django.db.models import fields
from rest_framework import serializers

from django.contrib.auth import get_user_model
from .models import Subject, Course


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'date_joined', 'last_login']


class CourseSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer(read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'slug', 'subject', 'owner',
                  'overview', 'publish', 'updated']
        read_only_fields = ('id',)


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'title', 'slug']
        read_only_fields = ('id',)
