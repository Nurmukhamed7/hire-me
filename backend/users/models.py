from django.contrib.auth.models import AbstractUser
from django.db import models

# class User(AbstractUser):
#     phone = models.CharField(max_length=15, unique=True)
#     city = models.CharField(max_length=100, blank=True, null=True)
#
#     def __str__(self):
#         return self.username
