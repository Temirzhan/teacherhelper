import os

PATH = os.getenv( "APP_PATH", os.getcwd() )
SENDER_EMAIL  = os.getenv( "SENDER_EMAIL",  "" )
SMTP_SERVER   = "smtp.yandex.com"
smtp_user     = os.getenv( "SMTP_USER",  "" )
smtp_passwd   = os.getenv( "SMTP_PASSW", "" )
UPLOAD_FOLDER = os.path.join(PATH, "data", "report_storage")