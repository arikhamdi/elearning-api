# Projet d'intégration

**_Backend_**

![django version](https://img.shields.io/badge/django-3.1.8-brightgreen)
![djangorestframework version](https://img.shields.io/badge/djangorestframework-3.11.0-brightgreen)
![django-allauth version](https://img.shields.io/badge/django--allauth-0.42.0-brightgreen)
![django-cors-headers version](https://img.shields.io/badge/django--cors--headers-3.7.0-brightgreen)
![django-rest-passwordreset version](https://img.shields.io/badge/django--rest--passwordreset-1.1.0-brightgreen)

**_Frontend_**

![npm version](https://img.shields.io/badge/npm-6.14.10-red)
![react version](https://img.shields.io/badge/react-17.0.2-red)
[![axios version](https://img.shields.io/badge/axios-0.21.1-red)](https://github.com/axios/axios)
[![redux version](https://img.shields.io/badge/redux-4.0.5-red)](https://redux.js.org/)
[![react-redux version](https://img.shields.io/badge/react--redux-7.2.3-red)](https://react-redux.js.org/)
[![react-bootstrap version](https://img.shields.io/badge/react--bootstrap-1.5.2-red)](https://react-bootstrap.netlify.app/)
[![react-player version](https://img.shields.io/badge/react--player-2.9.0-red)](https://github.com/cookpete/react-player)

# Run project

Make sure you have docker installed on your computer.

```
docker-compose up
```

# Populate database for manual test

```
docker-compose run --rm app sh -c "python manage.py loaddata */fixtures/*.json"
```

# <p style="color: red">Run tests<p>

<p style="color: red">Tests don't work now - need to be fixed<p> 
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
