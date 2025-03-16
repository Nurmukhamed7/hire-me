from rest_framework.decorators import action
from rest_framework.exceptions import NotAuthenticated
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet

from .models import Specialist
from .serializers import SpecialistSerializer
from services.models import Work


class SpecialistsViewSet(ModelViewSet):
    queryset = Specialist.objects.all()
    serializer_class = SpecialistSerializer
    permission_classes = [IsAuthenticated] # only GET Specialists

    def get_permissions(self): # only GET Specialists
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]


    def list(self, request, *args, **kwargs):
        slug = request.query_params.get("slug")
        if not slug:
            return super().list(request, *args, **kwargs)

        # Get the work by slug
        work = get_object_or_404(Work, slug=slug)

        # Get all specialists offering this work
        specialists = Specialist.objects.filter(work=work)

        # Serialize the specialists
        serializer = SpecialistSerializer(specialists, many=True)

        return Response({
            "work": {
                "name": work.name,
                "slug": work.slug
            },
            "specialists": serializer.data
        })

    @action(detail=False, methods=['GET', 'PUT'])
    def me(self, request):
        if not request.user.is_authenticated:
            raise NotAuthenticated("Authentication credentials were not provided.")

        (specialists, created) = Specialist.objects.get_or_create(user_id=request.user.id)
        if request.method == 'GET':
            serializer = SpecialistSerializer(specialists)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = SpecialistSerializer(specialists, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

