<div align="center">
  <img src="public/flui.svg" alt="FLUI Logo" width="120" />
  
  # 🌊 FLUI — Gerenciador de Tarefas Inteligente
  
  **Organize suas demandas, acompanhe métricas e ganhe produtividade.**
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Acessibilidade-VLibras-009688?style=flat" alt="VLibras" />
</p>

---

O **FLUI** é um sistema de gerenciamento de tarefas desenvolvido com foco em usabilidade, design responsivo e acessibilidade digital. Construído sobre o App Router do Next.js, ele combina uma interface limpa com um backend *Serverless* altamente escalável integrado ao ecossistema Firebase.

## ✨ Funcionalidades

### 🔐 Autenticação e Segurança
* **Cadastro de Usuários:** Validação de formulários simples (Nome, E-mail, Senha e Confirmação) utilizando **Yup** com exigência de senhas fortes.
* **Verificação de E-mail:** Bloqueio de login ativado até que o usuário confirme a criação da conta via e-mail.
* **Social Login:** Acesso rápido integrado via **Google** e **GitHub**.
* **Controle de Conta:** Opção de exclusão permanente de conta pelo usuário, protegida por reautenticação de segurança.
* **Privacidade de Rotas:** O sistema garante que cada usuário logado só consiga visualizar e interagir com as próprias tarefas.

### 📊 Dashboard e Métricas
* Exibição em tempo real do total de tarefas pendentes, tarefas concluídas na semana e tarefas vencidas.
* Visualização de dados através de gráficos construídos com a biblioteca **Tremor**.

### ✅ Gestão Completa de Tarefas (CRUD)
* Criação de tarefas com: *Título, Descrição, Data de Vencimento e Nível de Prioridade (Baixa, Média, Alta)*.
* **Subtarefas:** Possibilidade de desdobrar uma tarefa principal em subtarefas com checklist e status de conclusão.
* **Barra de Progresso Dinâmica:** Cálculo automático da porcentagem de conclusão da tarefa principal com base no checklist de subtarefas.
* Área de log de trabalho e adição de comentários por tarefa.

### 🔄 Modos de Visualização
* **Quadro Kanban Interativo:** Divisão visual entre as colunas *"A Fazer"*, *"Fazendo"* e *"Concluído"*, com movimentação de cards via *Drag-and-Drop* nativo utilizando **Dnd Kit**.
* **Calendário Dedicado:** Integração com **FullCalendar** para mapeamento visual de prazos; clicar em um evento abre automaticamente o modal de edição.
* **Lista Dinâmica:** Alternância fluida entre a visualização em lista tradicional e o modo quadro.

### ♿ Acessibilidade e UX (A11y)
* **VLibras Integrado:** Suporte obrigatório e nativo à tradução para a Língua Brasileira de Sinais.
* **Temas para Acessibilidade:** Suporte nativo a *Light Mode* e *Dark Mode*, somado a controles de aumento de fonte e modos de alto contraste.
* **Feedback Visual:** Notificações de sucesso e erro (*Toasts*) padronizadas via **SweetAlert2**.
* **PWA (Progressive Web App):** Aplicação otimizada para carregamento rápido e suporte a navegação offline.

---

## 🛠️ Stack Tecnológica

* **Core:** Next.js (App Router), TypeScript, Next.js Route Handlers.
* **BaaS e Dados:** Firebase Firestore, Firebase Authentication.
* **UI e Estilização:** Tailwind CSS, Tremor (Gráficos), Lucide React (Ícones), Next-Themes.
* **Pacotes de Apoio:** FullCalendar, Dnd Kit, SweetAlert2, Yup.

---

## 📁 Arquitetura do Projeto

```
src/
├── app/                    # Next.js App Router (Páginas e Endpoints da API)
│   ├── Calendario/
│   ├── Dashboard/
│   ├── Kanban/
│   ├── login/
│   ├── register/
│   └── tarefas/            # Views de Listagem e Detalhes
├── backend/                # Lógica de Negócio, Tipagens e Serviços
│   ├── constants/
│   ├── lib/                # Inicialização do Firebase (firebase.ts)
│   ├── services/           # Comunicação com Firestore e Auth (servicoTarefas, etc)
│   └── types/              # Definições globais (tarefa.ts, usuario.ts)
└── frontend/               # Interface e Experiência do Usuário
    ├── components/         # Arquitetura em Atomic Design (atoms, molecules, organisms, templates)
    ├── contexts/           # Contextos da aplicação (ContextoAutenticacao)
    ├── hooks/              # Hooks customizados (useAutenticacao)
    ├── schemas/            # Esquemas de validação do Yup
    └── utils/              # Funções auxiliares (rolagemSuave, toast)
```

