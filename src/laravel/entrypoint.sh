#!/bin/bash

export ENV=production
php artisan config:clear
php artisan migrate 
php artisan serve