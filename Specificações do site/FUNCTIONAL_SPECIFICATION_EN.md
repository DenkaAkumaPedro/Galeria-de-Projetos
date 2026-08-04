# Functional Specification

## Overview

This document describes all site functionalities, including behavior, interactions, and business logic.

---

## 1. SPA Architecture (Single Page Application)

The site works as a vanilla SPA (no frameworks). Content is rendered via JavaScript in a single `<div id="app">`.

### Routing

The routing system uses `history.pushState` and `popstate` for navigation without page reload.

**Accepted Routes:**
| Route | Action |
|-------|--------|
| `/` or `/index.html` | Displays the hub (main page) |
| `/projetos/{id}.html` | Displays the project page with matching id |
| Any other route | Redirects to hub |

**Navigation Flow:**
1. User clicks a link with `[data-link]` attribute
2. Event listener intercepts the click
3. `e.preventDefault()` prevents native navigation
4. `history.pushState()` updates the URL
5. `handleRoute()` is called to render the correct content

**Exception:** The "Histórico de Alterações" link (`log.html`) does NOT have `data-link`, performing native navigation (full page load) to the log page.

---

## 2. Theme System

### How It Works
- Two themes: **light** and **dark**
- Default theme: **dark**
- Automatically saved to `localStorage` with key `theme`

### Application
1. `loadTheme()`: Reads `localStorage.getItem('theme')` or uses `'dark'`
2. Applies `document.documentElement.setAttribute('data-theme', saved)`
3. CSS uses `[data-theme="dark"]` to apply dark theme variables

### Toggle
1. `toggleTheme()`: Reads current theme
2. Inverts: `dark` → `light` or `light` → `dark`
3. Updates `data-theme` attribute
4. Saves to `localStorage`

### Icons
- Light theme: ☀️ (via `::after { content: '☀️'; }`)
- Dark theme: 🌙 (via `[data-theme="dark"] .theme-toggle-icon::after { content: '🌙'; }`)

---

## 3. Data Loading

### Project Data
- File: `data/projetos.json`
- Loaded via `fetch()` in `App.init()`
- Stored in `App.data`
- Error handled with fallback: `{ projetos: [] }`

### Log Data
- File: `data/log.json`
- Loaded via `fetch()` in `LogApp.init()`
- Stored in `LogApp.data`
- Error handled with fallback: `{ dataAtualizacao: '', alteracoes: [] }`

---

## 4. Hub Rendering

### Function: `renderHub()`

**Generated HTML structure:**
```html
<div class="hub">
  <header class="hub-header">
    <img class="hub-avatar" src="assets/Avatar.gif" alt="Avatar">
    <h1 class="hub-title">Galeria de Projetos</h1>
    <p class="hub-subtitle">Projetos para aplicar com IA</p>
    <div class="hub-dates">
      <span class="hub-date-item">📅 Início: {dataInicio}</span>
      <span class="hub-date-item">🔄 Atualizado: {dataAtualizacao}</span>
    </div>
  </header>

  <div class="hub-list">
    <!-- Cards rendered via map() -->
  </div>

  <footer class="hub-footer">
    <a href="log.html" class="footer-btn">📋 Histórico de Alterações</a>
  </footer>
</div>

<button class="theme-toggle" onclick="App.toggleTheme()">
  <span class="theme-toggle-icon"></span>
</button>
```

**Dates:**
- `dataInicio`: fixed as `'03/08/2026'`
- `dataAtualizacao`: read from `this.data.dataAtualizacao`

---

## 5. Card Rendering

### Function: `renderProjectCard(project)`

**Generated HTML structure:**
```html
<a href="projetos/{id}.html" class="project-card" data-link style="--project-color: {cor}">
  <div class="project-icon" style="background: {cor}20">
    {icone}
  </div>
  <div class="project-info">
    <div class="project-title">{titulo}</div>
    <div class="project-meta">v{versao} · {statusLabel}</div>
    <div class="project-date">{atualizadoEm}</div>
  </div>
  <div class="project-status {status}"></div>
</a>
```

