<div align="center">

# 🏪 **Estoque App**

💼 Sistema completo de **gerenciamento de estoque** para lojas e empresas.  
Controle produtos, movimentações e usuários com segurança e praticidade.

---

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=auth0&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## 📖 Sobre o Projeto

O **Estoque App** é uma aplicação web desenvolvida para auxiliar empreendedores no controle de estoque da sua loja.  
O sistema permite cadastrar produtos, registrar movimentações (entrada/saída) e gerenciar funcionários com diferentes níveis de acesso.

Feito com **Next.js + TypeScript + Prisma + Supabase**, este projeto integra front-end e back-end em um só ambiente, com **autenticação, validações e regras de negócio sólidas**.

---

## 🚀 Funcionalidades

### 👑 **Administrador**
- Adiciona, edita e remove **produtos**;
- Adiciona, edita e remove **usuários** da loja;
- Registra **movimentações** de entrada e saída.

### 👷 **Funcionário**
- Pode **registrar movimentações**;
- Visualiza **produtos** cadastrados;
- **Não** pode editar produtos nem gerenciar usuários.

### 🔒 **Regras de Acesso**
- Cada usuário só acessa a **loja à qual pertence** (`lojaId`);
- Todas as consultas são filtradas por `lojaId`, garantindo **segurança e isolamento de dados**.

---

## 🧠 Tecnologias Utilizadas

| Tecnologia | Função |
|-------------|--------|
| **Next.js** | Framework React com SSR/SSG |
| **TypeScript** | Tipagem estática e segurança no código |
| **Prisma** | ORM para comunicação com o banco de dados |
| **Supabase** | Banco de dados em nuvem |
| **NextAuth.js** | Autenticação de usuários |
| **Tailwind CSS** | Estilização moderna e responsiva |
| **React Hook Form + Zod** | Manipulação e validação de formulários |
| **Lucide React** | Ícones modernos para UI |


## ⚙️ Instalação e Uso

```bash
# 1️⃣ Clone o repositório
git clone https://github.com/seu-usuario/estoque-app.git
cd estoque-app

# 2️⃣ Instale as dependências
npm install

# 3️⃣ Configure as variáveis de ambiente
# Crie um arquivo .env.local na raiz e adicione:
DATABASE_URL="sua_url_do_supabase"
NEXTAUTH_SECRET="sua_chave_secreta"
NEXTAUTH_URL="http://localhost:3000"

# 4️⃣ Rode as migrations
npx prisma migrate dev

# 5️⃣ Execute o projeto
npm run dev

# Acesse em:
# http://localhost:3000

```

## 🤝 Contribuições

Este projeto está aberto para contribuições! 💬
Sinta-se à vontade para propor melhorias, correções ou novas funcionalidades.

```bash
# 1️⃣ Faça um fork do repositório

# 2️⃣ Crie uma branch com sua modificação
git checkout -b minha-feature

# 3️⃣ Faça o commit
git commit -m "Adiciona nova feature"

# 4️⃣ Envie a branch
git push origin minha-feature

# 5️⃣ Abra um Pull Request explicando suas mudanças
```
✨ Toda contribuição é bem-vinda — desde ajustes simples até novas ideias!
