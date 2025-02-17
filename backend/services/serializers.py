from rest_framework.serializers import ModelSerializer, StringRelatedField, SlugRelatedField
from .models import Category, Service


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'slug', 'created_at']

class ServiceSerializer(ModelSerializer):
    # category = SlugRelatedField(queryset=Category.objects.all(), slug_field='slug') # display the category name instead of the category ID

    class Meta:
        model = Service
        fields = ['name', 'slug', 'description', 'created_at']

    def create(self, validated_data):
        category_slug = self.context['category_id']
        category = Category.objects.get(slug=category_slug)
        return Service.objects.create(category=category, **validated_data)

