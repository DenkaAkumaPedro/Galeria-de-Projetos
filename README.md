# 🚀 Galeria de Projetos

Site estilo linktree com lista de projetos de apps e código desenvolvidos com IA.

## ✨ Funcionalidades

- **Hub de Projetos**: Lista visual estilo linktree com todos os projetos
- **Páginas Individuais**: Detalhes completos de cada projeto
- **Indicadores Visuais**: Status com cores (vermelho, amarelo, verde)
- **Editor Simples**: Interface para editar projetos pelo celular
- **Design Responsivo**: Funciona perfeitamente em qualquer dispositivo

## 📊 Status dos Projetos

- 🔴 **Não Iniciado** - Projeto ainda não comenzado
- 🟡 **Em Andamento** - Projeto em desenvolvimento
- 🟢 **Funcionando** - Projeto concluído e funcional

## 🛠️ Como Adicionar um Projeto

### Opção 1: Usando o Editor (Recomendado)
1. Acesse o site
2. Clique no botão ✏️ (canto inferior direito)
3. Preencha os dados do projeto
4. Clique em "Criar Projeto"

### Opção 2: Editando o Arquivo JSON
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
  "atualizadoEm": "03/08/2026"
}
```

3. Crie um arquivo HTML em `projetos/meu-projeto.html` copiando o template de outro projeto

## 📁 Estrutura do Projeto

```
galeria-de-projetos/
├── index.html              # Página principal (hub)
├── css/
│   └── style.css           # Estilos
├── js/
│   ├── app.js              # Lógica principal
│   └── editor.js           # Interface de edição
├── projetos/
│   ├── ia-dia-a-dia.html
│   ├── automacao-tarefas.html
│   └── ...
└── data/
    └── projetos.json       # Dados dos projetos
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

## 📱 Editar pelo Celuar

O editor foi projetado para funcionar bem em dispositivos móveis:
1. Acesse o site no navegador do celular
2. Clique no botão ✏️
3. Use o formulário para adicionar/editar projetos
4. As alterações são salvas automaticamente

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
- 🔗 Link
- 💼 Trabalho
- 📱 Celular
- 🎮 Game
- 🌐 Globo
- 🎬 Filme
- 📚 Livro
- 🎌 Bandeira

## 📝 Licença

Este projeto é livre para uso pessoal.
