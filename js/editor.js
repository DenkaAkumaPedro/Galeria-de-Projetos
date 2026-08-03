/* ============================================
   GALERIA DE PROJETOS - Editor
   ============================================ */

const Editor = {
  isOpen: false,
  editingProject: null,
  isNew: false,

  open() {
    this.isNew = false;
    this.editingProject = null;
    this.render();
    this.isOpen = true;
  },

  openForProject(id) {
    this.isNew = false;
    this.editingProject = App.data.projetos.find(p => p.id === id);
    this.render();
    this.isOpen = true;
  },

  openNew() {
    this.isNew = true;
    this.editingProject = {
      id: '',
      titulo: '',
      status: 'nao-iniciado',
      versao: '0.0.0',
      icone: '📌',
      cor: '#6366f1',
      descricao: '',
      tecnologias: [],
      atualizadoEm: this.getCurrentDate()
    };
    this.render();
    this.isOpen = true;
  },

  close() {
    this.isOpen = false;
    this.editingProject = null;
    const overlay = document.querySelector('.editor-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
    }
  },

  render() {
    const existing = document.querySelector('.editor-overlay');
    if (existing) existing.remove();

    const p = this.editingProject;
    const overlay = document.createElement('div');
    overlay.className = 'editor-overlay';
    overlay.innerHTML = `
      <div class="editor-panel">
        <div class="editor-header">
          <h2 class="editor-title">${this.isNew ? 'Novo Projeto' : 'Editar Projeto'}</h2>
          <button class="editor-close" onclick="Editor.close()">✕</button>
        </div>

        <form id="editorForm" onsubmit="Editor.save(event)">
          <div class="form-group">
            <label class="form-label">Nome do Projeto</label>
            <input type="text" class="form-input" name="titulo" value="${p.titulo}" required>
          </div>

          <div class="form-group">
            <label class="form-label">Ícone (emoji)</label>
            <input type="text" class="form-input" name="icone" value="${p.icone}" maxlength="2">
          </div>

          <div class="form-group">
            <label class="form-label">Status</label>
            <div class="status-selector">
              <button type="button" class="status-option ${p.status === 'nao-iniciado' ? 'selected' : ''} nao-iniciado"
                      onclick="Editor.selectStatus('nao-iniciado')">
                <div class="status-option-dot"></div>
                <div class="status-option-label">Não Iniciado</div>
              </button>
              <button type="button" class="status-option ${p.status === 'em-andamento' ? 'selected' : ''} em-andamento"
                      onclick="Editor.selectStatus('em-andamento')">
                <div class="status-option-dot"></div>
                <div class="status-option-label">Em Andamento</div>
              </button>
              <button type="button" class="status-option ${p.status === 'funcionando' ? 'selected' : ''} funcionando"
                      onclick="Editor.selectStatus('funcionando')">
                <div class="status-option-dot"></div>
                <div class="status-option-label">Funcionando</div>
              </button>
            </div>
            <input type="hidden" name="status" value="${p.status}">
          </div>

          <div class="form-group">
            <label class="form-label">Versão</label>
            <input type="text" class="form-input" name="versao" value="${p.versao}" placeholder="1.0.0">
          </div>

          <div class="form-group">
            <label class="form-label">Cor (hex)</label>
            <input type="color" class="form-input" name="cor" value="${p.cor}" style="height: 48px; padding: 4px;">
          </div>

          <div class="form-group">
            <label class="form-label">Descrição</label>
            <textarea class="form-textarea" name="descricao">${p.descricao}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Tecnologias (separar por vírgula)</label>
            <input type="text" class="form-input" name="tecnologias"
                   value="${p.tecnologias.join(', ')}">
          </div>

          <div style="display: flex; gap: 12px; margin-top: 24px;">
            ${!this.isNew ? `
              <button type="button" class="btn btn-secondary" onclick="Editor.delete()" style="flex: 0 0 auto;">
                🗑️
              </button>
            ` : ''}
            <button type="submit" class="btn btn-primary" style="flex: 1;">
              ${this.isNew ? 'Criar Projeto' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.close();
    });
  },

  selectStatus(status) {
    document.querySelectorAll('.status-option').forEach(el => el.classList.remove('selected'));
    document.querySelector(`.status-option.${status}`).classList.add('selected');
    document.querySelector('[name="status"]').value = status;
  },

  save(e) {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    data.tecnologias = data.tecnologias
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    data.atualizadoEm = this.getCurrentDate();

    if (this.isNew) {
      data.id = this.slugify(data.titulo);
      App.data.projetos.push(data);
    } else {
      const index = App.data.projetos.findIndex(p => p.id === this.editingProject.id);
      if (index !== -1) {
        data.id = this.editingProject.id;
        App.data.projetos[index] = data;
      }
    }

    this.close();
    App.updateData(App.data);

    this.showNotification(this.isNew ? 'Projeto criado!' : 'Projeto atualizado!');
  },

  delete() {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;

    App.data.projetos = App.data.projetos.filter(p => p.id !== this.editingProject.id);
    this.close();
    App.updateData(App.data);
    App.navigate('/');
    this.showNotification('Projeto excluído!');
  },

  showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: #171717;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 200;
      animation: slideUp 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
  },

  slugify(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  },

  getCurrentDate() {
    const now = new Date();
    return `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  }
};
