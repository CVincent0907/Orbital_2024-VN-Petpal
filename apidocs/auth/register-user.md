# Create User Account

Create a user account if the provided email does not have a registered
user account.

**URL** : `/api/auth/register/user/`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

**Data Constraints**

"account" and "display_name" fields are required.

```json
{
    "account": {
        "email": "[email 254 characters max], required",
        "password": "[unicode 255 characters max], required",
        "role": "[one of 'SHELTER', 'USER'], required"
    },
    "display_name": "[unicode 255 characters max], required",
    "country": "[one of 'MY', 'SG']",
    "address": {
        "unit_number": "[unicode 15 characters max]",
        "street_name": "[unicode 255 characters max]",
        "address_line_1": "[unicode 255 characters max]",
        "address_line_2": "[unicode 255 characters max]",
        "region": "[unicode 255 characters max]",
        "postcode": "[unicode 31 characters max]",
        "city": "[unicode 255 characters max]",
        "state": "[unicode 255 characters max]",
        "country": "[one of 'MY', 'SG'], required if address is provided",
    }
}
```

**Data Example**

```json
{
    "account": {
        "email": "testing@gmail.com",
        "password": "Password123",
        "role": "USER"
    },
    "display_name": "Test",
    "country": "MY",
    "address": {
        "unit_number": "11A",
        "street_name": "Jalan ABC",
        "postcode": "A12345",
        "city": "Deff",
        "state": "Selangor",
        "country": "MY"
    }
}
```

## Success Response

**Condition** : Request data is valid and account does not exist.

**Code** : `201 CREATED`

**Content Example**

```json
{
    "user_id": 1,
    "account": {
        "account_id": 2,
        "last_login": null,
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
```
