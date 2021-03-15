from django.test import TestCase

from django.contrib.auth import get_user_model
from ..models import Subject, Course, Module


class SubjectModelTest(TestCase):

    def setUp(self) -> None:
        self.user = get_user_model().objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.subject1 = Subject.objects.create(
            title="subject one", slug="subject-one")

    def test_string_representation(self) -> None:
        self.assertEqual(str(self.subject1), 'subject one')

    def test_subject_title_and_slug(self) -> None:
        self.assertEqual(self.subject1.title, 'subject one')

    def test_subject_slug(self) -> None:
        self.assertEqual(self.subject1.slug, 'subject-one')


class CourseModelTest(SubjectModelTest):

    def setUp(self) -> None:
        super().setUp()
        self.course1 = Course.objects.create(
            subject=self.subject1,
            owner=self.user,
            title="course one",
            slug="course-one",
            overview=""
        )
        self.course2 = Course.objects.create(
            subject=self.subject1,
            owner=self.user,
            title="course two",
            slug="course-two",
            overview=""
        )

    def test_string_representation(self) -> None:
        self.assertEqual(str(self.course1), 'course one')

    def test_course_title(self) -> None:
        self.assertEqual(self.course1.title, 'course one')

    def test_course_slug(self) -> None:
        self.assertEqual(self.course1.slug, 'course-one')


class ModuleModelTest(CourseModelTest):

    def setUp(self) -> None:
        super().setUp()
        self.module1 = Module.objects.create(
            course=self.course1,
            title='module one',
            description='',
        )
        self.module2 = Module.objects.create(
            course=self.course1,
            title='module two',
            description='',
        )
        self.module3 = Module.objects.create(
            course=self.course1,
            title='module three',
            description='',
        )
        self.module4 = Module.objects.create(
            course=self.course2,
            title='module one',
            description='',
            order=3
        )
        self.module5 = Module.objects.create(
            course=self.course2,
            title='module two',
            description='',
            order=1
        )
        self.module6 = Module.objects.create(
            course=self.course2,
            title='module two',
            description='',
        )

    def test_string_representation(self) -> None:
        self.assertEqual(str(self.module1), 'module one')

    def test_module_title(self) -> None:
        self.assertEqual(self.module1.title, 'module one')

    def test_module_order_first_created_module(self) -> None:
        self.assertEqual(self.module1.order, 1)

    def test_module_order_correctly_incremented(self) -> None:
        self.assertEqual(self.module2.order, 2)
        self.assertEqual(self.module3.order, 3)

        self.assertEqual(self.module4.order, 3)
        self.assertEqual(self.module5.order, 1)
        self.assertEqual(self.module6.order, 4)
