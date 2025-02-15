from rest_framework.serializers import ModelSerializer, StringRelatedField
from .models import Category, Service


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'slug', 'created_at']

class ServiceSerializer(ModelSerializer):
    category = StringRelatedField() # display the category name instead of the category ID

    class Meta:
        model = Service
        fields = ['name', 'slug', 'description', 'category', 'created_at']

