# PetPal API Documentation

This is a documentation of PetPal's api, used mainly for development purposes.
Most endpoints (all auth endpoints) require a valid csrftoken. A csrftoken is
acquired on the first request from the browser to the server, and only origin
'http://127.0.0.1:3000' is allowed.

Where full URLs are provided in responses they will be rendered as if service
is running on 'http://127.0.0.1:8000'.

## Open Endpoints

Open endpoints require no Authentication.

### Account related

* [Register Shelter](auth/register-shelter.md) : `POST /api/auth/register/shelter/`
* [Register User](auth/register-user.md) : `POST /api/auth/register/user/`
* [Login](auth/login.md) : `POST /api/auth/login/`
* [Check email availability](auth/email-isavailable) : `GET /api/auth/is-available/:role/:email/`

### Pets related

* [Show info](pets/detail.md) : `GET /api/pets/detail/:pk`
* [List all](pets/list-all.md) : `GET /api/pets/list/`
* [List pets from shelter](pets/list-shelter.md) : `GET /api/pets/list/:shelter_id`

### Shelters related

* [List all](shelters/list.md) : `GET /api/shelters/list/`


## Endpoints that require Authentication

Closed endpoints require a valid Sessionid to be included in the header of the 
request. A Sessionid is acquired from login.

### Current Account related

Each endpoint manipulates or displays information related to the Account that is 
logged in with the request session:

* [Logout](auth/logout.md) : `POST /api/auth/logout/`
* [Show info](auth/user.md) : `GET /api/auth/acc/`
* [Delete account](auth/delete.md) : `DELETE /api/auth/delete/`
* [Update Shelter](shelters/put.md) : `PUT /api/shelters/update/`
* [Update User](users/put.md) : `PUT /api/users/update/`

### Pets related

Each endpoint manipulates or displays information related to pets.

* [Create pet](pets/create.md) : `POST /api/pets/create/`
* [Update info](pets/update.md) : `PUT /api/pets/update/`
* [Delete pet](pets/delete.md) : `DELETE /api/pets/delete`
