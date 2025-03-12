from django.urls import path
from . import views
from rest_framework_nested import routers


router = routers.SimpleRouter()

router.register('specialists', views.SpecialistsViewSet)

urlpatterns = router.urls
# urlpatterns = [
#     path('services/<slug:slug>/specialists/', SpecialistsByServiceView.as_view()),
#     path('specialists/register/', SpecialistRegistrationView.as_view()),
# ]
