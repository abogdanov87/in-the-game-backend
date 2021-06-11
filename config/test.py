from .base import *

DEBUG = False

ALLOWED_HOSTS = [
    '37.140.192.74',
    'qolibri24.ru',
    'www.qolibri24.ru',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'u1027973_default',
        'USER': 'u1027973_default',
        'PASSWORD': 'w!d3MAwv',
        'HOST': 'localhost',
    }
}

BASE_URL = 'http://www.qolibri24.ru'
LOGIN_FORM_URL = BASE_URL + '/admin/json/api-auth/login/'
HOME_FORM_URL = BASE_URL + '/#/catalogs/'

LOGOUT_REDIRECT_URL = LOGIN_FORM_URL
LOGIN_REDIRECT_URL = LOGIN_FORM_URL
LOGIN_URL = LOGIN_FORM_URL