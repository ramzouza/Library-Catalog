#!/bin/bash

docker run \
--detach \
--name 343db \
--volume sql343db:/var/lib/mysql \
-p 3306:3306/tcp -p 33060:33060/tcp \
--env MYSQL_ROOT_PASSWORD=ribalestbeau \
--env MYSQL_USER=soen343 \
--env MYSQL_PASSWORD=ilovedocker \
mysql:8
