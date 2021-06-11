from .base import *

DEBUG = False

ALLOWED_HOSTS = [
    '37.140.192.209',
    '4paws.io',
    'www.4paws.io',
]

MIDDLEWARE += [
    'django.middleware.csrf.CsrfViewMiddleware',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'u1352366_default',
        'USER': 'u1352366_default',
        'PASSWORD': 'X3T_h_eX',
        'HOST': 'localhost',
    }
}

BASE_URL = 'https://www.4paws.io'
LOGIN_FORM_URL = BASE_URL + '/admin/json/api-auth/login/'
HOME_FORM_URL = BASE_URL + '/#/catalogs/'

LOGOUT_REDIRECT_URL = LOGIN_FORM_URL
LOGIN_REDIRECT_URL = LOGIN_FORM_URL
LOGIN_URL = LOGIN_FORM_URL

STATIC_ROOT = os.path.join(BASE_DIR, RELATIVE_PATH, '../static/')