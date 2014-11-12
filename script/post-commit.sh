#!/bin/sh

cd $(git rev-parse --show-toplevel)

changed_files=$(git diff-tree --no-commit-id --name-only -r HEAD)

js_files_to_lint=$(echo $changed_files | grep .js)

if [ $? -eq 0 ]; then
    if [ -f ./node_modules/grunt-eslint/node_modules/eslint/bin/eslint.js ]; then
        echo "Running eslint.."
        if ! ./node_modules/grunt-eslint/node_modules/eslint/bin/eslint.js $js_files_to_lint ; then
            echo "Linting failed! Please consider fixing the above-mentioned issues."
        fi
    else
        echo "Run npm install to automatically lint javascripts!"
    fi
fi
