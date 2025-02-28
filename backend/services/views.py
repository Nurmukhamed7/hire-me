from django.db.models.aggregates import Count
from rest_framework.viewsets import ModelViewSet
from .models import Category, Service
from .serializers import CategorySerializer, ServiceSerializer


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.annotate(services_count=Count('services')).all()
    serializer_class = CategorySerializer


class ServiceViewSet(ModelViewSet):
    queryset = Service.objects.select_related('category').all()
    serializer_class = ServiceSerializer

    def get_serializer_context(self):
        return {'request': self.request}
