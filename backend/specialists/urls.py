from django.urls import path
from .views import SpecialistsByServiceView, SpecialistRegistrationView

urlpatterns = [
    path('services/<slug:slug>/specialists/', SpecialistsByServiceView.as_view()),
    path('specialists/register/', SpecialistRegistrationView.as_view()),
]
