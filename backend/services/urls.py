from django.urls import path
from . import views
from rest_framework_nested import routers

router = routers.SimpleRouter()
router.register('categories', views.CategoryViewSet)
router.register('services', views.ServiceViewSet, basename='services')

# categories_router = routers.NestedSimpleRouter(router, 'categories', lookup='category')
# categories_router.register('services', views.ServiceViewSet, basename='category-services')

urlpatterns = router.urls
