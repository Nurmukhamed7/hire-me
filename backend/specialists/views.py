from rest_framework.decorators import action
from rest_framework.exceptions import NotAuthenticated
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet

from .models import Specialist
from .serializers import SpecialistSerializer
from services.models import Work

class IsOwnerOfSpecialist(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user_id == request.user.id

class SpecialistsViewSet(ModelViewSet):
    queryset = Specialist.objects.select_related('user').all()
    serializer_class = SpecialistSerializer
    permission_classes = [IsAuthenticated] # only GET Specialists

    def get_permissions(self): # only GET Specialists
        if self.request.method == 'GET' and self.action != 'me':
            return [AllowAny()]
        elif self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAuthenticated(), IsOwnerOfSpecialist()]
        return [IsAuthenticated()]


    def list(self, request, *args, **kwargs):
        slug = request.query_params.get("slug")
        if not slug:
            return super().list(request, *args, **kwargs)

        work = get_object_or_404(Work, slug=slug)

        specialists = Specialist.objects.filter(work=work)

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

        (specialists, created) = (Specialist.objects
                                  .select_related('user', 'work')
                                  .get_or_create(user_id=request.user.id))

        if request.method == 'GET':
            serializer = SpecialistSerializer(specialists)
            return Response(serializer.data)

        elif request.method == 'PUT':
            serializer = SpecialistSerializer(specialists, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='me/service-info')
    def service_info(self, request):
        if not request.user.is_authenticated:
            raise NotAuthenticated("Authentication credentials were not provided.")

        specialist = Specialist.objects.select_related('work__service').filter(user=request.user).first()
        if not specialist:
            return Response({'detail': 'Specialist profile not found'}, status=404)

        work = specialist.work
        service = work.service
        work_count = service.works.count()
        return Response({
            "specialist_id": specialist.id,
            "service_name": service.name,
            "work_count": work_count
        })

