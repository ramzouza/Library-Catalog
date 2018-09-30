#!/bin/bash

docker run \
--detach \
--name 343db \
--volume sql343db:/var/lib/mysql \
-p 3306:3306/tcp -p 33060:33060/tcp \
--env MYSQL_ROOT_PASSWORD=ribalestbeau \
--env MYSQL_USER=soen343 \
--env MYSQL_PASSWORD=ilovedocker \
mysql:5 

## Init Script
## CREATE TABLE users (id MEDIUMINT NOT NULL AUTO_INCREMENT, password_hash VARCHAR(20), isActive INT, firstName VARCHAR(20), lastName VARCHAR(20), physicalAddress VARCHAR(20), email VARCHAR(20), phoneNumber VARCHAR(20), isAdmin INT, PRIMARY KEY (id))
## ALTER TABLE users AUTO_INCREMENT=34242;
## INSERT INTO users VALUES (0,'admin', 1,'administrator', 'administrator', "everywhere","admin@gmail.com","5149999999",1)


 