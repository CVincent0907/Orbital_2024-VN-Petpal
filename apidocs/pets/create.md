# Create Pet

Create a pet with the logged in shelter account as the owner.

**URL** : `/api/pets/create/`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : IsShelter

**Data Constraints**

"account" and "name" fields are required.

```json
{
    "name": "[unicode 255 characters max]",
    "description": "[unicode]",
    "type": "[unicode 20 characters max]",
    "breed": "[unicode 255 characters max]",
    "age": "[integer value between -2147483648 & 2147483647]"
}
```

**Data Example**

```json
{
    "name": "Pet 1",
    "description": "This is Pet 1, created during a test.",
    "type": "DOG",
    "breed": "",
    "age": 1
}
```

## Success Response

**Condition** : Request data is valid and account does not exist.

**Code** : `201 CREATED`

**Content Example**

```json
{
    "pet_id": 1,
    "date_added": "2024-06-20T13:04:38.113633Z",
    "name": "Pet 1",
    "description": "This is Pet 1, created during a test.",
    "type": "DOG",
    "breed": "",
    "age": 1,
    "shelter_id": 1
}
```
