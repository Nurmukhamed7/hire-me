from urllib.parse import urlencode

from django.contrib import admin
from django.db.models import TextField
from django.db.models.aggregates import Count
from django.forms.widgets import Textarea
from django.utils.html import format_html
from django.urls import reverse
from . import models

class WorkInline(admin.TabularInline):
    model = models.Work
    extra = 1
    formfield_overrides = {
        TextField: {'widget': Textarea(attrs={'rows': 2, 'cols': 20})},
    }
    prepopulated_fields = {
        "slug": ["name"]
    }

@admin.register(models.Service)
class ServiceAdmin(admin.ModelAdmin):
    autocomplete_fields = ['category']
    prepopulated_fields = {
        "slug": ["name"]
    }
    list_display = ['name', 'slug', 'category', 'category_slug']
    list_editable = ['slug']
    list_filter = ['category', 'category__slug']
    list_select_related = ['category']
    inlines = [WorkInline]
    search_fields = ['name__istartswith', 'slug__istartswith']

    def category_slug(selfself, service):
        return service.category.slug



@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {
        "slug": ["name"]
    }
    list_display = ['name', 'slug', 'services_count']
    search_fields = ['name__istartswith', 'slug__istartswith']

    @admin.display(ordering='services_count')
    def services_count(selfself, category):
        url = (reverse('admin:services_service_changelist')
               + '?'
               + urlencode({'category__id': str(category.id)}))

        return format_html('<a href="{}">{}</a>', url, category.services_count)


    def get_queryset(self, request):
        return (super()
                .get_queryset(request)
                .annotate(services_count=Count('services')))

@admin.register(models.Work)
class WorkAdmin(admin.ModelAdmin):
    autocomplete_fields = ['service']
    prepopulated_fields = {
        "slug": ["name"]
    }
    list_display = ['name', 'slug', 'service']
    list_filter = ['service']
    search_fields = ['name__istartswith', 'slug__istartswith']
