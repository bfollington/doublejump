cd app
echo "Ruby:"
find . -name '*.rb' | xargs wc -l
echo "Slim:"
find . -name '*.slim' | xargs wc -l
echo "SCSS:"
find . -name '*.scss' | xargs wc -l
cd ..
cd javascript
echo "Javascript:"
find . -name '*.js' | xargs wc -l
