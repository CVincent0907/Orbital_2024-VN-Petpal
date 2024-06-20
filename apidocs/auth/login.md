# Login

Login account and acquire sessionid cookie.

**URL** : `/api/auth/login/`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

**Data Constraints**

"account" and "name" fields are required.

```json
{
    "email": "[email 254 characters max], required",
    "password": "[unicode 255 characters max], required",
    "role": "[one of 'SHELTER', 'USER'], required"
}
```

**Data Example**

```json
{
    "email": "testing@gmail.com",
    "password": "Password123",
    "role": "SHELTER"
}
```

## Success Response

**Code** : `200 OK`

**Content Example**

Shelter account:
```json
{
    "email": "testing@gmail.com",
    "role": "SHELTER",
    "data": {
        "shelter_id": 1,
        "account": {
            "account_id": 1,
            "last_login": "2024-06-20T12:13:47.496895Z",
            "email": "testing2@gmail.com",
            "role": "SHELTER"
        },
        "address": {
            "unit_number": "11A",
            "street_name": "Jalan ABC",
            "address_line_1": "",
            "address_line_2": "",
            "region": "",
            "postcode": "A12345",
            "city": "Deff",
            "state": "Selangor",
            "country": "MY"
        },
        "name": "Test",
        "description": "testing testing 123",
        "contact_email": "testing.contact@gmail.com",
        "country": "MY",
        "phone_number": "1234567890",
        "date_joined": "2024-06-20T12:02:29.099489Z"
    }
}
```

User account:
```json
{
    "email": "testing@gmail.com",
    "role": "USER",
    "data": {
        "user_id": 1,
        "account": {
            "account_id": 2,
            "last_login": "2024-06-20T12:16:26.645097Z",
            "email": "testing@gmail.com",
            "role": "USER"
        },
        "address": {
            "unit_number": "11A",
            "street_name": "Jalan ABC",
            "address_line_1": "",
            "address_line_2": "",
            "region": "",
            "postcode": "A12345",
            "city": "Deff",
            "state": "Selangor",
            "country": "MY"
        },
        "display_name": "Test",
        "country": "MY",
        "date_joined": "2024-06-20T12:09:05.747557Z"
    }
}
```