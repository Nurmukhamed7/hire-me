from django.db.models.aggregates import Count
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Category, Service, Work
from .permissions import isAdminOrReadOnly
from .serializers import CategorySerializer, ServiceSerializer, WorkSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.annotate(services_count=Count('services')).all()
    serializer_class = CategorySerializer
    permission_classes = [isAdminOrReadOnly]

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
    permission_classes = [isAdminOrReadOnly]

    def get_queryset(self):
        queryset = Service.objects.all()
        category_id=self.request.query_params.get('category_id')
        if category_id is not None:
            queryset = queryset.filter(category_id=category_id)

        return queryset

    def list(self, request, *args, **kwargs):
        if not request.query_params.get('category_id'):
            return Response({'error': 'You must provide category_id to list services.'}, status=status.HTTP_400_BAD_REQUEST)
        return super().list(request, *args, **kwargs)

    def get_serializer_context(self):
        return {'request': self.request}


class WorkViewSet(ModelViewSet):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer
    permission_classes = [isAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['name', 'service__name']

    def list(self, request, *args, **kwargs):
        slug = request.query_params.get("slug")
        search = request.query_params.get("search")

        if slug:
            # Get the work matching the slug
            work = get_object_or_404(Work, slug=slug)

            # Get the associated service and category
            service = work.service
            category = service.category

            # Get all works related to the same service
            works = Work.objects.filter(service=service).values("name", "slug")

            return Response({
                "category": {
                    "name": category.name,
                    "slug": category.slug
                },
                "works": list(works)
            })

        if search:
            queryset = self.filter_queryset(self.get_queryset())[:11]
            return Response(list(queryset.values('name', 'slug')))

        return Response(
            {'error': 'Provide either slug or search parameter to list works.'},
            status=status.HTTP_400_BAD_REQUEST
        )