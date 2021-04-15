from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    ordering = ['email']
    list_display = ['email', 'first_name', 'last_name',
                    'is_staff', 'last_login', 'date_joined']
    search_fields = ('email',)
    list_filter = ('is_superuser', 'is_teacher', 'is_active', 'groups')
    filter_horizontal = ('groups', 'user_permissions',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (('Personal Info'), {'fields': ('first_name', 'last_name')}),
        (
            ('Permissions'),
            {'fields': (
                'is_active',
                'is_staff',
                'is_superuser',
                'is_teacher',
                'groups',
                'user_permissions',
            )}
        )
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')
        }),
    )


# admin.site.register(User, UserAdmin)
