#!/usr/bin/env python3

import os
import json
import shutil
import argparse
import subprocess
from pathlib import Path

def load_config(config_path):
    """Load configuration from JSON file."""
    with open(config_path, 'r') as f:
        return json.load(f)

def create_project_structure(app_name, config):
    """Create the basic project structure."""
    base_dir = Path(app_name)
    
    # Create main directories
    os.makedirs(base_dir, exist_ok=True)
    os.makedirs(base_dir / "frontend", exist_ok=True)
    os.makedirs(base_dir / "backend", exist_ok=True)
    
    print(f"Created project structure for {app_name}")
    return base_dir

def setup_frontend(base_dir, config):
    """Set up the frontend using create_react_app helper."""
    frontend_dir = base_dir / "frontend"
    app_name = base_dir.name
    
    # Use the create_react_app helper
    subprocess.run(["create_react_app", app_name], cwd=frontend_dir.parent)
    
    # Move the created app into the frontend directory
    for item in (frontend_dir.parent / app_name).iterdir():
        if item.is_file():
            shutil.copy(item, frontend_dir)
        else:
            shutil.copytree(item, frontend_dir / item.name, dirs_exist_ok=True)
    
    # Remove the temporary directory
    shutil.rmtree(frontend_dir.parent / app_name)
    
    # Copy template files
    template_dir = Path(__file__).parent.parent / "templates" / "frontend"
    
    # Copy styles
    shutil.copy(template_dir / "src" / "styles" / "index.css", frontend_dir / "src")
    
    # Copy layout components
    layout_dir = frontend_dir / "src" / "components" / "layout"
    os.makedirs(layout_dir, exist_ok=True)
    shutil.copy(template_dir / "src" / "components" / "layout" / "Header.jsx", layout_dir)
    shutil.copy(template_dir / "src" / "components" / "layout" / "Header.css", layout_dir)
    shutil.copy(template_dir / "src" / "components" / "layout" / "Footer.jsx", layout_dir)
    shutil.copy(template_dir / "src" / "components" / "layout" / "Footer.css", layout_dir)
    
    # Update branding in components
    update_branding(layout_dir / "Header.jsx", config["branding"]["name"])
    update_branding(layout_dir / "Footer.jsx", config["branding"]["name"])
    
    print("Frontend setup completed")

def setup_backend(base_dir, config):
    """Set up the backend using create_fastapi_app helper."""
    backend_dir = base_dir / "backend"
    app_name = base_dir.name
    
    # Use the create_fastapi_app helper
    subprocess.run(["create_fastapi_app", app_name], cwd=backend_dir.parent)
    
    # Move the created app into the backend directory
    for item in (backend_dir.parent / app_name).iterdir():
        if item.is_file():
            shutil.copy(item, backend_dir)
        else:
            shutil.copytree(item, backend_dir / item.name, dirs_exist_ok=True)
    
    # Remove the temporary directory
    shutil.rmtree(backend_dir.parent / app_name)
    
    # Copy template files
    template_dir = Path(__file__).parent.parent / "templates" / "backend"
    
    # Ensure CORS is properly configured
    main_py = backend_dir / "app" / "main.py"
    if main_py.exists():
        with open(main_py, 'r') as f:
            content = f.read()
        
        if "CORSMiddleware" not in content:
            with open(template_dir / "app" / "main.py", 'r') as f:
                template_content = f.read()
            
            with open(main_py, 'w') as f:
                f.write(template_content)
    
    print("Backend setup completed")

def update_branding(file_path, brand_name):
    """Update branding in template files."""
    with open(file_path, 'r') as f:
        content = f.read()
    
    content = content.replace("XyLo.Dev", brand_name)
    
    with open(file_path, 'w') as f:
        f.write(content)

def create_readme(base_dir, config):
    """Create a README.md file for the project."""
    readme_content = f"""# {config['branding']['name']} Fullstack Application

This project was generated using the XyLo.Dev Web App Generator.

## Project Structure

- `frontend/`: React frontend with Tailwind CSS and shadcn/ui
- `backend/`: FastAPI backend with SQLAlchemy

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
poetry install
poetry run fastapi dev app/main.py
```

## Features

- Modern UI with dark theme
- Responsive design
- API integration
- Authentication ready

## Deployment

See the deployment guides in each directory for instructions on deploying the frontend and backend.
"""
    
    with open(base_dir / "README.md", 'w') as f:
        f.write(readme_content)

def main():
    parser = argparse.ArgumentParser(description="Generate a fullstack web application with XyLo.Dev branding")
    parser.add_argument("app_name", help="Name of the application to generate")
    parser.add_argument("--config", default=None, help="Path to custom configuration file")
    
    args = parser.parse_args()
    
    # Load configuration
    config_path = args.config
    if not config_path:
        config_path = Path(__file__).parent.parent / "config" / "default_config.json"
    
    config = load_config(config_path)
    
    # Create project structure
    base_dir = create_project_structure(args.app_name, config)
    
    # Setup frontend and backend
    setup_frontend(base_dir, config)
    setup_backend(base_dir, config)
    
    # Create README
    create_readme(base_dir, config)
    
    print(f"\nProject {args.app_name} has been successfully generated!")
    print(f"To get started, navigate to the project directory:")
    print(f"  cd {args.app_name}")

if __name__ == "__main__":
    main()
