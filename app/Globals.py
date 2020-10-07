import os

PATH = os.getenv( "APP_PATH", os.getcwd() )
SENDER_EMAIL  = "repente@yandex.ru"
SMTP_SERVER   = "smtp.yandex.com"
smtp_user     = "repente"
smtp_passwd   = os.getenv( "SMTP_PASSW", "password" )
UPLOAD_FOLDER = os.path.join(PATH, "data")