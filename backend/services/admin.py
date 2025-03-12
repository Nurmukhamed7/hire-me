from django.contrib import admin
from . import models

@admin.register(models.Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'category', 'category_slug']
    list_editable = ['slug']
    list_select_related = ['category']

    def category_slug(selfself, service):
        return service.category.slug

@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
