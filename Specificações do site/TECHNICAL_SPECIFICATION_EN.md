# Technical Specification

## Overview

This document describes the site's technical architecture, including technologies, code structure, and implementation.

---

## 1. Technologies

| Technology | Version | Usage |
|------------|---------|-------|
| HTML5 | - | Page structure |
| CSS3 | - | Styles, CSS variables, themes, visual effects |
| JavaScript ES6+ | - | Logic, SPA routing, dynamic rendering |
| Fetch API | - | JSON data loading |
| History API | - | Page-reload-free routing |
| localStorage | - | Theme persistence |
| Git | - | Version control |
| GitHub | - | Hosting and deploy |

**No external frameworks or libraries.** 100% vanilla code.

---

## 2. File Structure

```
├── index.html          # Main HTML (29 lines)
├── log.html            # Log HTML (17 lines)
├── css/style.css       # Complete styles (568 lines)
├── js/app.js           # Main app (195 lines)
├── js/log.js           # Log app (77 lines)
├── data/projetos.json  # Project data (126 lines)
├── data/log.json       # Change history (110 lines)
├── assets/Avatar.gif   # Avatar
└── projetos/*.html     # 11 project pages (30 lines each)
```

**Total code:** ~1,200 lines (excluding JSON and specifications)

---

## 3. SPA Architecture

### Model
- Vanilla SPA without framework
- Single `<div id="app">` as container
- Content rendered via `innerHTML`
- Routing via `History API`

### Flow
1. `DOMContentLoaded` triggers `App.init()`
2. `init()` loads data, theme, sets up routing
3. `handleRoute()` checks URL and renders correct page
4. Links with `[data-link]` are intercepted by click listener
5. `pushState()` updates URL without reloading
6. `handleRoute()` is called again to render

---

## 4. Complete Code: app.js

