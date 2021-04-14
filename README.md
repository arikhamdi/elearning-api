# Run project

Make sure you have docker installed on your computer.

```
docker-compose up
```

# Populate database for manual test

```
python manage.py loaddata */fixtures/*.json`
```

# Run tests

This command works in all cases, whether docker is up or down

```
docker-compose run --rm app sh -c "python manage.py test"
```

This command works only if docker is running

```
docker-compose exec app python manage.py test
```

# API endpoints

## **_Courses_**

---

**_Public_**

---

- /api/ (GET)

  - list all published courses

- /api/subjects/ (GET)

  - list all subjects

- /api/subject/(subject-slug) (GET)

  - subject detail view

- /api/(course-slug) (GET)

  - course detail view

- /api/users/teachers/ (GET)
  - list of teachers

**_Student_**

---

- /api/users/dashboard/ (GET)
  - student dashboard

**_Teacher_**

---

- /api/users/teacher/ (GET, POST)

  - teacher dashboard
  - create new course

- /api/users/teacher/(course-slug)/ (GET, PUT, DELETE)

  - course detail
  - Edit related course
  - delete related course

- /api/teacher/(course-slug)/modules/ (GET, POST)

  - get all modules for current course
  - create module

- /api/teacher/module/(module-id)/ (GET, PUT, DELETE)

  - module detail
  - Edit related module
  - delete related module

- /api/teacher/module/(module-id)/content/(model-name='default:text') (GET, POST)

  - get all content for current module
  - create new content

- /api/teacher/content/(content-id)/ (GET, PUT, DELETE)
  - content detail
  - edit related content
  - delete related content

**_Authentication_**

- ***

- /api/auth/login/ (POST)

  - email
  - password

  Returns Token key

- /api/auth//user/ (GET)

- /api/auth//logout/ (POST)

- /api/auth//registration/ (POST)

  - email
  - password1
  - password2
