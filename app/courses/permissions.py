from rest_framework import permissions
from .models import Course


class IsAdminOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        # Read only permissions are allowed for any ('GET', 'HEAD', 'OPTIONS') request
        if request.method in permissions.SAFE_METHODS:
            return True

        return bool(request.user and request.user.is_superuser)


class IsAuthorOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # Read only permissions are allowed for any ('GET', 'HEAD', 'OPTIONS') request
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user


class IsTeacher(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_teacher)
