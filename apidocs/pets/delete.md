# Delete Pet

Delete the pet with the given pet_id if the authenticated shelter is its owner.

**URL** : `/api/pets/delete/`

**Method** : `DELETE`

**Auth required** : YES

**Permissions required** : Shelter is owner of pet

**Data** : 

```json
{
    "pet_id": "[integer which is the pet_id in the database], required"
}
```

## Success Response

**Condition** : If the Pet exists.

**Code** : `204 NO CONTENT`

**Content** : `{}`
