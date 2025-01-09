#!/bin/bash

# Loop through all files in the current directory
for file in *-100*; do
  # Remove only the '-100' part, preserving other suffixes and extensions
  new_name=$(echo "$file" | sed -E 's/-100-?//')
  
  # Rename the file
  mv "$file" "$new_name"
done
