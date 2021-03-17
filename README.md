Run project
=============

Make sure you have docker installed on your computer.

````
docker-compose up
````

Run tests
=========

This command works in all cases, whether docker is up or down
````
docker-compose run --rm app sh -c "python manage.py test"
````

This command works only if  docker is running
````
docker-compose exec app python manage.py test 
````


API endpoints
=============
***Courses***
-
-------------

***Public***

------------
- /api/subjects/ (GET)
    - list all subjects

- /api/subject/<subject-slug> (GET)  
    - subject detail view

- /api/courses/ (GET)
    - list all published courses

- /api/courses/<subject-slug> (GET)
    - list all courses by subject passed as argument

- /api/course/<course-slug> (GET)
    - course detail view

***Teacher***

-------------
- /api/teacher/dashboard/
    - teacher dashboard

- /api/teacher/course/create
    - create new course

- /api/teacher/course/<course-slug>
    - view to update course


***Authentication***
- 
--------------------


- /dj-rest-auth/login/ (POST)

    - email
    - password

    Returns Token key

- /dj-rest-auth/user/ (GET)

- /dj-rest-auth/logout/ (POST)

- /dj-rest-auth/registration/ (POST)

    - email
    - password1
    - password2
