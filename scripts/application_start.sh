#!/bin/bash
cd /var/www/html/bookstore/server
pm2 start ecosystem.config.cjs --env production