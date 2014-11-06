#!/bin/bash

echo "Linking post-commit hook"
(cd .git/hooks/; ln -s ../../script/post-commit.sh post-commit)

echo "Making script executable"
chmod 755 script/post-commit.sh

echo "Making link executable"
chmod 755 .git/hooks/post-commit
