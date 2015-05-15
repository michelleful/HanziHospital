#!/bin/bash
for file in *.mp3
    do avconv -i "${file}" "`echo ${file%.mp3}.ogg`";
done
