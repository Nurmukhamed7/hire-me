from rest_framework.viewsets import ModelViewSet
from .models import Category, Service
from .serializers import CategorySerializer, ServiceSerializer

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

    def get_serializer_context(self):
        return {'request': self.request}


class ServiceViewSet(ModelViewSet):
    serializer_class = ServiceSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Service.objects.filter(category__slug=self.kwargs['category_slug'])

    def get_serializer_context(self):
        return {'category_id': self.kwargs['category_slug']}


