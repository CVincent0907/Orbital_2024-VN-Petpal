from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, identifier=None, password=None, role="user", **extra_fields):
        if not identifier:
            raise ValueError("An identifier is required.")
        if not password:
            raise ValueError("A password is required.")
        if identifier[:2] != role[0].upper() + "-":
            raise ValueError("Prefix of identifier must match the role.")
        identifier = self.normalize_email(identifier)
        user = self.model(identifier=identifier, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, identifier=None, password=None, role="admin", **extra_fields):
        if not identifier:
            raise ValueError("An identifier is required.")
        if not password:
            raise ValueError("A password is required.")
        if role != "admin":
            raise ValueError("Role of superuser must be 'admin'.")
        user = self.create_user(identifier=identifier, password=password, role=role, **extra_fields)
        user.is_superuser = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = {
        "ADMIN": "admin",
        "SHELTER": "shelter",
        "USER": "user",
    }

    account_id = models.AutoField(primary_key=True)
    identifier = models.CharField(max_length=256, unique=True) # email prefixed with a letter based on acc role
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=15, choices=ROLE_CHOICES)

    USERNAME_FIELD = 'identifier'
    REQUIRED_FIELDS = []
    objects = UserManager()

    def __str__(self):
        return self.identifier


# class User(AbstractBaseUser, PermissionsMixin):
#     id = models.AutoField(primary_key=True)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=255)
#     name = models.CharField(max_length=255)
#     description = models.TextField(blank=True)
#     contact_email = models.EmailField(blank=True)
    
#     country = models.CharField(max_length=255, blank=True)
#     street_1 = models.CharField(max_length=255, blank=True)
#     street_2 = models.CharField(max_length=255, blank=True)
#     postcode = models.CharField(max_length=20, blank=True)
#     city = models.CharField(max_length=255, blank=True)
#     state = models.CharField(max_length=255, blank=True)
#     phone_number = models.CharField(max_length=20, blank=True)
    
#     date_joined = models.DateTimeField(auto_now_add=True)
#     is_staff = models.BooleanField(default=False)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['name', 'country', 'street_1', 'postcode', 'city', 'state']
#     objects = UserManager()

#     def __str__(self):
#         return self.email
