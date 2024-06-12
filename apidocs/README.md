# PetPal API Documentation

This is a documentation of PetPal's api, used mainly for development purposes.
Most endpoints (all auth endpoints) require a valid csrftoken. A csrftoken is
acquired on the first request from the browser to the server, and only origin
'http://127.0.0.1:3000' is allowed.

Where full URLs are provided in responses they will be rendered as if service
is running on 'http://127.0.0.1:8000'.

## Open Endpoints

Open endpoints require no Authentication.

* [Register Shelter](...) : `POST /api/auth/register/shelter/`
* [Login Shelter](...) : `POST /api/auth/login/shelter/`
* [Register User](...) : `POST /api/auth/register/user/`
* [Login User](...) : `POST /api/auth/login/user/`

## Endpoints that require Authentication

Closed endpoints require a valid Sessionid to be included in the header of the 
request. A Sessionid is acquired from login.

* ...
* ...

### Current User related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* [Show info](user/get.md) : `GET /api/user/`
* [Update info](user/put.md) : `PUT /api/user/`

### Pets related

Each endpoint manipulates or displays information related to pets.