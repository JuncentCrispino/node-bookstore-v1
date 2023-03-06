#!/bin/bash

echo 'run application_start.sh: ' >> /home/ubunu/bookstore/server/deploy.log

echo 'pm2 start ecosystem.config.cjs --env production' >> /home/ubunu/bookstore/server/deploy.log
pm2 start ecosystem.config.cjs --env production >> /home/ubunu/bookstore/server/deploy.log