**Important details:**
- `--project-color` is passed as inline CSS variable for hover and neon use
- Icon uses `background: {cor}20` (color with 20% opacity via hex)
- Status indicator is applied as CSS class

---

## 6. Project Page Rendering

### Function: `renderProject()`

**Generated HTML structure:**
```html
<div class="project-page">
  <a href="/" class="project-back" data-link>← Voltar</a>

  <header class="project-header">
    <div class="project-page-icon" style="background: {cor}20">{icone}</div>
    <h1 class="project-page-title">{titulo}</h1>
    <p class="project-page-desc">{descricao}</p>
  </header>

  <div class="status-badge {status}">
    <span class="status-dot"></span>
    {statusLabel}
  </div>

  <div class="info-grid">
    <div class="info-card">
      <div class="info-label">Versão</div>
      <div class="info-value">v{versao}</div>
    </div>
    <div class="info-card">
      <div class="info-label">Atualizado</div>
      <div class="info-value">{atualizadoEm}</div>
    </div>
  </div>

  <h3 class="section-title">Tecnologias</h3>
  <div class="tech-tags">
    <!-- Tags rendered via map() -->
  </div>

  <h3 class="section-title">Sobre o Projeto</h3>
  <p class="description-text">{descricao}</p>
</div>

<button class="theme-toggle" onclick="App.toggleTheme()">
  <span class="theme-toggle-icon"></span>
</button>
```

---

## 7. Log Rendering

### Function: `renderPage()` (LogApp)

**Important difference:** Items are reversed with `.reverse()` to show the most recent first.

```javascript
const alteracoes = (this.data.alteracoes || []).reverse();
```

**Generated HTML structure:**
```html
<div class="log-page">
  <a href="/" class="project-back" data-link>← Voltar</a>

  <header class="log-header">
    <h1 class="log-title">📋 Histórico de Alterações</h1>
    <p class="log-subtitle">Todas as modificações realizadas no site</p>
    <p class="log-update">Última atualização: {dataAtualizacao}</p>
  </header>

  <div class="log-list">
    <!-- Items rendered via map() -->
  </div>
</div>

<button class="theme-toggle" onclick="LogApp.toggleTheme()">
  <span class="theme-toggle-icon"></span>
</button>
```

### Function: `renderLogItem(item)`

```html
<div class="log-item">
  <div class="log-date">{data} às {horario}</div>
  <div class="log-desc">{descricao}</div>
</div>
```

---

## 8. Hover and Visual Feedback

### Project Cards
- **Hover:** `translateY(-2px)`, increased shadow, background changes to project color at 15% opacity
- **Active:** `translateY(0)` (returns to normal)

### Buttons (footer-btn, project-back)
- **Hover:** `translateY(-2px)`, increased neon, background changes to purple at 15% opacity

### Theme Toggle Button
- **Hover:** `scale(1.1)`, increased shadow

### Log Items
- **Hover:** `translateY(-2px)`, background changes to purple at 10% opacity

---

## 9. Status Labels

### Function: `getStatusLabel(status)`

```javascript
const labels = {
  'nao-iniciado': 'Não Iniciado',
  'em-andamento': 'Em Andamento',
  'funcionando': 'Funcionando'
};
return labels[status] || status;
```

---

## 10. Initialization

### Main App (`app.js`)

```javascript
async init() {
  await this.loadData();    // Loads projetos.json
  this.loadTheme();         // Applies saved theme
  this.setupRouter();       // Sets up route listeners
  this.handleRoute();       // Renders initial page
}
```

### Log App (`log.js`)

```javascript
async init() {
  await this.loadData();    // Loads log.json
  this.loadTheme();         // Applies saved theme
  this.render();            // Renders log page
}
```

---

## 11. Click Interception

```javascript
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-link]');
  if (link) {
    e.preventDefault();
    const href = link.getAttribute('href');
    this.navigate(href);
  }
});
```

**Important:** Only links with `data-link` are intercepted. The `log.html` link does not have this attribute, performing native navigation.

---

## 12. Navigation

### Function: `navigate(href)`

```javascript
navigate(href) {
  history.pushState(null, '', href);
  this.handleRoute();
}
```

### Function: `handleRoute()`

```javascript
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
}
```
