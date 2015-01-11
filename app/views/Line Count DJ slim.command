cd "$(dirname "$BASH_SOURCE")"
find . -name '*.slim' | xargs wc -l
