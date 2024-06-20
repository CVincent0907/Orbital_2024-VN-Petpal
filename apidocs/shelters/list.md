# Show All Shelters

Show all shelters.

**URL** : `/api/shelters/list/`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

**Data constraints** : `{}`

## Response

**Code** : `200 OK`

**Content**

```json
{
    "shelters": [
        {
            "shelter_id": 1,
            "account": {
                "account_id": 1,
                "last_login": "2024-06-20T13:02:13.007748Z",
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
        },
        {
            "shelter_id": 2,
            "account": {
                "account_id": 3,
                "last_login": "2024-06-20T13:10:31.861230Z",
                "email": "testing3@gmail.com",
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
    ]
}
```
