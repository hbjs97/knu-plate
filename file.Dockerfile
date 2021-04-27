FROM node:12.19
LABEL maintainer="hbjs"

# time
ARG TZ="Asia/Seoul"
ENV TZ="Asia/Seoul"
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# source
WORKDIR /var/www/html
COPY ./file /var/www/html

CMD [ "bash", "-c", "npm install && npm run start" ]