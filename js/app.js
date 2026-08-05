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
      const response = await fetch('/data/projetos.json');
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

    const previewSection = p.previewUrl ? `
      <h3 class="section-title">Pré-visualização</h3>
      <div class="preview-section">
        <div class="preview-iframe">
          <iframe src="${p.previewUrl}" title="Pré-visualização do projeto" loading="lazy"></iframe>
        </div>
      </div>
    ` : '';

    const linksSection = p.links && p.links.length > 0 ? `
      <h3 class="section-title">Links</h3>
      <div class="preview-links">
        ${p.links.map(link => `
          <a href="${link.url}" class="preview-link" target="_blank" rel="noopener noreferrer">
            <i class="${link.icone}"></i>
            ${link.nome}
          </a>
        `).join('')}
      </div>
    ` : '';

    const itensSection = p.itens && p.itens.length > 0 ? `
      <h3 class="section-title">Itens</h3>
      <ul class="project-list">
        ${p.itens.map(item => `<li>${item}</li>`).join('')}
      </ul>
    ` : '';

    const tarefasSection = p.tarefas && p.tarefas.length > 0 ? `
      <h3 class="section-title">Tarefas</h3>
      <ol class="project-numbered-list">
        ${p.tarefas.map(tarefa => `<li>${tarefa.nome}</li>`).join('')}
      </ol>
    ` : '';

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

        ${linksSection}

        ${itensSection}

        ${tarefasSection}

        ${previewSection}

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
