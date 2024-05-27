from .base import *

DEBUG = False

ALLOWED_HOSTS = [
    '31.31.196.253',
    'footbet.fun',
    'www.footbet.fun',
]

MIDDLEWARE += [
    'django.middleware.csrf.CsrfViewMiddleware',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'u2662691_default',
        'USER': 'u2662691_default',
        'PASSWORD': 'kG0R44FppFtRrOg3',
        'HOST': 'localhost',
    }
}

BASE_URL = 'https://www.footbet.fun'
LOGIN_FORM_URL = BASE_URL + '/admin/json/api-auth/login/'
HOME_FORM_URL = BASE_URL + '/#/'

LOGOUT_REDIRECT_URL = LOGIN_FORM_URL
LOGIN_REDIRECT_URL = LOGIN_FORM_URL
LOGIN_URL = LOGIN_FORM_URL

STATIC_ROOT = os.path.join(BASE_DIR, RELATIVE_PATH, '../static/')