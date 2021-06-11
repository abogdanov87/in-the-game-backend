from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import (
    Param,
    User,
)


class MyUserAdmin(UserAdmin):
    model = User
    list_display = (
        'id', 
        'username', 
        'last_name', 
        'first_name',
        'middle_name',
        'avatar',
    )
    list_display_links = ('username',)
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (
            _('Личные данные'),
            {
                'fields': (
                    'last_name',
                    'first_name',
                    'middle_name',
                    'avatar',
                ),
            },
        ),
        (
            _('Доступы'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                    'groups',
                    'user_permissions',
                ),
            },
        ),
    )


admin.site.register(User, MyUserAdmin)


class ParamInline(admin.TabularInline):
    model = Param
    fields = ('code', 'name', 'value_type', 'value', 'active')
    extra = 0