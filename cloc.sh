#~/bin/bash

cloc --read-lang-def=./cloc.def --exclude-dir node_modules,public javascript app "$@"
