import os

PATH = os.getenv( "APP_PATH", os.getcwd() )
SENDER_EMAIL  = os.getenv( "SENDER_EMAIL",  "repente1@yandex.ru" )
SMTP_SERVER   = "smtp.yandex.com"
smtp_user     = os.getenv( "SMTP_USER",  "repente1" )
smtp_passwd   = os.getenv( "SMTP_PASSW", "password" )
UPLOAD_FOLDER = os.path.join(PATH, "data", "report_storage")