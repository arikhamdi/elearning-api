from django.db import models
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.auth import get_user_model
from django.db.models.query import QuerySet


class PublishedManager(models.Manager):
    def get_queryset(self) -> QuerySet:
        return super(PublishedManager, self).get_queryset().filter(status='published')


class Subject(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['title']
        verbose_name = 'sujet'
        verbose_name_plural = 'sujets'


class Course(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    owner = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name='course_created')
    subject = models.ForeignKey(
        'Subject', on_delete=models.CASCADE, related_name='courses')
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    overview = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='draft')

    objects = models.Manager()
    published = PublishedManager()

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ('-publish',)
        verbose_name = 'cours'
        verbose_name_plural = 'cours'


class Module(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField()

    def __str__(self) -> str:
        return f'{self.title}'

    class Meta:
        ordering = ('order',)

    def save(self, *args, **kwargs) -> None:
        # if it is the first module for the current course
        if self.course.modules.all().count() == 0 and not self.order:
            self.order = 1
        # else: get the max value for the modules order field for the current course
        else:
            query = {
                field.order: field.id for field in self.course.modules.all()
            }
            if not self.order or self.order in query:
                biggest_order_value = max(query.keys())
                self.order = biggest_order_value + 1
        super(Module, self).save(*args, **kwargs)


class Content(models.Model):
    module = models.ForeignKey(
        Module, on_delete=models.CASCADE, related_name='contents')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    item = GenericForeignKey('content_type', 'object_id')
    order = models.PositiveIntegerField()

    class Meta:
        ordering = ('order',)

    def save(self, *args, **kwargs) -> None:
        # if it is the first contenht for the current module
        if self.module.contents.all().count() == 0 and not self.order:
            self.order = 1
        # else: get the max value for the content order field for the current module
        else:
            query = [field.order for field in self.module.contents.all()]
            if not self.order or self.order in query:
                biggest_order_value = max(query)
                self.order = biggest_order_value + 1
        super(Content, self).save(*args, **kwargs)


class Text(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()


class Image(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(max_length=250, upload_to='images')


class File(models.Model):
    title = models.CharField(max_length=200)
    image = models.FileField(max_length=250, upload_to='files')


class Video(models.Model):
    title = models.CharField(max_length=200)
    url = models.URLField()
