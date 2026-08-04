# 🚀 Galeria de Projetos

Site estilo linktree com lista de projetos para aplicar com IA.

## ✨ Funcionalidades

- **Hub de Projetos**: Lista visual estilo linktree com todos os projetos
- **Páginas Individuais**: Detalhes completos de cada projeto
- **Pré-visualização**: Iframe incorporado para projetos com URL ao vivo
- **Links Externos**: Botões com ícones para GitHub, site ao vivo e outros links
- **Indicadores Visuais**: Status com cores (vermelho, amarelo, verde)
- **Tema Claro/Escuro**: Toggle no canto inferior direito
- **Design Responsivo**: Funciona perfeitamente em qualquer dispositivo
- **Efeito Neon**: Botões e ícones com efeito visual neon
- **Log de Alterações**: Histórico completo de todas as modificações do site
- **Hover Interativo**: Feedback visual ao passar o mouse nos cards

## 📋 Projetos

| Projeto | Ícone | Cor |
|---------|-------|-----|
| Aplicação de IA no Dia a dia | 🤖 | Roxo |
| Automação de Tarefas | ⚙️ | Roxo Escuro |
| Linktree Geral | ☯ | Azul Escuro |
| Linktree Pessoal | 🔗 | Rosa |
| Linktree Profissional | 💼 | Verde Água |
| Integração com Outros Apps | 📱 | Amarelo |
| Projeto Vtuber | 🎭 | Ciano |
| Tradutor de Tela | 📖 | Azul |
| Tradutor de Vídeos | 🎬 | Lilás |
| Criação de Material de Estudos | 📚 | Verde |
| Sincronizar Lista de Animes | 🎌 | Laranja |

## 🌗 Tema

O site possui dois temas (claro e escuro). Use o botão no canto inferior direito para alternar. A preferência é salva automaticamente.

## 📊 Status dos Projetos

- 🔴 **Não Iniciado** - Projeto ainda não começou
- 🟡 **Em Andamento** - Projeto em desenvolvimento
- 🟢 **Funcionando** - Projeto concluído e funcional

## 📝 Log de Alterações

O site possui uma página de log de alterações (`log.html`) que registra todas as modificações com data e horário. Acesse pelo botão "Histórico de Alterações" no rodapé da página principal.

### Filtros por Projeto
A página de log possui um sistema de filtros que permite visualizar alterações de projetos específicos:
- **Botão "Todos"**: Mostra todas as alterações
- **Botão "Geral"**: Mostra apenas alterações gerais do site
- **Botões dos projetos**: Mostra apenas alterações do projeto selecionado

Os filtros são clicáveis e podem ser combinados. Cada entrada do log exibe uma tag com o nome e ícone do projeto a que se refere.

## 🛠️ Como Adicionar um Projeto

1. Abra o arquivo `data/projetos.json`
2. Adicione uma nova entrada na lista:

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
  "previewUrl": "https://site-do-projeto.com",
  "githubUrl": "https://github.com/usuario/repo",
  "links": [
    { "nome": "GitHub", "url": "https://github.com/usuario/repo", "icone": "fa-brands fa-github" },
    { "nome": "Site", "url": "https://site-do-projeto.com", "icone": "fa-solid fa-globe" }
  ],
  "atualizadoEm": "03/08/2026"
}
```

3. Crie um arquivo HTML em `projetos/meu-projeto.html` copiando o template de outro projeto

## 📝 Como Adicionar uma Alteração no Log

1. Abra o arquivo `data/log.json`
2. Adicione uma nova entrada na lista de `alteracoes`:

```json
{
  "data": "03/08/2026",
  "horario": "22:00",
  "descricao": "Descrição da alteração realizada",
  "projeto": "meu-projeto"
}
```

O campo `projeto` deve conter o ID do projeto (ex: `"projeto-vtuber"`) ou `"geral"` para alterações gerais do site.

## 📁 Estrutura do Projeto

```
galeria-de-projetos/
├── index.html              # Página principal (hub)
├── log.html                # Página de log de alterações
├── assets/
│   └── Avatar.gif          # Avatar do perfil
├── css/
│   └── style.css           # Estilos (tema claro e escuro)
├── js/
│   ├── app.js              # Lógica principal, roteamento e tema
│   └── log.js              # Lógica da página de log
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
└── data/
    ├── projetos.json       # Dados dos projetos
    └── log.json            # Histórico de alterações
```

## 🚀 Deploy

### GitHub Pages
1. Crie um repositório no GitHub
2. Faça push do código
3. Ative GitHub Pages nas configurações

### Cloudflare Pages
1. Conecte o repositório do GitHub ao Cloudflare Pages
2. Configure o build:
   - **Build command**: (deixe vazio)
   - **Build output directory**: `/`

## 🎨 Personalização

### Cores de Status
Edite as variáveis CSS no arquivo `css/style.css`:

```css
:root {
  --status-nao-iniciado: #ef4444;  /* Vermelho */
  --status-em-andamento: #f59e0b;  /* Amarelo */
  --status-funcionando: #22c55e;   /* Verde */
}
```

### Ícones
Use emojis para os ícones dos projetos. Alguns exemplos:
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

## 📝 Licença

Este projeto é livre para uso pessoal.
