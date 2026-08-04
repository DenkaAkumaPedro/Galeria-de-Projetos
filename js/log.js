/* ============================================
   GALERIA DE PROJETOS - Log de Alterações
   ============================================ */

const LogApp = {
  data: null,
  projetos: null,
  filtrosAtivos: ['todos'],

  async init() {
    await this.loadData();
    await this.loadProjetos();
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

  async loadProjetos() {
    try {
      const response = await fetch('data/projetos.json');
      const data = await response.json();
      this.projetos = data.projetos || [];
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
      this.projetos = [];
    }
  },

  getProjetoById(id) {
    if (id === 'geral') {
      return { id: 'geral', titulo: 'Geral', icone: '📋', cor: '#6366f1' };
    }
    return this.projetos.find(p => p.id === id) || null;
  },

  getProjetosComAlteracoes() {
    const projetosIds = new Set();
    (this.data.alteracoes || []).forEach(item => {
      if (item.projeto) {
        projetosIds.add(item.projeto);
      }
    });
    return Array.from(projetosIds);
  },

  getContagemPorProjeto(projetoId) {
    return (this.data.alteracoes || []).filter(item => item.projeto === projetoId).length;
  },

  toggleFilter(id) {
    if (id === 'todos') {
      this.filtrosAtivos = ['todos'];
    } else {
      this.filtrosAtivos = this.filtrosAtivos.filter(f => f !== 'todos');
      if (this.filtrosAtivos.includes(id)) {
        this.filtrosAtivos = this.filtrosAtivos.filter(f => f !== id);
      } else {
        this.filtrosAtivos.push(id);
      }
      if (this.filtrosAtivos.length === 0) {
        this.filtrosAtivos = ['todos'];
      }
    }
    this.render();
  },

  getFilteredChanges() {
    const alteracoes = this.data.alteracoes || [];
    if (this.filtrosAtivos.includes('todos')) {
      return alteracoes;
    }
    return alteracoes.filter(item => this.filtrosAtivos.includes(item.projeto));
  },

  render() {
    const container = document.getElementById('app');
    container.innerHTML = this.renderPage();
  },

  renderPage() {
    const alteracoes = this.getFilteredChanges().reverse();
    const projetosComAlteracoes = this.getProjetosComAlteracoes();

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

        ${this.renderFilters(projetosComAlteracoes)}

        <div class="log-list">
          ${alteracoes.length > 0
            ? alteracoes.map(item => this.renderLogItem(item)).join('')
            : '<div class="log-empty">Nenhuma alteração encontrada para os filtros selecionados.</div>'
          }
        </div>
      </div>

      <button class="theme-toggle" onclick="LogApp.toggleTheme()" title="Alternar tema">
        <span class="theme-toggle-icon"></span>
      </button>
    `;
  },

  renderFilters(projetosComAlteracoes) {
    const totalGeral = this.getContagemPorProjeto('geral');
    const isTodosActive = this.filtrosAtivos.includes('todos');

    const projetosFiltros = projetosComAlteracoes
      .filter(id => id !== 'geral')
      .map(id => {
        const projeto = this.getProjetoById(id);
        if (!projeto) return '';
        const count = this.getContagemPorProjeto(id);
        const isActive = this.filtrosAtivos.includes(id);
        return `
          <button
            class="log-filter-btn ${isActive ? 'active' : ''}"
            style="--filter-color: ${projeto.cor}"
            onclick="LogApp.toggleFilter('${id}')"
          >
            <span class="filter-icon">${projeto.icone}</span>
            ${projeto.titulo}
            <span class="filter-count">${count}</span>
          </button>
        `;
      }).join('');

    return `
      <div class="log-filters">
        <span class="log-filter-label">Filtrar por projeto:</span>
        <button
          class="log-filter-btn ${isTodosActive ? 'active' : ''}"
          style="--filter-color: #6366f1"
          onclick="LogApp.toggleFilter('todos')"
        >
          <span class="filter-icon">📋</span>
          Todos
          <span class="filter-count">${(this.data.alteracoes || []).length}</span>
        </button>
        <button
          class="log-filter-btn ${this.filtrosAtivos.includes('geral') ? 'active' : ''}"
          style="--filter-color: #6366f1"
          onclick="LogApp.toggleFilter('geral')"
        >
          <span class="filter-icon">🌐</span>
          Geral
          <span class="filter-count">${totalGeral}</span>
        </button>
        ${projetosFiltros}
      </div>
    `;
  },

  renderLogItem(item) {
    const projeto = this.getProjetoById(item.projeto);
    const projetoTag = projeto ? `
      <div class="log-project-tag" style="--tag-color: ${projeto.cor}">
        <span class="tag-icon">${projeto.icone}</span>
        ${projeto.titulo}
      </div>
    ` : '';

    return `
      <div class="log-item">
        ${projetoTag}
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
