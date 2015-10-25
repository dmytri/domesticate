#!/bin/sh

echo ":: test with default dom"
./node_modules/.bin/mocha --delay test/default/*
echo ":: test with dom set as html"
./node_modules/.bin/mocha --delay test/html/*
echo ":: test with dom set with include"
./node_modules/.bin/mocha --delay test/include/*
