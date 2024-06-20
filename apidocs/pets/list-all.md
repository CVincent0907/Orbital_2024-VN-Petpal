# Show All Pets

Show all listed pets.

**URL** : `/api/pets/list/`

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
        },
        {
            "pet_id": 3,
            "date_added": "2024-06-20T13:11:39.131970Z",
            "name": "Pet ???",
            "description": "This is Pet ??? uh...",
            "type": "DOG",
            "breed": "",
            "age": -1,
            "shelter_id": 2
        },
        {
            "pet_id": 4,
            "date_added": "2024-06-20T13:11:56.860294Z",
            "name": "Pet 1",
            "description": "This is Pet 1, huh? deja vu.",
            "type": "DOG",
            "breed": "",
            "age": 1,
            "shelter_id": 2
        },
        {
            "pet_id": 5,
            "date_added": "2024-06-20T13:12:31.417030Z",
            "name": "Pet 5",
            "description": "This is Pet 5, another pet created just for testing.",
            "type": "CAT",
            "breed": "",
            "age": 9,
            "shelter_id": 2
        }
    ]
}
```
