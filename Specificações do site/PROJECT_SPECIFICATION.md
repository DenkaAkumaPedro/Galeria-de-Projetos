# Especificação do Projeto

## Visão Geral

**Nome:** Galeria de Projetos
**Tipo:** Site SPA (Single Page Application) estilo linktree
**Objetivo:** Exibir uma lista visual de projetos de apps e código com IA, com detalhes individuais e sistema de log de alterações.

---

## 1. Estrutura de Pastas

```
Galeria de Projetos/
├── index.html                    # Página principal (hub)
├── log.html                      # Página de log de alterações
├── README.md                     # Documentação do projeto
├── .gitignore
├── assets/
│   └── Avatar.gif                # Avatar do perfil (GIF)
├── css/
│   └── style.css                 # Estilos (tema claro e escuro)
├── js/
│   ├── app.js                    # Lógica principal, roteamento e tema
│   └── log.js                    # Lógica da página de log
├── data/
│   ├── projetos.json             # Dados dos projetos
│   └── log.json                  # Histórico de alterações
├── projetos/
│   ├── ia-dia-a-dia.html
│   ├── automacao-tarefas.html
│   ├── linktree-geral.html
│   ├── linktree-pessoal.html
│   ├── linktree-profissional.html
│   ├── integracao-apps.html
│   ├── projeto-vtuber.html
│   ├── tradutor-tela.html
│   ├── tradutor-videos.html
│   ├── material-estudos.html
│   └── sincronizar-animes.html
└── Specificações do site/
    ├── CONTENT_SPECIFICATION.md
    ├── CONTENT_SPECIFICATION_EN.md
    ├── DESIGN_SPECIFICATION.md
    ├── DESIGN_SPECIFICATION_EN.md
    ├── FUNCTIONAL_SPECIFICATION.md
    ├── FUNCTIONAL_SPECIFICATION_EN.md
    ├── PROJECT_SPECIFICATION.md
    ├── PROJECT_SPECIFICATION_EN.md
    ├── SETUP_GUIDE.md
    ├── SETUP_GUIDE_EN.md
    ├── TECHNICAL_SPECIFICATION.md
    ├── TECHNICAL_SPECIFICATION_EN.md
    ├── TEXTOS_DO_SITE.md
    └── TEXTOS_DO_SITE_EN.md
```

**Total de arquivos:** 28 (incluindo especificações)

---

## 2. Lista de Projetos

| # | ID | Título | Ícone | Cor | Status |
|---|-----|--------|-------|-----|--------|
| 1 | ia-dia-a-dia | Aplicação de IA no Dia a dia | 🤖 | #6366f1 | Não Iniciado |
| 2 | automacao-tarefas | Automação de Tarefas | ⚙️ | #8b5cf6 | Não Iniciado |
| 3 | linktree-geral | Linktree Geral | ☯ | #1a1a2e | Não Iniciado |
| 4 | linktree-pessoal | Linktree Pessoal | 🔗 | #ec4899 | Não Iniciado |
| 5 | linktree-profissional | Linktree Profissional | 💼 | #14b8a6 | Não Iniciado |
| 6 | integracao-apps | Integração com Outros Apps | 📱 | #f59e0b | Não Iniciado |
| 7 | projeto-vtuber | Projeto Vtuber | 🎭 | #39c5cf | Não Iniciado |
| 8 | tradutor-tela | Tradutor de Tela | 📖 | #3b82f6 | Não Iniciado |
| 9 | tradutor-videos | Tradutor de Vídeos | 🎬 | #a855f7 | Não Iniciado |
| 10 | material-estudos | Criação de Material de Estudos | 📚 | #22c55e | Não Iniciado |
| 11 | sincronizar-animes | Sincronizar Lista de Animes | 🎌 | #f97316 | Não Iniciado |

---

## 3. Funcionalidades

- **Hub de Projetos:** Lista visual estilo linktree com todos os projetos
- **Páginas Individuais:** Detalhes completos de cada projeto (versão, status, tecnologias, descrição)
- **Indicadores Visuais:** Status com cores (vermelho, amarelo, verde)
- **Tema Claro/Escuro:** Toggle no canto inferior direito, salvo no localStorage
- **Design Responsivo:** Funciona em qualquer dispositivo (breakpoint 480px)
- **Efeito Neon:** Botões e ícones com efeito visual neon usando drop-shadow
- **Hover Interativo:** Feedback visual ao passar o mouse nos cards (cor do projeto)
- **Log de Alterações:** Página separada com histórico completo de modificações

---

## 4. Tecnologias

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| HTML5 | - | Estrutura das páginas |
| CSS3 | - | Estilos, variáveis, temas, efeitos |
| JavaScript ES6+ | - | Lógica, roteamento, renderização |
| Git | - | Controle de versão |
| GitHub | - | Hospedagem e deploy |

**Sem frameworks ou bibliotecas externas.** Todo o código é vanilla.

---

## 5. Deploy

### GitHub Pages
1. Crie um repositório no GitHub
2. Faça push do código
3. Acesse as configurações do repositório
4. Ative GitHub Pages na seção "Pages"
5. Selecione a branch `main` e a pasta raiz `/`
6. O site estará disponível em `https://usuario.github.io/nome-repo/`

### Cloudflare Pages
1. Conecte o repositório do GitHub ao Cloudflare Pages
2. Configure o build:
   - **Build command:** (deixe vazio)
   - **Build output directory:** `/`
3. O site será publicado automaticamente

---

## 6. Como Adicionar um Projeto

1. Abra `data/projetos.json`
2. Adicione uma nova entrada na lista `projetos`:

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

3. Crie um arquivo HTML em `projetos/meu-projeto.html`:

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

4. Adicione a entrada no `data/log.json`:

```json
{
  "data": "03/08/2026",
  "horario": "18:00",
  "descricao": "Adição do projeto Meu Projeto"
}
```

---

## 7. Status dos Projetos

| Status | Cor | Significado |
|--------|-----|-------------|
| `nao-iniciado` | Vermelho (#ef4444) | Projeto ainda não começou |
| `em-andamento` | Amarelo (#f59e0b) | Projeto em desenvolvimento |
| `funcionando` | Verde (#22c55e) | Projeto concluído e funcional |

---

## 8. Repositório

- **GitHub:** https://github.com/DenkaAkumaPedro/Galeria-de-Projetos
- **Branch principal:** `main`
- **Último commit:** feat: neon por cor, datas log à direita, Linktree Geral, README atualizado
