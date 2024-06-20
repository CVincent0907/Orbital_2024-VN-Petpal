# Update Shelter Account

Allow the Authenticated Shelter to update their details.

**URL** : `/api/shelters/update/`

**Method** : `PUT`

**Auth required** : YES

**Permissions required** : None

**Data constraints**

```json
{
    "name": "[unicode 255 characters max], cannot be blank",
    "description": "[unicode]",
    "contact_email": "[email 254 characters max]",
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
    },
    "phone_number": "[numeric 15 digits max, leading '+' is implicit]"
}
```

Note that full address has to be provided for update.

**Data examples**

Partial data is allowed.

```json
{
    "name": "Shelter 1",
    "description": "Hello hello! This is Shelter 1."
}
```

## Success Responses

**Condition** : Data provided is valid and User is Authenticated.

**Code** : `200 OK`

**Content example**

```json
{
    "shelter_id": 1,
    "account": {
        "account_id": 1,
        "last_login": "2024-06-20T13:52:01.781690Z",
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
    "name": "Shelter 1",
    "description": "Hello hello! This is Shelter 1.",
    "contact_email": "testing.contact@gmail.com",
    "country": "MY",
    "phone_number": "1234567890",
    "date_joined": "2024-06-20T12:02:29.099489Z"
}
```
