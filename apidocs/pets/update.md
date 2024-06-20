# Update Pet

Update the pet with the given pet_id if the authenticated shelter is its owner.

**URL** : `/api/pets/update/`

**Method** : `PUT`

**Auth required** : YES

**Permissions required** : Shelter is owner of pet

**Data constraints**

```json
{
    "pet_id": "[integer, which is the pet_id in the database], required",
    "name": "[unicode 255 characters max]",
    "description": "[unicode]",
    "type": "[unicode 20 characters max]",
    "breed": "[unicode 255 characters max]",
    "age": "[integer value between -2147483648 & 2147483647]"
}
```

**Data example** 

Partial data is allowed

```json
{
    "pet_id": 1,
    "name": "Happy :)",
    "description": "A happy pet!"
}
```

## Success Responses

**Condition** : Update can be performed either fully or partially by the Owner
of the Pet.

**Code** : `200 OK`

**Content example**

```json
{
    "pet_id": 1,
    "date_added": "2024-06-20T13:04:38.113633Z",
    "name": "Happy :)",
    "description": "A happy pet!",
    "type": "DOG",
    "breed": "",
    "age": 1,
    "shelter_id": 1
}
```
