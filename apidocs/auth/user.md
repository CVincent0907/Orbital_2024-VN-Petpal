# Show Account Info

Show info of the current loggged in account

**URL** : `/api/auth/acc/`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

**Data Constraints** : `{}`

## Success Response

**Condition** : Request has valid sessionid.

**Code** : `200 OK`

**Content Example**

Shelter account:
```json
{
    "account_id": 1,
    "last_login": "2024-06-20T13:10:31.861230Z",
    "email": "testing@gmail.com",
    "role": "SHELTER",
    "data": {
        "shelter_id": 1,
        "account": {
            "account_id": 1,
            "last_login": "2024-06-20T13:10:31.861230Z",
            "email": "testing@gmail.com",
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
        "date_joined": "2024-06-20T13:10:15.781726Z"
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
            "last_login": "2024-06-20T13:29:04.986548Z",
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