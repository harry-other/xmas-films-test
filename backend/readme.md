# Tesco Xmas Films backend

### Install just

https://github.com/casey/just

### Install dependencies

`python -m venv .venv`

`source .venv/bin/activate`

`just install-requirements`

### Create local DB

`just create-local-db-user`

`just create-local-db`

`python manage.py load_fixtures`

### Run development server

`python manage.py runserver`

### Visit the admin

`http://localhost:8000/admin/`

###

For more common tasks, consult the justfile
