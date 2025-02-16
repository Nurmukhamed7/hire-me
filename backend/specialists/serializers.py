from rest_framework import serializers
from .models import Specialist
from services.models import Service


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'slug', 'description']


class SpecialistSerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)  # Show full service info

    class Meta:
        model = Specialist
        fields = ['user', 'about', 'avatar_url', 'services', 'rating', 'nb_reviews', 'created_at']
