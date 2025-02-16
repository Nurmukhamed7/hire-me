from rest_framework import status, viewsets
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Category, Service
from .serializers import CategorySerializer, ServiceSerializer

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

    def get_serializer_context(self):
        return {'request': self.request}

    # def get_queryset(self):
    #     return Category.objects.filter(slug=self.kwargs['slug'])

    # class CategoryListView(APIView):
#     """
#     GET /api/categories/
#     Lists all available categories.
#     """
#     def get(self, request):
#         categories = Category.objects.all()
#         serializer = CategorySerializer(categories, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

class ServiceListView(APIView):
    """
    GET /api/categories/<slug:slug>/services/
    Lists services for a given category.
    """
    def get(self, request, slug):
        category = get_object_or_404(Category, slug=slug)
        services = Service.objects.filter(category=category)
        serializer = ServiceSerializer(services, many=True)
        return Response({
            "category": category.name,
            "services": serializer.data
        }, status=status.HTTP_200_OK)

class ServiceSpecialistView(APIView):
    """
    GET /api/services/<slug:slug>/specialists/
    Dummy placeholder for specialists (for later development).
    """
    def get(self, request, slug):
        return Response({
            "service": slug,
            "specialists": [],
        }, status=status.HTTP_200_OK)