# 🎬 TMDB Movie Ratings

Aplicação web para busca e avaliar filmes utilizando a API pública do The Movie Database (TMDB).

O sistema permite pesquisar filmes, visualizar detalhes e salvar avaliações personalizadas do usuário.

---

## 🚀 Objetivo do Projeto

Este projeto foi desenvolvido como teste técnico com foco em:

- Consumo de APIs externas
- Criação de API própria
- Gerenciamento de estado no React
- Tratamento de loading e erros
- Persistência de dados em banco de dados

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend
- Python
- Flask
- REST API

### Banco de Dados
- SQLite

### APIs
- API pública: **The Movie Database (TMDB)**
- API própria: comunicação entre frontend e banco de dados

---

## ✨ Funcionalidades

### 🔎 Página Principal
- Busca de filmes via TMDB
- Exibição de pôster e título
- Estados de loading
- Navegação para detalhes do filme

### 🎥 Página de Detalhes
- Sinopse
- Data de lançamento
- Elenco
- Avaliação de 1 a 5 estrelas
- Editar avaliação
- Remover avaliação

### ⭐ Página Filmes Avaliados
- Lista de filmes avaliados
- Exibição da nota do usuário
- Navegação para detalhes
  
---

## 🏆 Pontos Extras Implementados
### ✅ Scroll Infinito (Paginação)

A página inicial implementa carregamento automático de novos filmes conforme o usuário rola a tela, melhorando a experiência de navegação.

### ✅ Implementação de Cache no Backend

Foi implementado cache em memória no backend para:

Filmes populares
Resultados de busca
Detalhes do filme
Elenco

Isso reduz chamadas repetidas à API externa do TMDB, melhora performance e evita rate limiting.

---

## 📂 Estrutura do Projeto
Tmdb-Movie-Ratings/

│

├── backend/

├── frontend/

├── start.bat

└── README.md


---

## ⚙️ Como Executar Localmente

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/natycristina/Tmdb-Movie-Ratings.git
```

Entrar na pasta:

```bash
cd Tmdb-Movie-Ratings
```

2️⃣ Executar o projeto (UM comando)

No Windows PowerShell:

```bash
.\start.bat
```

Isso irá iniciar automaticamente:

✅ Backend Flask
✅ Frontend React

🌐 Acesso

Frontend:

http://localhost:5173

Backend:

http://localhost:5000

---

## 📦 Instalação de dependências (primeira execução no Windows)

Caso seja a primeira vez executando:

Backend

```bash
cd backend
py -m pip install -r requirements.txt
```

Frontend

```bash
cd frontend
npm install
```
Após isso, utilize apenas:

```bash
.\start.bat
```
