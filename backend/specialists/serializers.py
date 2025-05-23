from rest_framework import serializers
from .models import Specialist
from services.models import Service
from services.models import Work

class WorkMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = ['name', 'slug']

class SpecialistSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    work = WorkMiniSerializer(read_only=True)
    work_slug = serializers.SlugRelatedField(
        source='work',
        slug_field='slug',
        queryset=Work.objects.all(),
        write_only=True
    )


    class Meta:
        model = Specialist
        fields = ['id',
                  'first_name',
                  'last_name',
                  'user_id',
                  'about',
                  'avatar_url',
                  'created_at',
                  'work',
                  'work_slug'
                  ]
