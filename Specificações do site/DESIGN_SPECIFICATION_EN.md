# Design Specification

## Overview

This document describes all visual elements of the site: colors, typography, layout, effects, and responsiveness.

---

## 1. Color Palette

### Light Theme (`:root`)

| Variable | Color | Usage |
|----------|-------|-------|
| `--bg-primary` | `#e8e8e8` | Page background |
| `--bg-card` | `#ffffff` | Card and button background |
| `--text-primary` | `#171717` | Primary text |
| `--text-secondary` | `#525252` | Secondary text |
| `--text-muted` | `#a3a3a3` | Disabled/muted text |
| `--border` | `#e5e5e5` | Borders |
| `--shadow` | `0 1px 3px rgba(0,0,0,0.08)` | Default shadow |
| `--shadow-hover` | `0 4px 12px rgba(0,0,0,0.12)` | Hover shadow |

### Dark Theme (`[data-theme="dark"]`)

| Variable | Color | Usage |
|----------|-------|-------|
| `--bg-primary` | `#0a0a0a` | Page background |
| `--bg-card` | `#171717` | Card and button background |
| `--text-primary` | `#fafafa` | Primary text |
| `--text-secondary` | `#a3a3a3` | Secondary text |
| `--text-muted` | `#525252` | Disabled/muted text |
| `--border` | `#262626` | Borders |
| `--shadow` | `0 1px 3px rgba(0,0,0,0.3)` | Default shadow |
| `--shadow-hover` | `0 4px 12px rgba(0,0,0,0.5)` | Hover shadow |

### Status Colors

| Variable | Light Color | Dark Color |
|----------|-------------|------------|
| `--status-nao-iniciado` | `#ef4444` (red) | `#f87171` |
| `--status-em-andamento` | `#f59e0b` (yellow) | `#fbbf24` |
| `--status-funcionando` | `#22c55e` (green) | `#4ade80` |

### Project Colors

| Project | Color |
|---------|-------|
| Aplicação de IA no Dia a dia | `#6366f1` (purple) |
| Automação de Tarefas | `#8b5cf6` (dark purple) |
| Linktree Geral | `#1a1a2e` (dark blue) |
| Linktree Pessoal | `#ec4899` (pink) |
| Linktree Profissional | `#14b8a6` (teal) |
| Integração com Outros Apps | `#f59e0b` (yellow) |
| Projeto Vtuber | `#39c5cf` (cyan) |
| Tradutor de Tela | `#3b82f6` (blue) |
| Tradutor de Vídeos | `#a855f7` (lilac) |
| Criação de Material de Estudos | `#22c55e` (green) |
| Sincronizar Lista de Animes | `#f97316` (orange) |

---

## 2. Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Font Sizes

| Element | Size | Weight |
|---------|------|--------|
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

### Hub (Main Page)
- **Max width:** 480px
- **Margin:** 0 auto (centered)
- **Padding:** 40px 20px

### Project Page
- **Max width:** 600px
- **Margin:** 0 auto
- **Padding:** 40px 20px

### Log Page
- **Max width:** 600px
- **Margin:** 0 auto
- **Padding:** 40px 20px

### Avatar
- **Size:** 140px × 140px
- **Shape:** Hexagonal (`clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`)
- **Background:** Gradient `linear-gradient(135deg, #6366f1, #a855f7)`
- **Object-fit:** cover

### Card Icon
- **Size:** 56px × 56px
- **Shape:** Hexagonal (same clip-path)
- **Font-size:** 28px

### Project Page Icon
- **Size:** 64px × 64px
- **Shape:** Hexagonal
- **Font-size:** 32px

### Status Indicator
- **Size:** 12px × 12px
- **Border-radius:** 50%

### Status Badge Dot
- **Size:** 8px × 8px
- **Border-radius:** 50%

### Theme Toggle Button
- **Size:** 56px × 56px
- **Position:** fixed, bottom: 24px, right: 24px
- **Shape:** Hexagonal
- **z-index:** 50

---

## 4. Spacing

| Element | Property | Value |
|---------|----------|-------|
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

## 5. Borders and Border Radius

| Variable/Selector | Value |
|-------------------|-------|
| `--radius` | 12px |
| `--radius-sm` | 8px |
| `.status-badge` | 20px |
| `.tech-tag` | 20px |
| `.project-status` | 50% (circle) |
| `.status-dot` | 50% (circle) |

---

## 6. Visual Effects

### Neon (drop-shadow)

**Avatar:**
```css
filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.7)) drop-shadow(0 0 24px rgba(99, 102, 241, 0.5));
```

**Card Icon (using project color):**
```css
filter: drop-shadow(0 0 3px color-mix(in srgb, var(--project-color) 40%, transparent))
        drop-shadow(0 0 6px color-mix(in srgb, var(--project-color) 20%, transparent));
```

**Project Page Icon:**
```css
filter: drop-shadow(0 0 4px rgba(99, 102, 241, 0.4)) drop-shadow(0 0 8px rgba(99, 102, 241, 0.2));
```

**Buttons (footer-btn, project-back):**
```css
box-shadow: 0 0 4px rgba(99, 102, 241, 0.4), 0 0 8px rgba(99, 102, 241, 0.2);
```

**Theme Toggle Button:**
```css
box-shadow: 0 0 4px rgba(99, 102, 241, 0.4), 0 0 8px rgba(99, 102, 241, 0.2);
```

**Status Badge:**
```css
box-shadow: 0 0 3px rgba(99, 102, 241, 0.3), 0 0 6px rgba(99, 102, 241, 0.15);
```

### Card Hover
```css
.project-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
  background: color-mix(in srgb, var(--project-color) 15%, var(--bg-card));
  border-color: color-mix(in srgb, var(--project-color) 40%, transparent);
}
```

### Button Hover
```css
.footer-btn:hover {
  box-shadow: 0 0 6px rgba(99, 102, 241, 0.6), 0 0 12px rgba(99, 102, 241, 0.3), var(--shadow-hover);
  transform: translateY(-2px);
  background: color-mix(in srgb, #6366f1 15%, var(--bg-card));
  border-color: color-mix(in srgb, #6366f1 40%, transparent);
}
```

### Theme Toggle Hover
```css
.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 0 6px rgba(99, 102, 241, 0.6), 0 0 12px rgba(99, 102, 241, 0.3), 0 6px 16px rgba(0, 0, 0, 0.2);
}
```

### Transition
```css
--transition: 0.2s ease;
```

---

## 7. Hexagonal Clip-Path

Used in: avatar, card icons, project page icon, theme toggle button.

```css
clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
```

---

## 8. Responsiveness

### Breakpoint: `max-width: 480px`

| Element | Change |
|---------|--------|
| `.hub` | padding: 24px 16px |
| `.hub-title` | font-size: 20px |
| `.project-card` | padding: 14px |
| `.project-icon` | width: 50px, height: 50px, font-size: 24px |
| `.project-page` | padding: 24px 16px |
| `.info-grid` | grid-template-columns: 1fr (1 column) |

---

## 9. Information Grid

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

## 10. Theme Icons

| Theme | Icon | Method |
|-------|------|--------|
| Light | ☀️ | `.theme-toggle-icon::after { content: '☀️'; }` |
| Dark | 🌙 | `[data-theme="dark"] .theme-toggle-icon::after { content: '🌙'; }` |
