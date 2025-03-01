from rest_framework.serializers import ModelSerializer, StringRelatedField, SlugRelatedField
from rest_framework import serializers
from .models import Category, Service


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'created_at', 'services_count']

    services_count = serializers.IntegerField(read_only=True)

class ServiceSerializer(ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'slug', 'description', 'created_at', 'category']


