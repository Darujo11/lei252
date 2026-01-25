# Portal LC 252/2016 - Câmara Municipal de Macaé

Portal interativo para consulta da **Lei Complementar 252/2016** - Plano de Cargos, Carreiras e Vencimentos dos Servidores da Câmara Municipal de Macaé.

![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwindcss)

## 🚀 Funcionalidades

### 📜 Lei Completa na Página Inicial
- **52 artigos** organizados em 4 capítulos colapsáveis
- Texto consolidado com todas as alterações até **LC 355/2025**
- **Badges clicáveis** → Clique e abre o PDF da lei original
- Identificação visual: alterado (amarelo), acrescido (verde), revogado (vermelho)

### 🔗 Leis Consolidadas
| Lei | Descrição |
|-----|-----------|
| LC 252/2016 | Lei original do PCCV |
| LC 284/2019 | Comissão 7 membros, Mérito 15/20 anos |
| LC 294/2020 | Institui o Triênio |
| LC 341/2024 | Revoga GAL |
| LC 343/2024 | Quadro de extinção |
| LC 355/2025 | Novos grupos ocupacionais, avaliação |

### 📖 Glossário Interativo
- 24 termos técnicos com definições
- Busca em tempo real

### 🧮 Calculadora de Benefícios
- **Triênio**: 5% a cada 3 anos (máx. 55%)
- **Mérito**: 5% aos 15 anos + 5% aos 20 anos
- **Progressões**: Letras A-J (2% cada, a cada 2 anos após estágio)
- **Promoções**: Classes I-V (a cada 5 anos, limite por escolaridade)

### 🤖 ChatBot com IA
- **Assistente Virtual** com GPT-4 da OpenAI
- Responde perguntas sobre a LC 252/2016 e alterações
- Configuração segura via variáveis de ambiente
- Não inventa informações - orienta consultar RH/Procuradoria quando necessário

## 📦 Instalação

```bash
# Instale as dependências
npm install

# Configure a chave da API da OpenAI (veja abaixo)
cp .env.example .env

# Rode o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🤖 Configuração do ChatBot

1. Obtenha uma chave de API da OpenAI em: https://platform.openai.com/api-keys

2. Crie um arquivo `.env` na raiz do projeto:
```bash
cp .env.example .env
```

3. Edite o arquivo `.env` e adicione sua chave:
```env
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxx
```

4. **IMPORTANTE**: Nunca commite o arquivo `.env` no Git (já está no `.gitignore`)

5. O chatbot aparecerá como um botão flutuante no canto inferior direito

## 📁 Configuração dos PDFs

**IMPORTANTE:** Para os links das leis funcionarem, coloque os arquivos PDF na pasta `public/pdfs/`:

```
public/
└── pdfs/
    ├── lc-252-2016.pdf
    ├── lc-284-2019.pdf
    ├── lc-294-2020.pdf
    ├── lc-341-2024.pdf
    ├── lc-343-2024.pdf
    └── lc-355-2025.pdf
```

Após adicionar os PDFs, ao clicar em qualquer badge de lei (ex: `LC 252/2016`), o documento original será aberto em nova aba.

## 📁 Estrutura do Projeto

```
portal-lc252-vite/
├── public/
│   ├── favicon.svg
│   └── pdfs/              ← Coloque os PDFs aqui
├── src/
│   ├── components/
│   │   ├── ArtigoCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── LeiBadge.jsx   ← Componente do badge clicável
│   │   └── Sidebar.jsx
│   ├── data/
│   │   ├── capitulos.js   ← Estrutura completa da lei
│   │   ├── glossario.js
│   │   └── leis.js        ← Configuração dos links dos PDFs
│   ├── pages/
│   │   ├── PaginaCalculadora.jsx
│   │   ├── PaginaGlossario.jsx
│   │   ├── PaginaInicial.jsx  ← Lei completa
│   │   └── PaginaLeis.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎨 Cores dos Badges

| Lei | Cor |
|-----|-----|
| LC 252/2016 | 🔵 Azul |
| LC 284/2019 | 🟣 Roxo |
| LC 294/2020 | 🔵 Ciano |
| LC 341/2024 | 🔴 Vermelho |
| LC 343/2024 | 🟠 Laranja |
| LC 355/2025 | 🟢 Verde |

## 📄 Licença

Uso interno da Câmara Municipal de Macaé.

---

⚠️ **Observação**: Este portal é apenas para consulta. O texto oficial é o publicado no Diário Oficial do Município.
