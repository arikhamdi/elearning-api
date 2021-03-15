from django.db import models
from django.contrib.auth import get_user_model


class Subject(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)

    def __str__(self) -> str:
        return self.title


class Course(models.Model):
    owner = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name='course_created')
    subject = models.ForeignKey(
        'Subject', on_delete=models.CASCADE, related_name='courses')
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    overview = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title


class Module(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField()

    def __str__(self) -> str:
        return f'{self.title}'

    def save(self, *args, **kwargs) -> None:
        # if it is the first module for the current course
        if self.course.modules.all().count() == 0 and not self.order:
            self.order = 1
        # else: get the max value for the modules order field d-for the current course
        else:
            query = {
                field.order: field.id for field in self.course.modules.all()
            }
            if not self.order or self.order in query:
                new_order_value = max(query.keys())
                self.order = new_order_value + 1
        super(Module, self).save(*args, **kwargs)