```javascript
/* ============================================
   GALERIA DE PROJETOS - App Principal
   ============================================ */

const App = {
  data: null,
  currentPage: 'hub',
  currentProject: null,

  async init() {
    await this.loadData();
    this.loadTheme();
    this.setupRouter();
    this.handleRoute();
  },

  async loadData() {
    try {
      const response = await fetch('data/projetos.json');
      this.data = await response.json();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      this.data = { projetos: [] };
    }
  },

  setupRouter() {
    window.addEventListener('popstate', () => this.handleRoute());

    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        this.navigate(href);
      }
    });
  },

  navigate(href) {
    history.pushState(null, '', href);
    this.handleRoute();
  },

  handleRoute() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);

    if (segments.length === 0 || path === '/' || path === '/index.html') {
      this.showHub();
    } else if (segments[0] === 'projetos' && segments[1]) {
      this.showProject(segments[1].replace('.html', ''));
    } else {
      this.showHub();
    }
  },

  showHub() {
    this.currentPage = 'hub';
    const container = document.getElementById('app');
    container.innerHTML = this.renderHub();
  },

  showProject(id) {
    this.currentPage = 'project';
    this.currentProject = this.data.projetos.find(p => p.id === id);

    if (!this.currentProject) {
      this.showHub();
      return;
    }

    const container = document.getElementById('app');
    container.innerHTML = this.renderProject();
  },

  renderHub() {
    const projetos = this.data.projetos;
    const dataInicio = '03/08/2026';
    const dataAtualizacao = this.data.dataAtualizacao || '03/08/2026';

    return `
      <div class="hub">
        <header class="hub-header">
          <img class="hub-avatar" src="assets/Avatar.gif" alt="Avatar">
          <h1 class="hub-title">Galeria de Projetos</h1>
          <p class="hub-subtitle">Projetos para aplicar com IA</p>
          <div class="hub-dates">
            <span class="hub-date-item">📅 Início: ${dataInicio}</span>
            <span class="hub-date-item">🔄 Atualizado: ${dataAtualizacao}</span>
          </div>
        </header>

        <div class="hub-list">
          ${projetos.map(p => this.renderProjectCard(p)).join('')}
        </div>

        <footer class="hub-footer">
          <a href="log.html" class="footer-btn">📋 Histórico de Alterações</a>
        </footer>
      </div>

      <button class="theme-toggle" onclick="App.toggleTheme()" title="Alternar tema">
        <span class="theme-toggle-icon"></span>
      </button>
    `;
  },

  renderProjectCard(project) {
    return `
      <a href="projetos/${project.id}.html" class="project-card" data-link style="--project-color: ${project.cor}">
        <div class="project-icon" style="background: ${project.cor}20">
          ${project.icone}
        </div>
        <div class="project-info">
          <div class="project-title">${project.titulo}</div>
          <div class="project-meta">v${project.versao} · ${this.getStatusLabel(project.status)}</div>
          <div class="project-date">${project.atualizadoEm}</div>
        </div>
        <div class="project-status ${project.status}"></div>
      </a>
    `;
  },

  renderProject() {
    const p = this.currentProject;

    return `
      <div class="project-page">
        <a href="/" class="project-back" data-link>
          ← Voltar
        </a>

        <header class="project-header">
          <div class="project-page-icon" style="background: ${p.cor}20">
            ${p.icone}
          </div>
          <h1 class="project-page-title">${p.titulo}</h1>
          <p class="project-page-desc">${p.descricao}</p>
        </header>

        <div class="status-badge ${p.status}">
          <span class="status-dot"></span>
          ${this.getStatusLabel(p.status)}
        </div>

        <div class="info-grid">
          <div class="info-card">
            <div class="info-label">Versão</div>
            <div class="info-value">v${p.versao}</div>
          </div>
          <div class="info-card">
            <div class="info-label">Atualizado</div>
            <div class="info-value">${p.atualizadoEm}</div>
          </div>
        </div>

        <h3 class="section-title">Tecnologias</h3>
        <div class="tech-tags">
          ${p.tecnologias.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <h3 class="section-title">Sobre o Projeto</h3>
        <p class="description-text">${p.descricao}</p>
      </div>

      <button class="theme-toggle" onclick="App.toggleTheme()" title="Alternar tema">
        <span class="theme-toggle-icon"></span>
      </button>
    `;
  },

  getStatusLabel(status) {
    const labels = {
      'nao-iniciado': 'Não Iniciado',
      'em-andamento': 'Em Andamento',
      'funcionando': 'Funcionando'
    };
    return labels[status] || status;
  },

  loadTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
```

---

## 5. Complete Code: log.js

```javascript
/* ============================================
   GALERIA DE PROJETOS - Log de Alterações
   ============================================ */

const LogApp = {
  data: null,

  async init() {
    await this.loadData();
    this.loadTheme();
    this.render();
  },

  async loadData() {
    try {
      const response = await fetch('data/log.json');
      this.data = await response.json();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      this.data = { dataAtualizacao: '', alteracoes: [] };
    }
  },

  render() {
    const container = document.getElementById('app');
    container.innerHTML = this.renderPage();
  },

  renderPage() {
    const alteracoes = (this.data.alteracoes || []).reverse();

    return `
      <div class="log-page">
        <a href="/" class="project-back" data-link>
          ← Voltar
        </a>

        <header class="log-header">
          <h1 class="log-title">📋 Histórico de Alterações</h1>
          <p class="log-subtitle">Todas as modificações realizadas no site</p>
          <p class="log-update">Última atualização: ${this.data.dataAtualizacao}</p>
        </header>

        <div class="log-list">
          ${alteracoes.map(item => this.renderLogItem(item)).join('')}
        </div>
      </div>

      <button class="theme-toggle" onclick="LogApp.toggleTheme()" title="Alternar tema">
        <span class="theme-toggle-icon"></span>
      </button>
    `;
  },

  renderLogItem(item) {
    return `
      <div class="log-item">
        <div class="log-date">${item.data} às ${item.horario}</div>
        <div class="log-desc">${item.descricao}</div>
      </div>
    `;
  },

  loadTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }
};

document.addEventListener('DOMContentLoaded', () => LogApp.init());
```

---

## 6. HTML Structure

### index.html
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Galeria de Projetos</title>
  <meta name="description" content="Projetos para aplicar com IA">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div id="app"></div>
  <script src="js/app.js"></script>
</body>
</html>
```

### log.html
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Histórico de Alterações - Galeria de Projetos</title>
  <meta name="description" content="Histórico de todas as alterações realizadas no site Galeria de Projetos">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div id="app"></div>
  <script src="js/log.js"></script>
</body>
</html>
```

### projetos/*.html (template)
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{Title} - Galeria de Projetos</title>
  <meta name="description" content="Detalhes do projeto - Galeria de Projetos">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <div id="app"></div>
  <script src="../js/app.js"></script>
</body>
</html>
```

---

## 7. App Object Methods

| Method | Parameters | Return | Description |
|--------|-----------|--------|-------------|
| `init()` | - | Promise | Initializes the app |
| `loadData()` | - | Promise | Loads projetos.json |
| `setupRouter()` | - | void | Sets up route listeners |
| `navigate(href)` | href: string | void | Navigates to a URL |
| `handleRoute()` | - | void | Renders page based on URL |
| `showHub()` | - | void | Renders main page |
| `showProject(id)` | id: string | void | Renders project page |
| `renderHub()` | - | string | Returns hub HTML |
| `renderProjectCard(project)` | project: object | string | Returns card HTML |
| `renderProject()` | - | string | Returns project page HTML |
| `getStatusLabel(status)` | status: string | string | Returns status label |
| `loadTheme()` | - | void | Loads theme from localStorage |
| `toggleTheme()` | - | void | Toggles light/dark theme |

---

## 8. LogApp Object Methods

| Method | Parameters | Return | Description |
|--------|-----------|--------|-------------|
| `init()` | - | Promise | Initializes log app |
| `loadData()` | - | Promise | Loads log.json |
| `render()` | - | void | Renders log page |
| `renderPage()` | - | string | Returns page HTML |
| `renderLogItem(item)` | item: object | string | Returns item HTML |
| `loadTheme()` | - | void | Loads theme from localStorage |
| `toggleTheme()` | - | void | Toggles light/dark theme |

---

## 9. CSS Variables

### Light Theme
| Variable | Value |
|----------|-------|
| `--bg-primary` | `#e8e8e8` |
| `--bg-card` | `#ffffff` |
| `--text-primary` | `#171717` |
| `--text-secondary` | `#525252` |
| `--text-muted` | `#a3a3a3` |
| `--border` | `#e5e5e5` |
| `--shadow` | `0 1px 3px rgba(0, 0, 0, 0.08)` |
| `--shadow-hover` | `0 4px 12px rgba(0, 0, 0, 0.12)` |
| `--radius` | `12px` |
| `--radius-sm` | `8px` |
| `--transition` | `0.2s ease` |
| `--status-nao-iniciado` | `#ef4444` |
| `--status-em-andamento` | `#f59e0b` |
| `--status-funcionando` | `#22c55e` |

### Dark Theme
| Variable | Value |
|----------|-------|
| `--bg-primary` | `#0a0a0a` |
| `--bg-card` | `#171717` |
| `--text-primary` | `#fafafa` |
| `--text-secondary` | `#a3a3a3` |
| `--text-muted` | `#525252` |
| `--border` | `#262626` |
| `--shadow` | `0 1px 3px rgba(0, 0, 0, 0.3)` |
| `--shadow-hover` | `0 4px 12px rgba(0, 0, 0, 0.5)` |

---

## 10. JSON Structure

### projetos.json
```json
{
  "dataAtualizacao": "DD/MM/YYYY",
  "projetos": [
    {
      "id": "string-identifier",
      "titulo": "Project Name",
      "status": "nao-iniciado | em-andamento | funcionando",
      "versao": "X.Y.Z",
      "icone": "emoji",
      "cor": "#hexcolor",
      "descricao": "Project description",
      "tecnologias": ["Technology1", "Technology2"],
      "atualizadoEm": "DD/MM/YYYY"
    }
  ]
}
```

### log.json
```json
{
  "dataAtualizacao": "DD/MM/YYYY",
  "alteracoes": [
    {
      "data": "DD/MM/YYYY",
      "horario": "HH:MM",
      "descricao": "Change description"
    }
  ]
}
```

---

## 11. Browser APIs Used

| API | Usage |
|-----|-------|
| `fetch()` | JSON data loading |
| `history.pushState()` | URL update without reload |
| `window.addEventListener('popstate')` | Navigation detection |
| `localStorage.getItem/setItem` | Theme persistence |
| `document.getElementById()` | Container access |
| `document.addEventListener('click')` | Click interception |
| `document.documentElement.setAttribute()` | Theme application |
| `element.innerHTML` | Content rendering |
| `Array.map().join()` | List element generation |
| `Array.reverse()` | Order reversal (log) |
