FROM php:7.4-fpm-alpine
WORKDIR /var/www/html


# composer install
COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN composer require doctrine/dbal
RUN apk add --update bash
RUN apk add freetype libpng libjpeg-turbo freetype-dev libpng-dev libjpeg-turbo-dev
RUN docker-php-ext-install pdo pdo_mysql gd
EXPOSE 8000

# CMD sh ./entrypoint.sh