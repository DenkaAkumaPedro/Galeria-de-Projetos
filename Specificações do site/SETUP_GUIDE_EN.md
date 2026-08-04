# Setup Guide

## Overview

This guide explains how to configure, run, and customize the Galeria de Projetos (Project Gallery) site.

---

## 1. Prerequisites

- **Web browser:** Chrome, Firefox, Edge or Safari (modern version)
- **Code editor:** VS Code (recommended) or any editor
- **Live Server:** VS Code extension (recommended for local running)
- **Git:** To clone the repository (optional)

---

## 2. How to Clone the Repository

```bash
git clone https://github.com/DenkaAkumaPedro/Galeria-de-Projetos.git
cd Galeria-de-Projetos
```

---

## 3. How to Run Locally

### Option 1: Live Server (Recommended)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. The site will open at `http://127.0.0.1:5500`

### Option 2: Open directly in browser
1. Navigate to the project folder
2. Double-click `index.html`
3. The site will open in the browser

**Note:** When opening directly in the browser, JSON fetch may not work due to CORS. Use Live Server for better experience.

---

## 4. How to Add a Project

### Step 1: Edit projetos.json

Open `data/projetos.json` and add a new entry:

```json
{
  "id": "my-project",
  "titulo": "My New Project",
  "status": "nao-iniciado",
  "versao": "0.0.0",
  "icone": "📌",
  "cor": "#6366f1",
  "descricao": "Project description...",
  "tecnologias": ["HTML", "CSS", "JavaScript"],
  "atualizadoEm": "03/08/2026"
}
```

### Step 2: Create HTML file

Create a file `projetos/my-project.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project - Galeria de Projetos</title>
  <meta name="description" content="Project details - Galeria de Projetos">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <div id="app"></div>
  <script src="../js/app.js"></script>
</body>
</html>
```

### Step 3: Update the log

Add an entry to `data/log.json`:

```json
{
  "data": "03/08/2026",
  "horario": "18:00",
  "descricao": "Addition of My Project"
}
```

---

## 5. How to Change Texts

### Site Title
In `js/app.js`, line 86:
```javascript
<h1 class="hub-title">Galeria de Projetos</h1>
```

### Subtitle
In `js/app.js`, line 87:
```javascript
<p class="hub-subtitle">Projetos para aplicar com IA</p>
```

### Start Date
In `js/app.js`, line 79:
```javascript
const dataInicio = '03/08/2026';
```

### Meta Tag
In `index.html`, line 7:
```html
<meta name="description" content="Projetos para aplicar com IA">
```

---

## 6. How to Change Colors

### Status Colors
In `css/style.css`, `:root` variables:
```css
:root {
  --status-nao-iniciado: #ef4444;  /* Red */
  --status-em-andamento: #f59e0b;  /* Yellow */
  --status-funcionando: #22c55e;   /* Green */
}
```

### Project Color
In `data/projetos.json`, change the `cor` field:
```json
"cor": "#6366f1"
```

### Theme Colors
In `css/style.css`:
```css
:root {
  --bg-primary: #e8e8e8;    /* Light background */
  --bg-card: #ffffff;        /* Light card */
}

[data-theme="dark"] {
  --bg-primary: #0a0a0a;    /* Dark background */
  --bg-card: #171717;        /* Dark card */
}
```

---

## 7. How to Change Icons

Icons are emojis. To change them, edit the `icone` field in `data/projetos.json`:

```json
"icone": "🎭"
```

Some useful emojis:
- 🤖 Robot
- ⚙️ Gear
- ☯ Yin Yang
- 🔗 Link
- 💼 Briefcase
- 📱 Phone
- 🎭 Masks
- 📖 Book
- 🎬 Movie
- 📚 Books
- 🎌 Flag
- 🎮 Game
- 🌐 Globe
- 🎤 Microphone

---

## 8. How to Update the Log

### Add New Change

Open `data/log.json` and add an entry:

```json
{
  "data": "03/08/2026",
  "horario": "18:00",
  "descricao": "Description of the change"
}
```

### Update Last Update Date

Change the `dataAtualizacao` field in `data/projetos.json`:

```json
"dataAtualizacao": "03/08/2026"
```

---

## 9. Deploy to GitHub Pages

1. Push the code to GitHub
2. Access repository settings
3. Go to "Pages" in the sidebar
4. Select the `main` branch
5. Select the root folder `/`
6. Click "Save"
7. The site will be available at `https://username.github.io/repo-name/`

---

## 10. Deploy to Cloudflare Pages

1. Access the Cloudflare dashboard
2. Go to "Pages"
3. Click "Create a project"
4. Connect your GitHub repository
5. Configure:
   - **Build command:** (leave empty)
   - **Build output directory:** `/`
6. Click "Save and Deploy"
7. The site will be published automatically

---

## 11. Troubleshooting

### JSON fetch doesn't work
- **Cause:** Opening the site directly in browser (file://)
- **Solution:** Use VS Code Live Server

### Theme doesn't save
- **Cause:** localStorage blocked
- **Solution:** Check browser permissions

### Layout broken on mobile
- **Cause:** Viewport not configured
- **Solution:** Verify the viewport meta tag is present in HTML
