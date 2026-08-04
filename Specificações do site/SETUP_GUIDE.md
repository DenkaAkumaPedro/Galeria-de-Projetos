# Guia de Configuração

## Visão Geral

Este guia explica como configurar, rodar e personalizar o site Galeria de Projetos.

---

## 1. Pré-requisitos

- **Navegador web:** Chrome, Firefox, Edge ou Safari (versão moderna)
- **Editor de código:** VS Code (recomendado) ou qualquer editor
- **Live Server:** Extensão para VS Code (recomendado para rodar localmente)
- **Git:** Para clonar o repositório (opcional)

---

## 2. Como Clonar o Repositório

```bash
git clone https://github.com/DenkaAkumaPedro/Galeria-de-Projetos.git
cd Galeria-de-Projetos
```

---

## 3. Como Rodar Localmente

### Opção 1: Live Server (Recomendado)
1. Instale a extensão "Live Server" no VS Code
2. Clique com o botão direito no `index.html`
3. Selecione "Open with Live Server"
4. O site abrirá em `http://127.0.0.1:5500`

### Opção 2: Abrir direto no navegador
1. Navegue até a pasta do projeto
2. Dê um duplo-clique no `index.html`
3. O site abrirá no navegador

**Nota:** Ao abrir direto no navegador, o fetch dos JSON pode não funcionar devido ao CORS. Use o Live Server para melhor experiência.

---

## 4. Como Adicionar um Projeto

### Passo 1: Editar projetos.json

Abra `data/projetos.json` e adicione uma nova entrada:

```json
{
  "id": "meu-projeto",
  "titulo": "Meu Novo Projeto",
  "status": "nao-iniciado",
  "versao": "0.0.0",
  "icone": "📌",
  "cor": "#6366f1",
  "descricao": "Descrição do projeto...",
  "tecnologias": ["HTML", "CSS", "JavaScript"],
  "atualizadoEm": "03/08/2026"
}
```

### Passo 2: Criar arquivo HTML

Crie um arquivo `projetos/meu-projeto.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Projeto - Galeria de Projetos</title>
  <meta name="description" content="Detalhes do projeto - Galeria de Projetos">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <div id="app"></div>
  <script src="../js/app.js"></script>
</body>
</html>
```

### Passo 3: Atualizar o log

Adicione uma entrada em `data/log.json`:

```json
{
  "data": "03/08/2026",
  "horario": "18:00",
  "descricao": "Adição do projeto Meu Projeto"
}
```

---

## 5. Como Alterar Textos

### Título do Site
Em `js/app.js`, linha 86:
```javascript
<h1 class="hub-title">Galeria de Projetos</h1>
```

### Subtítulo
Em `js/app.js`, linha 87:
```javascript
<p class="hub-subtitle">Projetos para aplicar com IA</p>
```

### Data de Início
Em `js/app.js`, linha 79:
```javascript
const dataInicio = '03/08/2026';
```

### Meta Tag
Em `index.html`, linha 7:
```html
<meta name="description" content="Projetos para aplicar com IA">
```

---

## 6. Como Alterar Cores

### Cores de Status
Em `css/style.css`, variáveis `:root`:
```css
:root {
  --status-nao-iniciado: #ef4444;  /* Vermelho */
  --status-em-andamento: #f59e0b;  /* Amarelo */
  --status-funcionando: #22c55e;   /* Verde */
}
```

### Cor de um Projeto
Em `data/projetos.json`, altere o campo `cor`:
```json
"cor": "#6366f1"
```

### Cores do Tema
Em `css/style.css`:
```css
:root {
  --bg-primary: #e8e8e8;    /* Fundo claro */
  --bg-card: #ffffff;        /* Card claro */
}

[data-theme="dark"] {
  --bg-primary: #0a0a0a;    /* Fundo escuro */
  --bg-card: #171717;        /* Card escuro */
}
```

---

## 7. Como Alterar Ícones

Os ícones são emojis. Para trocar, altere o campo `icone` no `data/projetos.json`:

```json
"icone": "🎭"
```

Alguns emojis úteis:
- 🤖 Robô
- ⚙️ Engrenagem
- ☯ Yin Yang
- 🔗 Link
- 💼 Trabalho
- 📱 Celular
- 🎭 Máscara
- 📖 Livro
- 🎬 Filme
- 📚 Livro
- 🎌 Bandeira
- 🎮 Game
- 🌐 Globo
- 🎤 Microfone

---

## 8. Como Atualizar o Log

### Adicionar Nova Alteração

Abra `data/log.json` e adicione uma entrada:

```json
{
  "data": "03/08/2026",
  "horario": "18:00",
  "descricao": "Descrição da alteração"
}
```

### Atualizar Data de Atualização

Altere o campo `dataAtualizacao` no `data/projetos.json`:

```json
"dataAtualizacao": "03/08/2026"
```

---

## 9. Deploy no GitHub Pages

1. Faça push do código para o GitHub
2. Acesse as configurações do repositório
3. Vá em "Pages" no menu lateral
4. Selecione a branch `main`
5. Selecione a pasta raiz `/`
6. Clique em "Save"
7. O site estará disponível em `https://usuario.github.io/nome-repo/`

---

## 10. Deploy no Cloudflare Pages

1. Acesse o painel do Cloudflare
2. Vá em "Pages"
3. Clique em "Create a project"
4. Conecte seu repositório do GitHub
5. Configure:
   - **Build command:** (deixe vazio)
   - **Build output directory:** `/`
6. Clique em "Save and Deploy"
7. O site será publicado automaticamente

---

## 11. Solução de Problemas

### Fetch dos JSON não funciona
- **Causa:** Abrir o site direto no navegador (file://)
- **Solução:** Use o Live Server do VS Code

### Tema não salva
- **Causa:** localStorage bloqueado
- **Solução:** Verifique as permissões do navegador

### Layout quebrado no mobile
- **Causa:** Viewport não configurado
- **Solução:** Verifique se a meta tag viewport está presente no HTML
