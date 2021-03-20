import json
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.auth import get_user_model


STATUS_CHOICES = (
    ('draft', 'Draft'),
    ('published', 'Published'),
)


class PublishedManager(models.Manager):
    def get_queryset(self):
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
    owner = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name='course_created')
    subject = models.ForeignKey(
        'Subject', on_delete=models.CASCADE, related_name='courses')
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True)
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

    def save(self, *args, **kwargs) -> None:
        if not self.slug:
            self.slug = slugify(self.title)

        return super(Course, self).save(*args, **kwargs)

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
    order = models.PositiveIntegerField(blank=True)
    publish = models.DateTimeField(default=timezone.now)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='draft')

    objects = models.Manager()
    published = PublishedManager()

    def __str__(self) -> str:
        return f'{self.title}'

    class Meta:
        ordering = ('order',)

    def save(self, *args, **kwargs) -> None:
        # if it is the first module for the current course
        if self.course.modules.all().count() == 0 and not self.order:
            self.order = 1
        elif self.order:
            pass
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
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        limit_choices_to={'model__in': (
            'text',
            'file',
            'image',
            'video'
        )})
    object_id = models.PositiveIntegerField()
    item = GenericForeignKey('content_type', 'object_id')
    order = models.PositiveIntegerField(blank=True)

    def __str__(self):
        return f'{self.id} {str(self.content_type.model)}'

    class Meta:
        ordering = ('order',)

    def save(self, *args, **kwargs) -> None:
        # if it is the first contenht for the current module
        if self.module.contents.all().count() == 0 and not self.order:
            self.order = 1
        elif self.order:
            pass
        # else: get the max value for the content order field for the current module
        else:
            query = [field.order for field in self.module.contents.all()]
            if not self.order or self.order in query:
                biggest_order_value = max(query)
                self.order = biggest_order_value + 1
        super(Content, self).save(*args, **kwargs)


class ItemBase(models.Model):
    owner = models.ForeignKey(
        get_user_model(), related_name='%(class)s_related', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Text(ItemBase):
    content = models.TextField()


class Image(ItemBase):
    image = models.ImageField(max_length=250, upload_to='images')


class File(ItemBase):
    file = models.FileField(max_length=250, upload_to='files')


class Video(ItemBase):
    url = models.URLField()
