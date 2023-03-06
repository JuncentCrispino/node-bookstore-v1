#!/bin/bash
echo 'run after_install.sh: ' >> /home/ubunu/bookstore/server/deploy.log

echo 'cd /home/ec2-user/nodejs-server-cicd' >> /home/ubunu/bookstore/server/deploy.log
cd /home/ubunu/bookstore/server >> /home/ubunu/bookstore/server/deploy.log

echo 'npm install' >> /home/ubunu/bookstore/server/deploy.log 
npm install >> /home/ubunu/bookstore/server/deploy.log