FROM php:7.4-fpm-alpine

# composer install
COPY --from=composer /usr/bin/composer /usr/bin/composer

# node install
#RUN curl -sL https://deb.nodesource.com/setup_10.x | sh -
#RUN apt-get install -y nodejs
#
## yarn install
#RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
#RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/+sources.list.d/yarn.list
#RUN apt-get update && apt-get install yarn


RUN docker-php-ext-install pdo pdo_mysql