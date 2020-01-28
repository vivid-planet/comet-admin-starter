#!/bin/sh
set -e

for SUBPROJECT in admin; do

    #docker-compose run --rm $SUBPROJECT bash -c "npm install && npm run lint"
    if [ -n "$INSTALL_DEPS" ]; then 
        docker run --rm -v `pwd`/$SUBPROJECT:/opt/app-root/src \
            -e NPM_TOKEN=$NPM_TOKEN \
            -u ${RUN_AS_UID}:0 \
            eu.gcr.io/vivid-planet-public/dev/node-10-dev:master \
            bash -c "npm install"
    fi

    docker run --rm -v `pwd`/$SUBPROJECT:/opt/app-root/src \
        -e NPM_TOKEN=$NPM_TOKEN \
        -u ${RUN_AS_UID}:0 \
        eu.gcr.io/vivid-planet-public/dev/node-10-dev:master \
        bash -c "npm run lint"
done
