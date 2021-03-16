Run project
=============

make sure you have docker installed on your computer.

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
- /api/subjects/ (GET)
    - list all published subjects

- /api/subject/'slug' (GET)
    - display subject detail view

***Authentication***
- 
--------------------


- /dj-rest-auth/login/ (POST)

    - email
    - password

    Returns Token key

- /dj-rest-auth/user/ (GET)

- /dj-rest-auth/logout/ (POST)

- /dj-rest-auth/password/reset/ (POST)

    - email

- /dj-rest-auth/registration/ (POST)

    - email
    - password1
    - password2
