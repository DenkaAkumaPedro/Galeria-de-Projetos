# Content Specification

## Overview

This document lists all textual content that appears on the Galeria de Projetos (Project Gallery) site, organized by page and element.

---

## 1. Main Page (Hub)

### Meta Tags
- **Tab title:** `Galeria de Projetos`
- **Description:** `Projetos para aplicar com IA`

### Header
- **Title (h1):** `Galeria de Projetos`
- **Subtitle:** `Projetos para aplicar com IA`
- **Start date:** `📅 Início: 03/08/2026`
- **Update date:** `🔄 Atualizado: {dataAtualizacao}` (read from `projetos.json`)

### Footer
- **Button:** `📋 Histórico de Alterações` (links to `log.html`)

### Theme Button
- **Tooltip:** `Alternar tema`
- **Icons:** `☀️` (light theme) / `🌙` (dark theme)

---

## 2. Project Cards (Hub)

Each card contains:
- **Title:** `{project.titulo}`
- **Meta:** `v{project.versao} · {statusLabel}`
- **Date:** `{project.atualizadoEm}`
- **Icon:** `{project.icone}` (emoji)
- **Status indicator:** colored circle (red/yellow/green)

### Status Labels
| Key | Displayed Label |
|-----|-----------------|
| `nao-iniciado` | `Não Iniciado` |
| `em-andamento` | `Em Andamento` |
| `funcionando` | `Funcionando` |

---

## 3. Project Page

### Header
- **Icon:** `{project.icone}` (emoji with colored background)
- **Title (h1):** `{project.titulo}`
- **Description:** `{project.descricao}`

### Status Badge
- Text: `{statusLabel}` (same labels as list)

### Info Grid
- **Card 1 - Version:** Label `Versão`, Value `v{project.versao}`
- **Card 2 - Updated:** Label `Atualizado`, Value `{project.atualizadoEm}`

### Technologies
- **Section title:** `Tecnologias`
- **Tags:** each item from `{project.tecnologias}`

### About the Project
- **Section title:** `Sobre o Projeto`
- **Text:** `{project.descricao}`

### Back Button
- **Text:** `← Voltar`

---

## 4. Log Page

### Meta Tags
- **Tab title:** `Histórico de Alterações - Galeria de Projetos`
- **Description:** `Histórico de todas as alterações realizadas no site Galeria de Projetos`

### Header
- **Title (h1):** `📋 Histórico de Alterações`
- **Subtitle:** `Todas as modificações realizadas no site`
- **Update date:** `Última atualização: {dataAtualizacao}`

### Back Button
- **Text:** `← Voltar`

### Log Items
Each item contains:
- **Date:** `{data} às {horario}`
- **Description:** `{descricao}`

---

## 5. Data Structure

### projetos.json

```json
{
  "dataAtualizacao": "DD/MM/YYYY",
  "projetos": [
    {
      "id": "string",
      "titulo": "string",
      "status": "nao-iniciado | em-andamento | funcionando",
      "versao": "X.Y.Z",
      "icone": "emoji",
      "cor": "#hexcolor",
      "descricao": "string",
      "tecnologias": ["string"],
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
      "descricao": "string"
    }
  ]
}
```

---

## 6. Current Project List

| # | Title | Icon | Color | Description | Technologies |
|---|-------|------|-------|-------------|-------------|
| 1 | Aplicação de IA no Dia a dia | 🤖 | #6366f1 | Explore and develop AI tools for daily use | AI, Automation |
| 2 | Automação de Tarefas | ⚙️ | #8b5cf6 | Create automated systems for repetitive tasks | Automation, Scripts |
| 3 | Linktree Geral | ☯ | #1a1a2e | General links page to consolidate all projects | HTML, CSS |
| 4 | Linktree Pessoal | 🔗 | #ec4899 | Personal links page to consolidate networks and projects | HTML, CSS |
| 5 | Linktree Profissional | 💼 | #14b8a6 | Professional links page for portfolio and contact | HTML, CSS |
| 6 | Integração com Outros Apps | 📱 | #f59e0b | Connect different applications and services | APIs, Integration |
| 7 | Projeto Vtuber | 🎭 | #39c5cf | Explore creating a virtual avatar for streaming | 3D, Avatar, AI |
| 8 | Tradutor de Tela | 📖 | #3b82f6 | Tool to translate screen-captured text in real time | AI, OCR, Translation |
| 9 | Tradutor de Vídeos | 🎬 | #a855f7 | System to automatically translate video audio | AI, Audio, Subtitles |
| 10 | Criação de Material de Estudos | 📚 | #22c55e | Generate personalized study material using AI | AI, Education |
| 11 | Sincronizar Lista de Animes | 🎌 | #f97316 | Keep an anime list synchronized across platforms | APIs, Synchronization |

---

## 7. Complete Log List (21 entries)

| # | Date | Time | Description |
|---|------|------|-------------|
| 1 | 03/08/2026 | 10:00 | Initial creation of the Galeria de Projetos site |
| 2 | 03/08/2026 | 14:30 | Changed main text to 'Projetos para aplicar com IA' |
| 3 | 03/08/2026 | 14:35 | Swapped icons: Vtuber Project (🎤→🎭) and Screen Translator (🌐→📖) |
| 4 | 03/08/2026 | 14:40 | Increased version and date text size on cards |
| 5 | 03/08/2026 | 14:45 | Added visual hover feedback on cards and interactive elements |
| 6 | 03/08/2026 | 14:50 | Increased avatar from 80px to 140px with centering |
| 7 | 03/08/2026 | 14:55 | Added start and last update dates below avatar |
| 8 | 03/08/2026 | 15:00 | Created footer with history of changes button |
| 9 | 03/08/2026 | 15:05 | Created change log page |
| 10 | 03/08/2026 | 15:30 | Added time to log entries |
| 11 | 03/08/2026 | 15:35 | Added neon effect to buttons and icons |
| 12 | 03/08/2026 | 15:40 | Increased spacing between list items |
| 13 | 03/08/2026 | 15:45 | Increased list icons for better alignment |
| 14 | 03/08/2026 | 16:00 | Fixed History link (removed data-link) |
| 15 | 03/08/2026 | 16:15 | Aligned dates to the right on log page |
| 16 | 03/08/2026 | 16:20 | Neon on project cards using corresponding color per item |
| 17 | 03/08/2026 | 16:25 | Intensified neon effect on avatar |
| 18 | 03/08/2026 | 16:30 | Added Linktree Geral project |
| 19 | 03/08/2026 | 17:00 | Reversed log item order (most recent first) |
| 20 | 03/08/2026 | 17:05 | Increased neon outline on avatar |
| 21 | 03/08/2026 | 17:10 | Increased contrast in light mode |
