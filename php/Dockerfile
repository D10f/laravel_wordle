FROM php:8.2-fpm AS base
ENV PHPUSER=laravel
WORKDIR /var/www/html
RUN adduser $PHPUSER && \
    sed -i -E "s/^(user|group) = www-data/\1 = $PHPUSER/g" /usr/local/etc/php-fpm.d/www.conf
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
	libjpeg62-turbo-dev \
	libpng-dev \
	libxpm-dev \
	libwebp-dev \
    libzip-dev \
    zip \
    git
RUN docker-php-ext-configure \
    gd --enable-gd --with-webp --with-jpeg --with-xpm --with-freetype
RUN docker-php-ext-install \
    zip \
    gd \
    pdo \
    pdo_mysql

FROM base AS app
CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]

FROM base AS artisan
USER $PHPUSER
ENTRYPOINT ["php", "/var/www/html/artisan"]

FROM base AS composer
RUN curl -sS https://getcomposer.org/installer | \
    php -- --install-dir=/usr/local/bin --filename=composer
USER $PHPUSER
ENTRYPOINT ["composer"]

#FROM app AS production
#RUN docker-php-ext-install opcache
#COPY php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini
#CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]
