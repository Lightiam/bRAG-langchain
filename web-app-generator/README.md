# XyLo.Dev Web App Generator

A tool for generating fullstack web applications with XyLo.Dev branding and best practices.

## Features

- Scaffolds a complete fullstack application
- Frontend: React, Vite, Tailwind CSS, TypeScript, shadcn/ui
- Backend: FastAPI, SQLAlchemy, Pydantic
- Dark theme UI with professional design
- Consistent XyLo.Dev branding
- Deployment configuration for Netlify and Fly.io

## Usage

```bash
cd web-app-generator/scripts
python generate_project.py my-app
```

This will create a new directory `my-app` with a complete fullstack application.

## Customization

You can customize the generated application by providing a custom configuration file:

```bash
python generate_project.py my-app --config custom_config.json
```

See `config/default_config.json` for the configuration format.

## Generated Project Structure

```
my-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   └── layout/
│   │   ├── pages/
│   │   └── utils/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   └── schemas/
└── README.md
```

## Requirements

- Python 3.12+
- Node.js 18+
- Poetry
- npm or yarn
