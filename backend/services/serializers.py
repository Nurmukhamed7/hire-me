from rest_framework.serializers import ModelSerializer, StringRelatedField, SlugRelatedField
from rest_framework import serializers
from .models import Category, Service, Work

class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = ['id', 'name', 'slug', 'service']

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'services_count']

    services_count = serializers.IntegerField(read_only=True)

class ServiceSerializer(ModelSerializer):
    works = WorkSerializer(many=True, read_only=True)
    class Meta:
        model = Service
        fields = ['id', 'name', 'slug', 'category', 'works']


