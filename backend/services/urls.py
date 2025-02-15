from django.urls import path
from . import views
# from .views import CategoryListView

urlpatterns = [
    # path('categories/', CategoryListView.as_view()),
    path('categories/', views.category_list),
    path('categories/<slug:slug>/services/', views.service_list),
]