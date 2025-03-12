from rest_framework import serializers
from .models import Specialist
from services.models import Service
from services.models import Work


# class ServiceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Service
#         fields = ['id', 'name', 'slug', 'description']

class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = ['id', 'name']


class SpecialistSerializer(serializers.ModelSerializer):
    # services = ServiceSerializer(many=True, read_only=True)  # Show full service info
    # works = WorkSerializer(many=True, read_only=True)

    class Meta:
        model = Specialist
        fields = ['user', 'about', 'avatar_url', 'rating', 'nb_reviews', 'created_at']
