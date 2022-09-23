class config:
    SECRET_KEY = 'secret_key'
    SESSION_COOKIE_NAME = 'session_cookie'

class productive_config(config):
    TEMPLATES_AUTO_RELOAD = False
    DEBUG = False
    TESTING = False

class dev_config(config):
    TEMPLATES_AUTO_RELOAD = True
    DEBUG = True
    TESTING = True