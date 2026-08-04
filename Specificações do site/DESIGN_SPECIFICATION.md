# Especificação de Design

## Visão Geral

Este documento descreve todos os elementos visuais do site: cores, tipografia, layout, efeitos e responsividade.

---

## 1. Paleta de Cores

### Tema Claro (`:root`)

| Variável | Cor | Uso |
|----------|-----|-----|
| `--bg-primary` | `#e8e8e8` | Fundo da página |
| `--bg-card` | `#ffffff` | Fundo de cards e botões |
| `--text-primary` | `#171717` | Texto principal |
| `--text-secondary` | `#525252` | Texto secundário |
| `--text-muted` | `#a3a3a3` | Texto desabilitado/muted |
| `--border` | `#e5e5e5` | Bordas |
| `--shadow` | `0 1px 3px rgba(0,0,0,0.08)` | Sombra padrão |
| `--shadow-hover` | `0 4px 12px rgba(0,0,0,0.12)` | Sombra no hover |

### Tema Escuro (`[data-theme="dark"]`)

| Variável | Cor | Uso |
|----------|-----|-----|
| `--bg-primary` | `#0a0a0a` | Fundo da página |
| `--bg-card` | `#171717` | Fundo de cards e botões |
| `--text-primary` | `#fafafa` | Texto principal |
| `--text-secondary` | `#a3a3a3` | Texto secundário |
| `--text-muted` | `#525252` | Texto desabilitado/muted |
| `--border` | `#262626` | Bordas |
| `--shadow` | `0 1px 3px rgba(0,0,0,0.3)` | Sombra padrão |
| `--shadow-hover` | `0 4px 12px rgba(0,0,0,0.5)` | Sombra no hover |

### Cores de Status

| Variável | Cor Claro | Cor Escuro |
|----------|-----------|------------|
| `--status-nao-iniciado` | `#ef4444` (vermelho) | `#f87171` |
| `--status-em-andamento` | `#f59e0b` (amarelo) | `#fbbf24` |
| `--status-funcionando` | `#22c55e` (verde) | `#4ade80` |

### Cores dos Projetos

| Projeto | Cor |
|---------|-----|
| Aplicação de IA no Dia a dia | `#6366f1` (roxo) |
| Automação de Tarefas | `#8b5cf6` (roxo escuro) |
| Linktree Geral | `#1a1a2e` (azul escuro) |
| Linktree Pessoal | `#ec4899` (rosa) |
| Linktree Profissional | `#14b8a6` (verde água) |
| Integração com Outros Apps | `#f59e0b` (amarelo) |
| Projeto Vtuber | `#39c5cf` (ciano) |
| Tradutor de Tela | `#3b82f6` (azul) |
| Tradutor de Vídeos | `#a855f7` (lilás) |
| Criação de Material de Estudos | `#22c55e` (verde) |
| Sincronizar Lista de Animes | `#f97316` (laranja) |

---

## 2. Tipografia

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Tamanhos de Fonte

| Elemento | Tamanho | Peso |
|----------|---------|------|
| `.hub-title` | 24px | 700 (bold) |
| `.hub-subtitle` | 14px | 400 (normal) |
| `.hub-dates` | 13px | 400 |
| `.project-title` | 16px | 600 (semibold) |
| `.project-meta` | 15px | 500 (medium) |
| `.project-date` | 14px | 400 |
| `.project-page-title` | 28px | 700 |
| `.project-page-desc` | 16px | 400 |
| `.footer-btn` | 14px | 500 |
| `.status-badge` | 14px | 500 |
| `.info-label` | 12px | 400 |
| `.info-value` | 18px | 600 |
| `.tech-tag` | 13px | 400 |
| `.section-title` | 16px | 600 |
| `.description-text` | 15px | 400 |
| `.log-title` | 24px | 700 |
| `.log-subtitle` | 14px | 400 |
| `.log-date` | 13px | 500 |
| `.log-desc` | 15px | 400 |

---

## 3. Layout

### Hub (Página Principal)
- **Largura máxima:** 480px
- **Margin:** 0 auto (centralizado)
- **Padding:** 40px 20px

### Página de Projeto
- **Largura máxima:** 600px
- **Margin:** 0 auto
- **Padding:** 40px 20px

### Página de Log
- **Largura máxima:** 600px
- **Margin:** 0 auto
- **Padding:** 40px 20px

### Avatar
- **Tamanho:** 140px × 140px
- **Formato:** Hexagonal (`clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`)
- **Background:** Gradiente `linear-gradient(135deg, #6366f1, #a855f7)`
- **Object-fit:** cover

### Ícone do Card
- **Tamanho:** 56px × 56px
- **Formato:** Hexagonal (mesmo clip-path)
- **Font-size:** 28px

### Ícone da Página de Projeto
- **Tamanho:** 64px × 64px
- **Formato:** Hexagonal
- **Font-size:** 32px

### Indicador de Status
- **Tamanho:** 12px × 12px
- **Border-radius:** 50%

