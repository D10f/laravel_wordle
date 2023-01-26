FROM nginx:1.23

ENV NGINXUSER=laravel

RUN adduser $NGINXUSER && \
    sed -i -E "s/^user\s+(www-data|nginx)/user\t${NGINXUSER}/" /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 8000
 
