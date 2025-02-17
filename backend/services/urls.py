from django.urls import path
from . import views
from rest_framework_nested import routers

router = routers.SimpleRouter()
router.register('categories', views.CategoryViewSet)

categories_router = routers.NestedSimpleRouter(router, 'categories', lookup='category')
categories_router.register('services', views.ServiceViewSet, basename='category-services')

urlpatterns = router.urls + categories_router.urls

# urlpatterns = [
#     # path('categories/', views.CategoryListView.as_view()),
#
#     # List services by category
#     path('categories/<slug:slug>/services/', views.ServiceListView.as_view()),
#
#     # List specialists by service (optional)
#     path('services/<slug:slug>/specialists/', views.ServiceSpecialistView.as_view()),
# ]