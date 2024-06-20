# Show Pet Info

Show info of the pet with the given pk (pet_id).

**URL** : `/api/pets/detail/:pk`

**URL Parameters** : `pk=[integer]` where `pk` is the ID of the Pet in the
database.

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

**Data constraints** : `{}`

## Response

**Code** : `200 OK`

**Content**

```json
{
    "pet_id": 1,
    "date_added": "2024-06-20T13:04:38.113633Z",
    "name": "Pet 1",
    "description": "This is Pet 1, created during a test.",
    "type": "DOG",
    "breed": "",
    "age": 1,
    "shelter_id": 3
}
```