🚀 Como rodar o projeto localmente
1. Pré-requisitos
Certifique-se de ter o Node.js e o Git instalados em seu ambiente. Compatível com Chrome, Firefox, Safari e Edge.

2. Configuração de Ambiente
Crie um arquivo .env.local na raiz do projeto e preencha com as variáveis do seu painel do Firebase:
NEXT_PUBLIC_FIREBASE_API_KEY="sua_api_key_aqui"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="seu_auth_domain_aqui"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="seu_project_id_aqui"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="seu_storage_bucket_aqui"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="seu_sender_id_aqui"
NEXT_PUBLIC_FIREBASE_APP_ID="seu_app_id_aqui"

3. Execução
```
npm run dev
```
e acesse http://localhost:3000 no seu navegador para testar a aplicação.
Também é possível instalar ele e adicionar ao seu celular ou desktop, ao abrir o projeto, na barra de pesquisa no canto direito terá uma opção para instalar.


# Requisitos Funcionais

- **Autenticação de Usuário:**
  - [x] Cadastro de novos usuários com nome, e-mail e senha.
  - [x] Envio de e-mail de verificação após o cadastro.
  - [x] Login com e-mail e senha.
  - [x] Login social com Google.
  - [x] Login social com GitHub.
  - [x] Logout (sair) do sistema.
  - [x] Bloqueio de login se o e-mail não for verificado (para contas de e-mail/senha).
  - [x] Exclusão de conta pelo usuário, com necessidade de reautenticação por segurança.

- **Gerenciamento de Tarefas:**
  - [x] Criação de novas tarefas com título, descrição, status, prioridade e data de vencimento.
  - [x] Visualização de tarefas em formato de lista ou quadro.
  - [x] Edição dos detalhes de uma tarefa existente.
  - [x] Exclusão de uma tarefa.
  - [x] Atribuição de status à tarefa (Pendente, Em Andamento, Concluída).
  - [x] Definição de prioridade para a tarefa (Baixa, Média, Alta).
  - [x] Adição de subtarefas a uma tarefa principal.
  - [x] Adição de comentários a uma tarefa.

- **Visualização e Organização:**
  - [x] Dashboard com um resumo visual das tarefas (e.g., gráficos de status, prioridade).
  - [x] Quadro Kanban para visualização de tarefas por status.
  - [x] Visualização de tarefas em um calendário.

# Requisitos Não Funcionais

- **Usabilidade e Acessibilidade:**
  - [x] Interface intuitiva e de fácil utilização.
  - [x] Design responsivo, adaptável a desktops, tablets e smartphones.
  - [x] Suporte a temas claro (light) e escuro (dark).
  - [x] Controles de acessibilidade (e.g., aumento de fonte, contraste).
  - [x] Notificações (toasts) para feedback de ações do usuário (sucesso, erro).

- **Segurança:**
  - [x] As senhas dos usuários devem ser armazenadas de forma segura.
  - [x] A comunicação com o backend (Firebase) deve ser criptografada (HTTPS).
  - [x] Validação de dados de entrada no frontend e backend para prevenir ataques (e.g., XSS).
  - [x] Apenas usuários autenticados podem acessar e gerenciar suas próprias tarefas.

- **Desempenho:**
  - [x] Carregamento rápido da aplicação e das listas de tarefas.
  - [x] Otimização das consultas ao banco de dados (Firestore) para evitar lentidão.
  - [x] Utilização de PWA (Progressive Web App) para melhor performance e capacidade offline.

- **Manutenibilidade e Escalabilidade:**
  - [x] Código organizado em uma estrutura de pastas clara e consistente (frontend, backend, components, etc.).
  - [x] Utilização de TypeScript para tipagem estática e prevenção de erros.
  - [x] Código componentizado (React) para facilitar a reutilização e manutenção.
  - [x] Nomes de variáveis, funções e arquivos em português para manter a consistência do projeto.

- **Ambiente:**
  - [x] Necessidade de um arquivo de configuração de ambiente (`.env.local`) para as chaves do Firebase.
  - [x] O projeto deve ser compatível com os principais navegadores modernos (Chrome, Firefox, Safari, Edge).

