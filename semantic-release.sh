#!/bin/bash

if [ "${TRAVIS_BRANCH}" == "development" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
    echo "deploying it"      
    npx semantic-release
else
    echo "Skipping release"
fi


