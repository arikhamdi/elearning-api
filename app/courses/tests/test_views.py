from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from ..models import Subject


class SubjectListApiTest(APITestCase):

    def setUp(self) -> None:
        Subject.objects.create(
            title='Django',
            slug="django"
        )
        Subject.objects.create(
            title='Angular',
            slug="angular"
        )
        Subject.objects.create(
            title='React',
            slug="react"
        )

    def test_list_subjects_api_endpoint(self) -> None:
        res = self.client.get(reverse('courses:subjects-list'))

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_list_all_subjects(self) -> None:
        subjects = Subject.objects.all().count()

        self.assertEqual(subjects, 3)

    def test_list_subjects_ordered_by_title(self):
        self.assertEqual(str(Subject.objects.first()), 'Angular')
        self.assertEqual(str(Subject.objects.last()), 'React')


class SubjectDetailAPIView(SubjectListApiTest):

    def setUp(self) -> None:
        return super().setUp()

    def test_subject_detail_view_with_slug(self) -> None:
        res = self.client.get(
            reverse('courses:subject-detail', kwargs={'slug': 'django'}))

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_subject_detail_view_with_wrong_slug(self):
        res = self.client.get(
            reverse('courses:subject-detail', kwargs={'slug': 'docker'}))

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
