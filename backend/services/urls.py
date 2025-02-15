from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoryListView.as_view()),

    # List services by category
    path('categories/<slug:slug>/services/', views.ServiceListView.as_view()),

    # List specialists by service (optional)
    path('services/<slug:slug>/specialists/', views.ServiceSpecialistView.as_view()),
]