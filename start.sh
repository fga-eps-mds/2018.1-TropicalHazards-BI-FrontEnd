#!/bin/bash


if [ "$NODE_ENV" == "production" ]; then
    echo 'Starting production server...'
    npm run prod 
else
    echo 'Starting development server...'
    npm install
    npm run dev
fi;
