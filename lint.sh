#!/bin/sh
set -e

for SUBPROJECT in admin; do

    if [ -n "$INSTALL_DEPS" ]; then 
        echo "installing dependencies for $SUBPROJECT..."
        docker-compose run --rm --no-deps $SUBPROJECT bash -c "npm install"
    fi

    echo "linting $SUBPROJECT..."
    docker-compose run --rm --no-deps $SUBPROJECT bash -c "npm run lint"
done
