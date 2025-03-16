from django.urls import path
from . import views
from rest_framework_nested import routers


router = routers.SimpleRouter()

router.register('specialists', views.SpecialistsViewSet)

urlpatterns = router.urls
