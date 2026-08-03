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
    const alteracoes = this.data.alteracoes || [];

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
        <div class="log-date">${item.data}</div>
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
