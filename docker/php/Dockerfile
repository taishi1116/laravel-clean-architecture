FROM php:7.4-fpm-alpine

# composer install
COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN apk add --update bash
RUN docker-php-ext-install pdo pdo_mysql

