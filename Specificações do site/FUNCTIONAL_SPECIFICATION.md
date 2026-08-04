# Especificação Funcional

## Visão Geral

Este documento descreve todas as funcionalidades do site, incluindo comportamento, interações e lógica de negócio.

---

## 1. Arquitetura SPA (Single Page Application)

O site funciona como um SPA vanilla (sem frameworks). O conteúdo é renderizado via JavaScript em um único `<div id="app">`.

### Roteamento

O sistema de roteamento usa `history.pushState` e `popstate` para navegação sem recarregar a página.

**Rotas aceitas:**
| Rota | Ação |
|------|------|
| `/` ou `/index.html` | Exibe o hub (página principal) |
| `/projetos/{id}.html` | Exibe a página do projeto com o id correspondente |
| Qualquer outra rota | Redireciona para o hub |

**Fluxo de navegação:**
1. Usuário clica em um link com atributo `[data-link]`
2. Event listener intercepta o clique
3. `e.preventDefault()` impede a navegação nativa
4. `history.pushState()` atualiza a URL
5. `handleRoute()` é chamado para renderizar o conteúdo correto

**Exceção:** O link "Histórico de Alterações" (`log.html`) NÃO tem `data-link`, fazendo navegação nativa (full page load) para a página de log.

---

## 2. Sistema de Temas

### Funcionamento
- Dois temas: **claro** e **escuro**
- Tema padrão: **escuro**
- Salvo automaticamente no `localStorage` com a chave `theme`

### Aplicação
1. `loadTheme()`: Lê `localStorage.getItem('theme')` ou usa `'dark'`
2. Aplica `document.documentElement.setAttribute('data-theme', saved)`
3. CSS usa `[data-theme="dark"]` para aplicar variáveis do tema escuro

### Alternância
1. `toggleTheme()`: Lê tema atual
2. Inverte: `dark` → `light` ou `light` → `dark`
3. Atualiza atributo `data-theme`
4. Salva no `localStorage`

### Ícones
- Tema claro: ☀️ (via `::after { content: '☀️'; }`)
- Tema escuro: 🌙 (via `[data-theme="dark"] .theme-toggle-icon::after { content: '🌙'; }`)

---

## 3. Carregamento de Dados

### Dados dos Projetos
- Arquivo: `data/projetos.json`
- Carregado via `fetch()` no `init()` do `App`
- Armazenado em `App.data`
- Erro tratado com fallback: `{ projetos: [] }`

### Dados do Log
- Arquivo: `data/log.json`
- Carregado via `fetch()` no `init()` do `LogApp`
- Armazenado em `LogApp.data`
- Erro tratado com fallback: `{ dataAtualizacao: '', alteracoes: [] }`

---

## 4. Renderização do Hub

### Função: `renderHub()`

**Estrutura HTML gerada:**
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
    <!-- Cards renderizados via map() -->
  </div>

  <footer class="hub-footer">
    <a href="log.html" class="footer-btn">📋 Histórico de Alterações</a>
  </footer>
</div>

<button class="theme-toggle" onclick="App.toggleTheme()">
  <span class="theme-toggle-icon"></span>
</button>
```

**Datas:**
- `dataInicio`: fixa como `'03/08/2026'`
- `dataAtualizacao`: lida de `this.data.dataAtualizacao`

---

## 5. Renderização dos Cards

### Função: `renderProjectCard(project)`

**Estrutura HTML gerada:**
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

**Detalhes importantes:**
- `--project-color` é passada como variável CSS inline para uso no hover e neon
- Ícone usa `background: {cor}20` (cor com 20% de opacidade via hex)
- Status do indicador é aplicado como classe CSS

---

## 6. Renderização da Página de Projeto

### Função: `renderProject()`

**Estrutura HTML gerada:**
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
    <!-- Tags renderizadas via map() -->
  </div>

  <h3 class="section-title">Sobre o Projeto</h3>
  <p class="description-text">{descricao}</p>
</div>

<button class="theme-toggle" onclick="App.toggleTheme()">
  <span class="theme-toggle-icon"></span>
</button>
```

---

## 7. Renderização do Log

### Função: `renderPage()` (LogApp)

**Diferença importante:** Os itens são invertidos com `.reverse()` para mostrar o mais recente no topo.

```javascript
const alteracoes = (this.data.alteracoes || []).reverse();
```

**Estrutura HTML gerada:**
```html
<div class="log-page">
  <a href="/" class="project-back" data-link>← Voltar</a>

  <header class="log-header">
    <h1 class="log-title">📋 Histórico de Alterações</h1>
    <p class="log-subtitle">Todas as modificações realizadas no site</p>
    <p class="log-update">Última atualização: {dataAtualizacao}</p>
  </header>

  <div class="log-list">
    <!-- Itens renderizados via map() -->
  </div>
</div>

<button class="theme-toggle" onclick="LogApp.toggleTheme()">
  <span class="theme-toggle-icon"></span>
</button>
```

### Função: `renderLogItem(item)`

```html
<div class="log-item">
  <div class="log-date">{data} às {horario}</div>
  <div class="log-desc">{descricao}</div>
</div>
```

---

## 8. Hover e Feedback Visual

### Cards de Projetos
- **Hover:** `translateY(-2px)`, sombra aumentada, background muda para cor do projeto com 15% de opacidade
- **Active:** `translateY(0)` (volta ao normal)

### Botões (footer-btn, project-back)
- **Hover:** `translateY(-2px)`, neon aumentado, background muda para roxo com 15% de opacidade

### Botão de Tema
- **Hover:** `scale(1.1)`, sombra aumentada

### Itens do Log
- **Hover:** `translateY(-2px)`, background muda para roxo com 10% de opacidade

---

## 9. Labels de Status

### Função: `getStatusLabel(status)`

```javascript
const labels = {
  'nao-iniciado': 'Não Iniciado',
  'em-andamento': 'Em Andamento',
  'funcionando': 'Funcionando'
};
return labels[status] || status;
```

---

## 10. Inicialização

### App Principal (`app.js`)

```javascript
async init() {
  await this.loadData();    // Carrega projetos.json
  this.loadTheme();         // Aplica tema salvo
  this.setupRouter();       // Configura listeners de rota
  this.handleRoute();       // Renderiza página inicial
}
```

### App do Log (`log.js`)

```javascript
async init() {
  await this.loadData();    // Carrega log.json
  this.loadTheme();         // Aplica tema salvo
  this.render();            // Renderiza página de log
}
```

---

## 11. Interceptação de Cliques

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

**Importante:** Apenas links com `data-link` são interceptados. O link para `log.html` não tem esse atributo, fazendo navegação nativa.

---

## 12. Navegação

### Função: `navigate(href)`

```javascript
navigate(href) {
  history.pushState(null, '', href);
  this.handleRoute();
}
```

### Função: `handleRoute()`

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
