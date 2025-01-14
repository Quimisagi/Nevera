#!/bin/bash

# Directory to scan (default: current directory)
DIRECTORY=${1:-.}
# Output file
OUTPUT_FILE="iconPaths.js"

# Start the JS object
echo "const iconPaths = {" > $OUTPUT_FILE

# Iterate through all files in the directory
for file in "$DIRECTORY"/*; do
    if [ -f "$file" ]; then
        # Get the file name without path and extension
        filename=$(basename -- "$file")
        icon_name="${filename%.*}"
        # Escape special characters for the file path
        escaped_path=$(realpath "$file" | sed 's/"/\\"/g')
        # Write the entry with require to the JS file
        echo "  \"$icon_name\": require(\"$escaped_path\")," >> $OUTPUT_FILE
    fi
done

# End the JS object
echo "};" >> $OUTPUT_FILE
echo "export default iconPaths;" >> $OUTPUT_FILE

echo "JavaScript file '$OUTPUT_FILE' has been created successfully."
