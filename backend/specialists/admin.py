from django.contrib import admin
from django.db.models import TextField
from django.forms.widgets import Textarea

from . import models

@admin.register(models.Specialist)
class SpecialistAdmin(admin.ModelAdmin):
    list_display = ['user', 'first_name', 'last_name', 'about', 'work']
    list_editable = ['about', 'work']
    ordering = ['user']
    formfield_overrides = {
        TextField: {'widget': Textarea(attrs={'rows': 2, 'cols': 20})},
    }

