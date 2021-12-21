import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):

    # Flask settings
    CSRF_ENABLED = True
    JSON_AS_ASCII = False

    # Flask-SQLAlchemy settings
    SECRET_KEY = os.environ.get('SECRET_KEY', 'appsecretkey')
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI',
                                             f'sqlite:///{os.path.join(basedir, "database/data.db")}')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Print production database and secret key confirmation
    if SQLALCHEMY_DATABASE_URI != f'sqlite:///{os.path.join(basedir, "database/data.db")}':
        print('Production database.')
    if SECRET_KEY != 'appsecretkey':
        print('Safe secret key set up.')

    # Celery settings
    UPLOAD_FOLDER = "app/uploads/"
    CELERY_BROKER_URL = "redis://localhost"
    CELERY_RESULT_BACKEND = "redis://localhost"

    # File processing library location
    NLP_LIBS_FOLDER = basedir + "/file_processing/libs"

    # Flask-User settings
    USER_ENABLE_EMAIL = True  # TODO: apply Flask-Mail production configuration
    MAIL_SERVER = 'smtp.mailtrap.io'
    MAIL_PORT = 2525
    MAIL_USERNAME = '90febdd5f3c740'
    MAIL_PASSWORD = '694cfc95abe6a4'
    MAIL_DEFAULT_SENDER = '90febdd5f3c740'
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    USER_ENABLE_CONFIRM_EMAIL = False

    # Flask-Babel settings
    LANGUAGES = {"en": "English",
                 "ka": "Georgian"}
    BABEL_DEFAULT_LOCALE = 'ka'

    # Flask-Dance
    GOOGLE_OAUTH_CLIENT_ID = '52534920261-icpdfm2ul6mo2bcljm893vgg852ruhvs.apps.googleusercontent.com'
    GOOGLE_OAUTH_CLIENT_SECRET = '8DYkW12OxSBJjrAVco-c-RWo'
    OAUTHLIB_RELAX_TOKEN_SCOPE = 1
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "True"

    # Flask-Session
    SESSION_TYPE = 'redis'

    # Antiword
    os.environ['ANTIWORDHOME'] = basedir

    # Constants
    DEMO_LEMMATIZATION_LIMIT = 250
