#!/bin/sh


if [[ $1 ]]; then
    filename=$1

    echo The params is : $filename
    touch ./src/js/$filename.js
    touch ./src/view/$filename.pug
    touch ./src/scss/$filename.scss
fi
