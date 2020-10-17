#https://habr.com/ru/post/353234/
#docker build -t site:latest .
#docker run --name site_azamat -d -p 8110:5000 site:latest


FROM python:3.6-alpine

ENV path /site

WORKDIR ${path}

COPY app/requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY app ${path}/app

ENV APP_PATH ${path}/app

ENV SENDER_EMAIL test_user_yandex@yandex.ru
ENV SMTP_USER test_user_yandex
ENV SMTP_PASSW password

WORKDIR ${path}/app
#CMD tail -f /dev/null
CMD  python main.py