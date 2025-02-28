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
        fields = ['name', 'slug', 'description', 'created_at', 'category']

    def create(self, validated_data):
        category_slug = self.context['category_id']
        category = Category.objects.get(slug=category_slug)
        return Service.objects.create(category=category, **validated_data)

