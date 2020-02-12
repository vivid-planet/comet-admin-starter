#!/bin/sh
set -e

for SUBPROJECT in admin; do

    docker-compose run --rm $SUBPROJECT bash -c "npm install && npm run lint"
    if [ -n "$INSTALL_DEPS" ]; then 
        docker-compose run --rm $SUBPROJECT bash -c "npm install"
    fi

    docker-compose run --rm $SUBPROJECT bash -c "npm run lint"
done
