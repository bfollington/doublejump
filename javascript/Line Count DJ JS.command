cd "$(dirname "$BASH_SOURCE")"
find . -name '*.js' | xargs wc -l
