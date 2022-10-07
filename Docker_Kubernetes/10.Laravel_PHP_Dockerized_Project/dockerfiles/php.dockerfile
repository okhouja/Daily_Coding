FROM php:8.1.2-fpm-alpine

WORKDIR /var/www/html

COPY src .

RUN docker-php-ext-install pdo pdo_mysql

RUN addgroup -g 1000 laravel && adduser -G laravel -g laravel -s /bin/sh -D laravel
 
USER laravel

# RUN chown -R www-data:www-data /var/www/html

# RUN chown -R www-data:www-data /var/www
# RUN chmod 755 /var/www