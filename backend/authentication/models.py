from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, identifier=None, password=None, email=None, role="USER"):
        if not email:
            raise ValueError("An email is required.")
        if not password:
            raise ValueError("A password is required.")
        identifier = role[0].upper() + "#" + self.normalize_email(email)
        user = self.model(identifier=identifier, email=email, role=role)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, identifier=None, password=None, email=None, role="ADMIN"):
        if not email:
            raise ValueError("An email is required.")
        if not password:
            raise ValueError("A password is required.")
        if role != "ADMIN":
            raise ValueError("Role of superuser must be 'ADMIN'.")
        user = self.create_user(identifier=identifier, password=password, email=email, role=role)
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
    email = models.EmailField()
    role = models.CharField(max_length=15, choices=ROLE_CHOICES)

    USERNAME_FIELD = 'identifier'
    REQUIRED_FIELDS = ['email']
    objects = UserManager()

    class Meta:
        unique_together = ('email', 'role')

    def __str__(self):
        return self.identifier
