from rest_framework import serializers
import time

from django.contrib.auth import get_user_model


class TimestampField(serializers.Field):
    def to_representation(self, value):
        return int(time.mktime(value.timetuple()))


class UserSerializer(serializers.ModelSerializer):
    # Source must be a models.DateTimeField
    subscribed = TimestampField("subscribed")
    last_login = TimestampField("last_login")

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'first_name',
                  'last_name', 'subscribed', 'last_login', 'is_teacher']
        read_only_fields = ('id',)
