from django.db import models
from django.conf import settings
from users.models import User
from services.models import Service
from services.models import Work
from django.contrib import admin

class Specialist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='specialist_profile')
    about = models.TextField(blank=True, null=True)  # Specialist bio
    avatar_url = models.URLField(blank=True, null=True)  # Optional avatar
    work = models.ForeignKey(Work, on_delete=models.CASCADE, null=True, blank=True, related_name='specialists')  # Works they provide
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)  # Average rating
    nb_reviews = models.PositiveIntegerField(default=0)  # Number of reviews
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

    @admin.display(ordering='user__first_name')
    def first_name(self):
        return self.user.first_name

    @admin.display(ordering='user__last_name')
    def last_name(self):
        return self.user.last_name