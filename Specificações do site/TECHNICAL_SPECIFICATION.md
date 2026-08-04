# Especificação Técnica

## Visão Geral

Este documento descreve a arquitetura técnica do site, incluindo tecnologias, estrutura de código e implementação.

---

## 1. Tecnologias

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| HTML5 | - | Estrutura das páginas |
| CSS3 | - | Estilos, variáveis CSS, temas, efeitos visuais |
| JavaScript ES6+ | - | Lógica, roteamento SPA, renderização dinâmica |
| Fetch API | - | Carregamento de dados JSON |
| History API | - | Roteamento sem recarrega de página |
| localStorage | - | Persistência de tema |
| Git | - | Controle de versão |
| GitHub | - | Hospedagem e deploy |

**Sem frameworks ou bibliotecas externas.** Código 100% vanilla.

---

## 2. Estrutura de Arquivos

```
├── index.html          # HTML principal (29 linhas)
├── log.html            # HTML do log (17 linhas)
├── css/style.css       # Estilos completos (568 linhas)
├── js/app.js           # App principal (195 linhas)
├── js/log.js           # App do log (77 linhas)
├── data/projetos.json  # Dados dos projetos (126 linhas)
├── data/log.json       # Histórico de alterações (110 linhas)
├── assets/Avatar.gif   # Avatar
└── projetos/*.html     # 11 páginas de projeto (30 linhas cada)
```

**Total de código:** ~1.200 linhas (excluindo JSON e especificações)

---

## 3. Arquitetura SPA

### Modelo
- SPA vanilla sem framework
- Um único `<div id="app">` como container
- Conteúdo renderizado via `innerHTML`
- Roteamento via `History API`

### Fluxo
1. `DOMContentLoaded` dispara `App.init()`
2. `init()` carrega dados, tema, configura roteamento
3. `handleRoute()` verifica URL e renderiza página correta
4. Links com `[data-link]` são interceptados pelo listener de cliques
5. `pushState()` atualiza URL sem recarregar
6. `handleRoute()` é chamado novamente para renderizar

---

## 4. Código Completo: app.js

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

## 5. Código Completo: log.js

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

## 6. Estrutura HTML

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
  <title>{Título} - Galeria de Projetos</title>
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

## 7. Métodos do Objeto App

| Método | Parâmetros | Retorno | Descrição |
|--------|-----------|---------|-----------|
| `init()` | - | Promise | Inicializa o app |
| `loadData()` | - | Promise | Carrega projetos.json |
| `setupRouter()` | - | void | Configura listeners de rota |
| `navigate(href)` | href: string | void | Navega para uma URL |
| `handleRoute()` | - | void | Renderiza página baseado na URL |
| `showHub()` | - | void | Renderiza a página principal |
| `showProject(id)` | id: string | void | Renderiza página de projeto |
| `renderHub()` | - | string | Retorna HTML do hub |
| `renderProjectCard(project)` | project: object | string | Retorna HTML de um card |
| `renderProject()` | - | string | Retorna HTML da página de projeto |
| `getStatusLabel(status)` | status: string | string | Retorna label do status |
| `loadTheme()` | - | void | Carrega tema do localStorage |
| `toggleTheme()` | - | void | Alterna tema claro/escuro |

---

## 8. Métodos do Objeto LogApp

| Método | Parâmetros | Retorno | Descrição |
|--------|-----------|---------|-----------|
| `init()` | - | Promise | Inicializa o app do log |
| `loadData()` | - | Promise | Carrega log.json |
| `render()` | - | void | Renderiza a página de log |
| `renderPage()` | - | string | Retorna HTML da página |
| `renderLogItem(item)` | item: object | string | Retorna HTML de um item |
| `loadTheme()` | - | void | Carrega tema do localStorage |
| `toggleTheme()` | - | void | Alterna tema claro/escuro |

---

## 9. Variáveis CSS

### Tema Claro
| Variável | Valor |
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

### Tema Escuro
| Variável | Valor |
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

## 10. Estrutura JSON

### projetos.json
```json
{
  "dataAtualizacao": "DD/MM/AAAA",
  "projetos": [
    {
      "id": "string-identificador",
      "titulo": "Nome do Projeto",
      "status": "nao-iniciado | em-andamento | funcionando",
      "versao": "X.Y.Z",
      "icone": "emoji",
      "cor": "#hexcolor",
      "descricao": "Descrição do projeto",
      "tecnologias": ["Tecnologia1", "Tecnologia2"],
      "atualizadoEm": "DD/MM/AAAA"
    }
  ]
}
```

### log.json
```json
{
  "dataAtualizacao": "DD/MM/AAAA",
  "alteracoes": [
    {
      "data": "DD/MM/AAAA",
      "horario": "HH:MM",
      "descricao": "Descrição da alteração"
    }
  ]
}
```

---

## 11. APIs do Navegador Utilizadas

| API | Uso |
|-----|-----|
| `fetch()` | Carregamento de dados JSON |
| `history.pushState()` | Atualização de URL sem recarregar |
| `window.addEventListener('popstate')` | Detecção de navegação |
| `localStorage.getItem/setItem` | Persistência de tema |
| `document.getElementById()` | Acesso ao container |
| `document.addEventListener('click')` | Interceptação de cliques |
| `document.documentElement.setAttribute()` | Aplicação de tema |
| `element.innerHTML` | Renderização de conteúdo |
| `Array.map().join()` | Geração de列表 de elementos |
| `Array.reverse()` | Inversão de ordem (log) |
