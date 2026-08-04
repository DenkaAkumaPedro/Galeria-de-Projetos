# Project Specification

## Overview

**Name:** Galeria de Projetos (Project Gallery)
**Type:** Linktree-style SPA (Single Page Application)
**Objective:** Display a visual list of app and code projects with AI, with individual details and a change log system.

---

## 1. Folder Structure

```
Galeria de Projetos/
├── index.html                    # Main page (hub)
├── log.html                      # Change log page
├── README.md                     # Project documentation
├── .gitignore
├── assets/
│   └── Avatar.gif                # Profile avatar (GIF)
├── css/
│   └── style.css                 # Styles (light and dark theme)
├── js/
│   ├── app.js                    # Main logic, routing and theme
│   └── log.js                    # Log page logic
├── data/
│   ├── projetos.json             # Project data
│   └── log.json                  # Change history
├── projetos/
│   ├── ia-dia-a-dia.html
│   ├── automacao-tarefas.html
│   ├── linktree-geral.html
│   ├── linktree-pessoal.html
│   ├── linktree-profissional.html
│   ├── integracao-apps.html
│   ├── projeto-vtuber.html
│   ├── tradutor-tela.html
│   ├── tradutor-videos.html
│   ├── material-estudos.html
│   └── sincronizar-animes.html
└── Specificações do site/
    ├── CONTENT_SPECIFICATION.md
    ├── CONTENT_SPECIFICATION_EN.md
    ├── DESIGN_SPECIFICATION.md
    ├── DESIGN_SPECIFICATION_EN.md
    ├── FUNCTIONAL_SPECIFICATION.md
    ├── FUNCTIONAL_SPECIFICATION_EN.md
    ├── PROJECT_SPECIFICATION.md
    ├── PROJECT_SPECIFICATION_EN.md
    ├── SETUP_GUIDE.md
    ├── SETUP_GUIDE_EN.md
    ├── TECHNICAL_SPECIFICATION.md
    ├── TECHNICAL_SPECIFICATION_EN.md
    ├── TEXTOS_DO_SITE.md
    └── TEXTOS_DO_SITE_EN.md
```

**Total files:** 28 (including specifications)

---

## 2. Project List

| # | ID | Title | Icon | Color | Status |
|---|-----|-------|------|-------|--------|
| 1 | ia-dia-a-dia | Aplicação de IA no Dia a dia | 🤖 | #6366f1 | Not Started |
| 2 | automacao-tarefas | Automação de Tarefas | ⚙️ | #8b5cf6 | Not Started |
| 3 | linktree-geral | Linktree Geral | ☯ | #1a1a2e | Not Started |
| 4 | linktree-pessoal | Linktree Pessoal | 🔗 | #ec4899 | Not Started |
| 5 | linktree-profissional | Linktree Profissional | 💼 | #14b8a6 | Not Started |
| 6 | integracao-apps | Integração com Outros Apps | 📱 | #f59e0b | Not Started |
| 7 | projeto-vtuber | Projeto Vtuber | 🎭 | #39c5cf | Not Started |
| 8 | tradutor-tela | Tradutor de Tela | 📖 | #3b82f6 | Not Started |
| 9 | tradutor-videos | Tradutor de Vídeos | 🎬 | #a855f7 | Not Started |
| 10 | material-estudos | Criação de Material de Estudos | 📚 | #22c55e | Not Started |
| 11 | sincronizar-animes | Sincronizar Lista de Animes | 🎌 | #f97316 | Not Started |

---

## 3. Features

- **Project Hub:** Visual linktree-style list of all projects
- **Individual Pages:** Complete details for each project (version, status, technologies, description)
- **Visual Indicators:** Status with colors (red, yellow, green)
- **Light/Dark Theme:** Toggle in bottom-right corner, saved to localStorage
- **Responsive Design:** Works on any device (480px breakpoint)
- **Neon Effect:** Buttons and icons with visual neon effect using drop-shadow
- **Interactive Hover:** Visual feedback on card hover (project color)
- **Change Log:** Separate page with complete modification history

---

## 4. Technologies

| Technology | Version | Usage |
|------------|---------|-------|
| HTML5 | - | Page structure |
| CSS3 | - | Styles, variables, themes, effects |
| JavaScript ES6+ | - | Logic, routing, rendering |
| Git | - | Version control |
| GitHub | - | Hosting and deploy |

**No external frameworks or libraries.** All code is vanilla.

---

## 5. Deploy

### GitHub Pages
1. Create a repository on GitHub
2. Push the code
3. Access repository settings
4. Enable GitHub Pages in the "Pages" section
5. Select the `main` branch and root folder `/`
6. The site will be available at `https://username.github.io/repo-name/`

### Cloudflare Pages
1. Connect the GitHub repository to Cloudflare Pages
2. Configure the build:
   - **Build command:** (leave empty)
   - **Build output directory:** `/`
3. The site will be published automatically

---

## 6. How to Add a Project

1. Open `data/projetos.json`
2. Add a new entry to the `projetos` list:

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

3. Create an HTML file in `projetos/my-project.html`:

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

4. Add the entry to `data/log.json`:

```json
{
  "data": "03/08/2026",
  "horario": "18:00",
  "descricao": "Addition of My Project"
}
```

---

## 7. Project Status

| Status | Color | Meaning |
|--------|-------|---------|
| `nao-iniciado` | Red (#ef4444) | Project not yet started |
| `em-andamento` | Yellow (#f59e0b) | Project in development |
| `funcionando` | Green (#22c55e) | Project completed and functional |

---

## 8. Repository

- **GitHub:** https://github.com/DenkaAkumaPedro/Galeria-de-Projetos
- **Main branch:** `main`
- **Latest commit:** feat: neon por cor, datas log à direita, Linktree Geral, README atualizado
