# Create Shelter Account

Create a shelter account if the provided email does not have a registered
shelter account.

**URL** : `/api/auth/register/shelter/`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

**Data Constraints**

"account" and "name" fields are required.

```json
{
    "account": {
        "email": "[email 254 characters max], required",
        "password": "[unicode 255 characters max], required",
        "role": "[one of 'SHELTER', 'USER'], required"
    },
    "name": "[unicode 255 characters max], required",
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

**Data Example**

```json
{
    "account": {
        "email": "testing@gmail.com",
        "password": "Password123",
        "role": "SHELTER"
    },
    "name": "Test",
    "description": "testing testing 123",
    "contact_email": "testing.contact@gmail.com",
    "country": "MY",
    "address": {
        "unit_number": "11A",
        "street_name": "Jalan ABC",
        "postcode": "A12345",
        "city": "Deff",
        "state": "Selangor",
        "country": "MY"
    },
    "phone_number": "1234567890"
}
```

## Success Response

**Condition** : Request data is valid and account does not exist.

**Code** : `201 CREATED`

**Content Example**

```json
{
    "shelter_id": 1,
    "account": {
        "account_id": 1,
        "last_login": null,
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
    "date_joined": "2024-06-20T12:02:29.099489Z"
}
```
