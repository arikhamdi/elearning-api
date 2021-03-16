from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from ..models import Subject


SUBJECTS_URL = reverse('courses:subjects-list')


class SubjectApiTest(APITestCase):

    def test_display_list_subjects(self):
        res = self.client.get(SUBJECTS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
