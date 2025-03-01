from django.db.models.aggregates import Count
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Category, Service
from .serializers import CategorySerializer, ServiceSerializer


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.annotate(services_count=Count('services')).all()
    serializer_class = CategorySerializer

    def destroy(self, request, *args, **kwargs):
        category = self.get_object()

        if category.services.exists():
            return Response(
                {'error': "Category cannot be deleted because it includes one or more services."},
                status=status.HTTP_405_METHOD_NOT_ALLOWED
            )

        return super().destroy(request, *args, **kwargs)


class ServiceViewSet(ModelViewSet):
    serializer_class = ServiceSerializer

    def get_queryset(self):
        queryset = Service.objects.all()
        category_id=self.request.query_params.get('category_id')
        if category_id is not None:
            queryset = queryset.filter(category_id=category_id)

        return queryset

    def get_serializer_context(self):
        return {'request': self.request}
