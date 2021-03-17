from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from ..models import Subject, Course


class SubjectListApiViewTest(APITestCase):

    def setUp(self) -> None:
        self.user = get_user_model().objects.create(
            email='testteacher@email.com',
            password='testpass123'
        )
        Subject.objects.create(
            title='Django',
            slug="django"
        )
        Subject.objects.create(
            title='Docker',
            slug="docker"
        )
        Subject.objects.create(
            title='React',
            slug="react"
        )

    def test_list_subjects_api_endpoint(self) -> None:
        response = self.client.get(reverse('courses:subjects-list'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'Django')
        self.assertContains(response, 'Docker')
        self.assertNotContains(response, 'Angular')

    def test_list_all_subjects(self) -> None:
        subjects = Subject.objects.all().count()

        self.assertEqual(subjects, 3)

    def test_list_subjects_ordered_by_title(self):
        self.assertEqual(str(Subject.objects.first()), 'Django')
        self.assertEqual(str(Subject.objects.last()), 'React')


class SubjectDetailAPIViewTest(SubjectListApiViewTest):

    def setUp(self) -> None:
        super().setUp()

    def test_subject_detail_view_with_slug(self) -> None:
        response = self.client.get(
            reverse('courses:subject-detail', kwargs={'slug': 'django'}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_subject_detail_view_with_wrong_slug(self):
        response = self.client.get(
            reverse('courses:subject-detail', kwargs={'slug': 'angular'}))

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CourseListAPIViewTest(SubjectDetailAPIViewTest):

    def setUp(self) -> None:
        super().setUp()
        Course.objects.create(
            owner=self.user,
            subject=Subject.objects.first(),
            title='django first step',
            slug='django-first-step',
            overview='',
            status='published'
        )
        Course.objects.create(
            owner=self.user,
            subject=Subject.objects.first(),
            title='django advanced',
            slug='django-advanced',
            overview='',
            status='published'
        )
        Course.objects.create(
            owner=self.user,
            subject=Subject.objects.last(),
            title='react first step',
            slug='react-first-step',
            overview='',
            status='published'
        )
        Course.objects.create(
            owner=self.user,
            subject=Subject.objects.last(),
            title='react & docker',
            slug='react-docker',
            overview=''
        )

    def test_list_courses_api_view(self):
        response = self.client.get(reverse('courses:courses-list'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_all_courses(self):
        courses = Course.objects.all().count()
        self.assertEqual(courses, 4)

    def test_list_all_published_courses(self):
        courses = Course.published.all().count()
        self.assertEqual(courses, 3)

    def test_list_courses_by_subject_api_endpoint(self):
        response = self.client.get(
            reverse('courses:courses-by-subject', kwargs={'slug': 'django'}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, "django first step")
        self.assertContains(response, "django advanced")
        self.assertNotContains(response, "react first step")

    def test_list_all_courses_by_subject(self):
        subject = Subject.objects.get(slug='django')
        courses = Course.published.filter(subject=subject).count()

        self.assertEqual(courses, 2)


class CourseDetailAPIViewTest(CourseListAPIViewTest):

    def setUp(self) -> None:
        super().setUp()

    def test_course_detail_view_with_slug(self):
        slug = Course.published.first().slug
        response = self.client.get(
            reverse('courses:course-detail', kwargs={'slug': slug}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
