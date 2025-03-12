#!/bin/bash

# Test script for the web app generator

# Set variables
TEST_APP_NAME="test-xylo-app"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEST_DIR="$SCRIPT_DIR/$TEST_APP_NAME"

# Clean up any previous test
rm -rf "$TEST_DIR"

# Run the generator
python $SCRIPT_DIR/generate_project.py $TEST_APP_NAME

# Check if the directories were created
if [ -d "$TEST_DIR/frontend" ] && [ -d "$TEST_DIR/backend" ]; then
    echo "✅ Project structure created successfully"
else
    echo "❌ Failed to create project structure"
    exit 1
fi

# Check frontend setup
if [ -f "$TEST_DIR/frontend/package.json" ]; then
    echo "✅ Frontend setup successful"
else
    echo "❌ Frontend setup failed"
    exit 1
fi

# Check backend setup
if [ -f "$TEST_DIR/backend/pyproject.toml" ]; then
    echo "✅ Backend setup successful"
else
    echo "❌ Backend setup failed"
    exit 1
fi

# Check README
if [ -f "$TEST_DIR/README.md" ]; then
    echo "✅ README created successfully"
else
    echo "❌ Failed to create README"
    exit 1
fi

echo "All tests passed! The generator is working correctly."
