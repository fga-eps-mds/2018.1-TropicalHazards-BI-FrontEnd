#!/bin/bash

echo 'Starting production server...'

if [ "$NODE_ENV" == "production" ]; then
    npm run prod 
else
    npm run dev
fi;
