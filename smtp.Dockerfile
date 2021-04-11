FROM node:12.19
LABEL maintainer="hbjs"

# time
ARG TZ="Asia/Seoul"
ENV TZ="Asia/Seoul"
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# source
WORKDIR /var/www/html
COPY ./smtp /var/www/html

COPY ./wait-for-it.sh /wait-for-it.sh
RUN ["chmod", "+x", "/wait-for-it.sh"]

CMD [ "bash", "-c", "/wait-for-it.sh db-maria:3306 --strict npm install && npm run start" ]