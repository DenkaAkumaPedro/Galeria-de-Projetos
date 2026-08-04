# Especificação de Conteúdo

## Visão Geral

Este documento lista todo o conteúdo textual que aparece no site Galeria de Projetos, organizado por página e elemento.

---

## 1. Página Principal (Hub)

### Meta Tags
- **Título da aba:** `Galeria de Projetos`
- **Descrição:** `Projetos para aplicar com IA`

### Cabeçalho
- **Título (h1):** `Galeria de Projetos`
- **Subtítulo:** `Projetos para aplicar com IA`
- **Data de início:** `📅 Início: 03/08/2026`
- **Data de atualização:** `🔄 Atualizado: {dataAtualizacao}` (lido do `projetos.json`)

### Rodapé
- **Botão:** `📋 Histórico de Alterações` (link para `log.html`)

### Botão de Tema
- **Tooltip:** `Alternar tema`
- **Ícones:** `☀️` (tema claro) / `🌙` (tema escuro)

---

## 2. Cards de Projetos (Hub)

Cada card contém:
- **Título:** `{project.titulo}`
- **Meta:** `v{project.versao} · {statusLabel}`
- **Data:** `{project.atualizadoEm}`
- **Ícone:** `{project.icone}` (emoji)
- **Indicador de status:** círculo colorido (vermelho/amarelo/verde)

### Labels de Status
| Chave | Label Exibido |
|-------|---------------|
| `nao-iniciado` | `Não Iniciado` |
| `em-andamento` | `Em Andamento` |
| `funcionando` | `Funcionando` |

---

## 3. Página de Projeto

### Cabeçalho
- **Ícone:** `{project.icone}` (emoji com fundo colorido)
- **Título (h1):** `{project.titulo}`
- **Descrição:** `{project.descricao}`

### Badge de Status
- Texto: `{statusLabel}` (mesmos labels da lista)

### Grid de Informações
- **Card 1 - Versão:** Label `Versão`, Valor `v{project.versao}`
- **Card 2 - Atualizado:** Label `Atualizado`, Valor `{project.atualizadoEm}`

### Tecnologias
- **Título da seção:** `Tecnologias`
- **Tags:** cada item de `{project.tecnologias}`

### Sobre o Projeto
- **Título da seção:** `Sobre o Projeto`
- **Texto:** `{project.descricao}`

### Botão Voltar
- **Texto:** `← Voltar`

---

## 4. Página de Log

### Meta Tags
- **Título da aba:** `Histórico de Alterações - Galeria de Projetos`
- **Descrição:** `Histórico de todas as alterações realizadas no site Galeria de Projetos`

### Cabeçalho
- **Título (h1):** `📋 Histórico de Alterações`
- **Subtítulo:** `Todas as modificações realizadas no site`
- **Data de atualização:** `Última atualização: {dataAtualizacao}`

### Botão Voltar
- **Texto:** `← Voltar`

### Itens do Log
Cada item contém:
- **Data:** `{data} às {horario}`
- **Descrição:** `{descricao}`

---

## 5. Estrutura de Dados

### projetos.json

```json
{
  "dataAtualizacao": "DD/MM/AAAA",
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
      "descricao": "string"
    }
  ]
}
```

---

## 6. Lista de Projetos Atual

| # | Título | Ícone | Cor | Descrição | Tecnologias |
|---|--------|-------|-----|-----------|-------------|
| 1 | Aplicação de IA no Dia a dia | 🤖 | #6366f1 | Explorar e desenvolver ferramentas de IA para uso cotidiano | IA, Automação |
| 2 | Automação de Tarefas | ⚙️ | #8b5cf6 | Criar sistemas automatizados para repetir tarefas rotineiras | Automação, Scripts |
| 3 | Linktree Geral | ☯ | #1a1a2e | Página de links geral para consolidar todos os projetos | HTML, CSS |
| 4 | Linktree Pessoal | 🔗 | #ec4899 | Página de links pessoal para consolidar redes e projetos | HTML, CSS |
| 5 | Linktree Profissional | 💼 | #14b8a6 | Página de links profissional para portfólio e contato | HTML, CSS |
| 6 | Integração com Outros Apps | 📱 | #f59e0b | Conectar diferentes aplicativos e serviços | APIs, Integração |
| 7 | Projeto Vtuber | 🎭 | #39c5cf | Explorar a criação de um avatar virtual para streaming | 3D, Avatar, IA |
| 8 | Tradutor de Tela | 📖 | #3b82f6 | Ferramenta para traduzir texto captado da tela em tempo real | IA, OCR, Tradução |
| 9 | Tradutor de Vídeos | 🎬 | #a855f7 | Sistema para traduzir automaticamente o áudio de vídeos | IA, Áudio, Legendas |
| 10 | Criação de Material de Estudos | 📚 | #22c55e | Gerar material de estudo personalizado usando IA | IA, Educação |
| 11 | Sincronizar Lista de Animes | 🎌 | #f97316 | Manter uma lista de animes sincronizada entre plataformas | APIs, Sincronização |

---

## 7. Lista Completa do Log (21 entradas)

| # | Data | Horário | Descrição |
|---|------|---------|-----------|
| 1 | 03/08/2026 | 10:00 | Criação inicial do site Galeria de Projetos |
| 2 | 03/08/2026 | 14:30 | Alteração do texto principal para 'Projetos para aplicar com IA' |
| 3 | 03/08/2026 | 14:35 | Troca dos ícones: Projeto Vtuber (🎤→🎭) e Tradutor de Tela (🌐→📖) |
| 4 | 03/08/2026 | 14:40 | Aumento do tamanho do texto de versão e data nos cards |
| 5 | 03/08/2026 | 14:45 | Adição de feedback visual de hover nos cards e elementos interativos |
| 6 | 03/08/2026 | 14:50 | Aumento do avatar de 80px para 140px com centralização |
| 7 | 03/08/2026 | 14:55 | Adição de datas de início e última atualização abaixo do avatar |
| 8 | 03/08/2026 | 15:00 | Criação do rodapé com botão para histórico de alterações |
| 9 | 03/08/2026 | 15:05 | Criação da página de log de alterações |
| 10 | 03/08/2026 | 15:30 | Adição de horário nas entradas do log |
| 11 | 03/08/2026 | 15:35 | Adição de efeito neon em botões e ícones |
| 12 | 03/08/2026 | 15:40 | Aumento do espaço entre itens nas listas |
| 13 | 03/08/2026 | 15:45 | Aumento dos ícones da lista para melhor alinhamento |
| 14 | 03/08/2026 | 16:00 | Correção do link Histórico de Alterações (removido data-link) |
| 15 | 03/08/2026 | 16:15 | Alinhamento das datas à direita na página de log |
| 16 | 03/08/2026 | 16:20 | Neon nos cards de projetos usando cor correspondente a cada item |
| 17 | 03/08/2026 | 16:25 | Intensificação do efeito neon no avatar |
| 18 | 03/08/2026 | 16:30 | Adição do projeto Linktree Geral |
| 19 | 03/08/2026 | 17:00 | Inversão da ordem dos itens no log (mais recente no topo) |
| 20 | 03/08/2026 | 17:05 | Aumento do contorno neon no avatar |
| 21 | 03/08/2026 | 17:10 | Aumento do contraste no modo claro |
