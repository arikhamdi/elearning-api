from django.test import TestCase

from django.contrib.auth import get_user_model
from ..models import Subject, Course, Module, Content, Text, Video, Image, File


class SubjectModelTest(TestCase):

    def setUp(self) -> None:
        self.user = get_user_model().objects.create_user(
            email='testuser@mail.com',
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
            title='module four',
            description='',
            order=3
        )
        self.module5 = Module.objects.create(
            course=self.course2,
            title='module five',
            description='',
            order=1
        )
        self.module6 = Module.objects.create(
            course=self.course2,
            title='module six',
            description='',
        )
        self.module7 = Module.objects.create(
            course=self.course2,
            title='module seven',
            description='',
            order=3
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
        self.assertEqual(self.module7.order, 5)


class ContentModelTest(ModuleModelTest):

    def setUp(self) -> None:
        super().setUp()
        self.obj1 = Text.objects.create(
            title='text one',
            content='content one'
        )
        self.obj2 = Video.objects.create(
            title='django reinhardt',
            url='https://www.youtube.com/watch?v=gcE1avXFJb4&ab_channel=brayhann'
        )
        self.obj3 = Image.objects.create(
            title='text one',
            image='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbigkick.es%2Fwp-content%2Fuploads%2F2018%2F01%2Fdjango-reinhardt.jpg&f=1&nofb=1'
        )
        self.obj4 = Text.objects.create(
            title='text two',
            content='content two'
        )
        self.content1 = Content.objects.create(
            module=self.module1,
            item=self.obj1
        )
        self.content2 = Content.objects.create(
            module=self.module1,
            item=self.obj2
        )
        self.content3 = Content.objects.create(
            module=self.module1,
            item=self.obj3
        )
        self.content4 = Content.objects.create(
            module=self.module2,
            item=self.obj4
        )

    def test_module_have_correct_number_of_content(self) -> None:
        total_content_module1 = self.module1.contents.all().count()
        total_content_module3 = self.module3.contents.all().count()
        self.assertEqual(total_content_module1, 3)
        self.assertEqual(total_content_module3, 0)

    def test_contents_correctly_ordered_in_module(self) -> None:
        self.assertEqual(self.content1.order, 1)
        self.assertEqual(self.content2.order, 2)
        self.assertEqual(self.content3.order, 3)

        self.assertEqual(self.content4.order, 1)
