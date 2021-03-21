from django.contrib import admin
from .models import Subject, Course, Content, Text, Video


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'subject',
                    'owner', 'created', 'publish', 'status']
    list_editable = ['status']
    list_filter = ['created', 'subject']
    search_fields = ['title', 'overview']
    prepopulated_fields = {'slug': ('title',)}


# admin.site.register(Content)
# admin.site.register(Text)
# admin.site.register(Video)
