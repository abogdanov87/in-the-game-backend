SERVER = 'DEVELOP'

if SERVER == 'PROD':
    from .prod import *

if SERVER == 'TEST':
    from .test import *

if SERVER == 'DEVELOP':
    from .base import *