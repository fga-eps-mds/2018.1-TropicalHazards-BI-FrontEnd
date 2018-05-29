#!/bin/bash
if [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
    echo "Deploying to homolog environment..."
    docker build -f Dockerfile.prod -t $DOCKERHUB_ORG/tropical-hazards-front:latest .
    docker login --username=$DOCKERHUB_USER --password=$DOCKERHUB_PASSWORD
    docker push $DOCKERHUB_ORG/tropical-hazards-front:latest
    docker run cdrx/rancher-gitlab-deploy upgrade --rancher-url $RANCHER_URL --rancher-key $RANCHER_ACCESS_KEY --rancher-secret $RANCHER_SECRET_KEY --environment Default --stack Observ --service frontend --finish-upgrade

    echo "Restarting Nginx"
    curl -u "${RANCHER_ACCESS_KEY}:${RANCHER_SECRET_KEY}" \
    -X POST \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{}' \
    "${RANCHER_URL}v2-beta/${PROJECT_AND_CONTAINER_URI}/?action=restart"
fi
