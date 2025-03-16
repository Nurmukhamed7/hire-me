from rest_framework import serializers
from .models import Specialist
from services.models import Service
from services.models import Work

class SpecialistSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Specialist
        fields = ['id', 'first_name', 'last_name', 'user_id', 'about', 'avatar_url', 'created_at', 'work']

