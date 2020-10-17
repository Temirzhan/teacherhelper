### Проект

Это какой то проект. Сайт с функционалом.

### Установка

Для установки потребуется `docker` и `git`.

**Первая установка.**

**Перед запуском команд необходимо отредактировать файл Dockerfile. Там нужно изменить почтовые данные от аккуанта яндекс логин пароль и адрес почты (SENDER_EMAIL, SMTP_USER, SMTP_PASSW).**

1. создать директорию и склонировать туда проект командой `git clone https://github.com/repen/azamattsite.git`

2. Выполнить `docker build -t site:latest .`

3. Выполнить `docker run --name site_azamat -d -p 8110:5000 site:latest`

Приложение будет доступно по адрессу 0.0.0.0:8110

- - -

**Обновление приложения.**

1. перейти в корень проекта и выполнить команду `git pull && docker rm -f site_azamat && docker build -t site:latest . && docker run --name site_azamat -d -p 8110:5000 site:latest`