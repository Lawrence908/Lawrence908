#!/bin/bash

# Replace with the GitHub username
USERNAME="github-username"

# Fetch the list of repositories using the GitHub API
repos=$(curl -s "https://api.github.com/users/$USERNAME/repos?per_page=100" | jq -r '.[].clone_url')

# Loop through each repository and clone it
for repo in $repos; do
  echo "Cloning $repo..."
  git clone $repo
done
