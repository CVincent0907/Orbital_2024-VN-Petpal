# Show Pets Listed by Shelter

Show all pets that are listed by the shelter with the given shelter_id.

**URL** : `/api/pets/list/:shelter_id`

**URL Parameters** : `shelter_id=[integer]`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

**Data constraints** : `{}`

## Response

**Code** : `200 OK`

**Content**

```json
{
    "pets": [
        {
            "pet_id": 1,
            "date_added": "2024-06-20T13:04:38.113633Z",
            "name": "Pet 1",
            "description": "This is Pet 1, created during a test.",
            "type": "DOG",
            "breed": "",
            "age": 1,
            "shelter_id": 1
        },
        {
            "pet_id": 2,
            "date_added": "2024-06-20T13:06:22.501242Z",
            "name": "Pet 2",
            "description": "This is Pet 2, also created during a test.",
            "type": "CAT",
            "breed": "",
            "age": 2,
            "shelter_id": 1
        }
    ]
}
```
