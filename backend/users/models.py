# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class City(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class User(AbstractUser):
    phone = models.CharField(max_length=15, unique=True, null=True, blank=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True, related_name='residents')

    def __str__(self):
        return self.username
