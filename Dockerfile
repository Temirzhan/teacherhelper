#https://habr.com/ru/post/353234/
#docker build -t site:latest .
#docker run --name csgowebapp --rm -d -v csbet:/home/app/data -p 8010:5000 csbet:latest
#docker run --name site_app --rm -p 8110:5000 site:latest
#docker run --name csgowebapp --rm -v csbet:/home/app/data -p 8010:5000 -v /home/repente/prog/python/kwork/webapp/cssbet/app:/home/app --mount type=volume,source=datadb,destination=/home/app/db,readonly csgoweb:latest

FROM python:3.6-alpine

ENV path /site

WORKDIR ${path}

COPY app/requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY app ${path}/app

ENV APP_PATH ${path}/app

WORKDIR ${path}/app
#CMD tail -f /dev/null
CMD  python main.py