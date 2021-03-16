from rest_framework import serializers

from .models import Subject


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'title', 'slug']
        read_only_fields = ('id',)

    def create(self, validated_data):
        return Subject.objects.create(**validated_data)
