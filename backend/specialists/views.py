from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Specialist
from .serializers import SpecialistSerializer
from services.models import Service
from users.models import User


class SpecialistsByServiceView(APIView):
    """
    List specialists offering a given service.
    """

    def get(self, request, slug):
        # Get the service by slug
        service = get_object_or_404(Service, slug=slug)

        # Get all specialists associated with this service
        specialists = Specialist.objects.filter(services=service)

        # Serialize and return
        serializer = SpecialistSerializer(specialists, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SpecialistRegistrationView(APIView):
    """
    Register a new specialist and assign services.
    """

    def post(self, request):
        user_id = request.data.get('user_id')
        about = request.data.get('about')
        avatar_url = request.data.get('avatar_url')
        service_slugs = request.data.get('service_slugs')

        # Validate user
        user = get_object_or_404(User, id=user_id)

        # Validate services
        services = []
        for slug in service_slugs:
            service = Service.objects.filter(slug=slug).first()
            if service:
                services.append(service)
            else:
                return Response({"error": f"Invalid service slug: {slug}"}, status=status.HTTP_400_BAD_REQUEST)

        # Create specialist
        specialist = Specialist.objects.create(
            user=user,
            about=about,
            avatar_url=avatar_url,
            rating=0.0,
            nb_reviews=0
        )
        specialist.services.set(services)

        serializer = SpecialistSerializer(specialist)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
