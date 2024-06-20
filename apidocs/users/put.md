# Update User Account

Allow the Authenticated User to update their details.

**URL** : `/api/users/update/`

**Method** : `PUT`

**Auth required** : YES

**Permissions required** : None

**Data constraints**

```json
{
    "display_name": "[unicode 255 characters max], cannot be blank",
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

Note that full address has to be provided for update.

**Data examples**

Partial data is allowed.

```json
{
    "display_name": "Aaron"
}
```

## Success Responses

**Condition** : Data provided is valid and User is Authenticated.

**Code** : `200 OK`

**Content example**

```json
{
    "user_id": 1,
    "account": {
        "account_id": 2,
        "last_login": "2024-06-20T13:54:57.027950Z",
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
    "display_name": "Aaron",
    "country": "MY",
    "date_joined": "2024-06-20T12:09:05.747557Z"
}
```