### Dot do Status Badge
- **Tamanho:** 8px × 8px
- **Border-radius:** 50%

### Botão de Tema
- **Tamanho:** 56px × 56px
- **Posição:** fixed, bottom: 24px, right: 24px
- **Formato:** Hexagonal
- **z-index:** 50

---

## 4. Espaçamentos

| Elemento | Propriedade | Valor |
|----------|-------------|-------|
| `.hub` | padding | 40px 20px |
| `.hub-header` | margin-bottom | 40px |
| `.hub-dates` | margin-top | 12px |
| `.hub-dates` | gap | 4px |
| `.hub-footer` | margin-top | 32px |
| `.hub-list` | gap | 20px |
| `.project-card` | padding | 16px |
| `.project-card` | gap | 16px |
| `.project-back` | margin-bottom | 32px |
| `.project-back` | padding | 12px 20px |
| `.project-header` | margin-bottom | 32px |
| `.status-badge` | margin-bottom | 24px |
| `.status-badge` | padding | 8px 16px |
| `.info-grid` | gap | 16px |
| `.info-grid` | margin-bottom | 32px |
| `.info-card` | padding | 16px |
| `.tech-tags` | gap | 12px |
| `.tech-tags` | margin-bottom | 32px |
| `.tech-tag` | padding | 6px 12px |
| `.section-title` | margin-bottom | 12px |
| `.log-page` | padding | 40px 20px |
| `.log-header` | margin-bottom | 32px |
| `.log-list` | gap | 20px |
| `.log-item` | padding | 16px |

---

## 5. Bordas e Bordas Arredondadas

| Variável/Seletor | Valor |
|------------------|-------|
| `--radius` | 12px |
| `--radius-sm` | 8px |
| `.status-badge` | 20px |
| `.tech-tag` | 20px |
| `.project-status` | 50% (círculo) |
| `.status-dot` | 50% (círculo) |

---

## 6. Efeitos Visuais

### Neon (drop-shadow)

**Avatar:**
```css
filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.7)) drop-shadow(0 0 24px rgba(99, 102, 241, 0.5));
```

**Ícone do Card (usando cor do projeto):**
```css
filter: drop-shadow(0 0 3px color-mix(in srgb, var(--project-color) 40%, transparent))
        drop-shadow(0 0 6px color-mix(in srgb, var(--project-color) 20%, transparent));
```

**Ícone da Página de Projeto:**
```css
filter: drop-shadow(0 0 4px rgba(99, 102, 241, 0.4)) drop-shadow(0 0 8px rgba(99, 102, 241, 0.2));
```

**Botões (footer-btn, project-back):**
```css
box-shadow: 0 0 4px rgba(99, 102, 241, 0.4), 0 0 8px rgba(99, 102, 241, 0.2);
```

**Botão de Tema:**
```css
box-shadow: 0 0 4px rgba(99, 102, 241, 0.4), 0 0 8px rgba(99, 102, 241, 0.2);
```

**Status Badge:**
```css
box-shadow: 0 0 3px rgba(99, 102, 241, 0.3), 0 0 6px rgba(99, 102, 241, 0.15);
```

### Hover nos Cards
```css
.project-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
  background: color-mix(in srgb, var(--project-color) 15%, var(--bg-card));
  border-color: color-mix(in srgb, var(--project-color) 40%, transparent);
}
```

### Hover nos Botões
```css
.footer-btn:hover {
  box-shadow: 0 0 6px rgba(99, 102, 241, 0.6), 0 0 12px rgba(99, 102, 241, 0.3), var(--shadow-hover);
  transform: translateY(-2px);
  background: color-mix(in srgb, #6366f1 15%, var(--bg-card));
  border-color: color-mix(in srgb, #6366f1 40%, transparent);
}
```

### Hover no Botão de Tema
```css
.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 0 6px rgba(99, 102, 241, 0.6), 0 0 12px rgba(99, 102, 241, 0.3), 0 6px 16px rgba(0, 0, 0, 0.2);
}
```

### Transição
```css
--transition: 0.2s ease;
```

---

## 7. Clip-Path Hexagonal

Usado em: avatar, ícones de cards, ícone de página de projeto, botão de tema.

```css
clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
```

---

## 8. Responsividade

### Breakpoint: `max-width: 480px`

| Elemento | Mudança |
|----------|---------|
| `.hub` | padding: 24px 16px |
| `.hub-title` | font-size: 20px |
| `.project-card` | padding: 14px |
| `.project-icon` | width: 50px, height: 50px, font-size: 24px |
| `.project-page` | padding: 24px 16px |
| `.info-grid` | grid-template-columns: 1fr (1 coluna) |

---

## 9. Grid de Informações

```css
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

@media (max-width: 480px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 10. Ícones do Tema

| Tema | Ícone | Método |
|------|-------|--------|
| Claro | ☀️ | `.theme-toggle-icon::after { content: '☀️'; }` |
| Escuro | 🌙 | `[data-theme="dark"] .theme-toggle-icon::after { content: '🌙'; }` |
