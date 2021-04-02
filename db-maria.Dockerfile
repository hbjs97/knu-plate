FROM mariadb:focal
LABEL maintainer="hbjs"

# time
ARG TZ="Asia/Seoul"
ENV TZ="Asia/Seoul"
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY ./db /docker-entrypoint-initdb.d