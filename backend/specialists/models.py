from django.db import models
from django.conf import settings
from users.models import User
from services.models import Service

class Specialist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='specialist_profile')
    about = models.TextField(blank=True, null=True)  # Specialist bio
    avatar_url = models.URLField(blank=True, null=True)  # Optional avatar
    services = models.ManyToManyField(Service, related_name='specialists')  # Services they provide
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)  # Average rating
    nb_reviews = models.PositiveIntegerField(default=0)  # Number of reviews
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
