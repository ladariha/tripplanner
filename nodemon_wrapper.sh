#!/bin/bash
if [[ $1 = -v || $1 = --version || $1 = -version ]]
then
node -v
elif [[ $1 = --debug* ]]
then
node "$1" "$2"
else
nodemon $1
fi
