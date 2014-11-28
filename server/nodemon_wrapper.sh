#!/bin/bash
if [[ $1 = -v || $1 = --version || $1 = -version ]]
	then
node -v
else
nodemon $1
fi
