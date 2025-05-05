# Plataforma Interativa para Fãs de eSports - Fala FURIA!

Este projeto tem como objetivo criar uma plataforma interativa voltada para fãs da organização FURIA. A proposta é proporcionar uma experiência personalizada para cada usuário, através de validação de perfis, coleta de informações e geração de relatórios com auxílio de inteligência artificial.

A plataforma é pensada para engajar fãs, coletar dados relevantes de forma estruturada e apresentar insights baseados nas respostas, de forma clara e objetiva.


[![](https://markdown-videos-api.jorgenkh.no/youtube/tAmtA9hmvog )](https://youtu.be/tAmtA9hmvog)
---

## Funcionalidades

- Cadastro de usuários com validação de documentos (via Mistral OCR)
- Vinculação de perfil Faceit com análise automática dos dados
- Coleta de dados sobre a experiência e preferência dos fãs em relação aos e-sports
- Geração de relatórios personalizados com base nas respostas dos usuários
- Interface com formulário interativo e relatório exibido dinamicamente
- Botão para interagir com IA temática da FURIA

---

## Tecnologias Utilizadas

### Back-End
- **Linguagem:** TypeScript
- **Framework:** Fastify
- **Validação:** Zod
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **OCR:**  Mistral OCR
- **IA:** Processamento de texto com Mistral (uso de modelo para gerar e validar dados)
- **API Faceit:** Buscar dados sobre o usuário.

### Front-End
- **Framework:** React com Next.js
- **Estilização:** Tailwind CSS
- **Gerenciamento de Estado:** useState, props drilling simples
- **Componente de Relatório:** Com opções de minimizar e fechar, com scroll automático para textos longos

---

## Como Executar Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- PostgreSQL rodando localmente
- Yarn ou NPM instalado

### 1. Clonar o repositório

```bash
git clone https://github.com/Joice-crypto/Desafio-FURIA.git
cd Desafio-FURIA
```
### 2. Instalar as dependências
```bash
npm install
# ou
yarn install
```

### 3. Configurar as variáveis de ambiente
```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_jwt"
MISTRAL_API_KEY=sua-chave-da-api-do-mistral
FACEIT_API_KEY=sua-chave-da-api-do-faceit
```

### 4. Rodar as migrations
```bash
npx prisma migrate dev
```
### 5. Iniciar o servidor de desenvolvimento
```bash
# Para o back-end e para o front-end
npm run dev
```

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE). Isso significa que você pode usar, modificar e distribuir o código, desde que mantenha a atribuição adequada e compartilhe o código sob os mesmos termos.
Contribuições são sempre bem-vindas!






