SERVER = 'DEVELOP'

if SERVER == 'PROD':
    from .prod import *

if SERVER == 'DEVELOP':
    from .base import *