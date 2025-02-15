from rest_framework.decorators import api_view

from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Category, Service
from .serializers import CategorySerializer


# class CategoryListView(APIView):
#     """
#     GET /api/v1/categories/
#     Lists all available categories.
#     """
#     def get(self, request):
#         categories = Category.objects.all()
#         serializer = CategorySerializer(categories, many=True)
#         return Response({"status": True, "content": serializer.data}, status=status.HTTP_200_OK)

@api_view()
def category_list(request):
    return Response('ok')

@api_view()
def service_list(request, slug):
    return Response(slug)