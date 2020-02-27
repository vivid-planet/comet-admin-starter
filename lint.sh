#!/bin/sh
set -e

for SUBPROJECT in admin; do

    if [ -n "$INSTALL_DEPS" ]; then 
        docker-compose run --rm --no-deps $SUBPROJECT bash -c "npm install"
    fi

    docker-compose run --rm --no-deps $SUBPROJECT bash -c "npm run lint"
done
