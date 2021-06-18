from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import (
    Param,
    User,
    Mail,
)


class MyUserAdmin(UserAdmin):
    model = User
    list_display = (
        'id', 
        'username', 
        'email',
        'nickname',
        'avatar',
    )
    list_display_links = ('username',)
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (
            _('Личные данные'),
            {
                'fields': (
                    'nickname',
                    'email',
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


@admin.register(Mail)
class MailAdmin(admin.ModelAdmin):
    model = Mail
    fields = [
        'email',
        'code',
        'sent_date',
    ]
    inlines = []
    list_display = ('email', 'sent_date', 'code',)
    list_display_links = ('email', 'sent_date', 'code',)
    list_filter = ('email', 'sent_date',)
    ordering = ('sent_date', 'email',)