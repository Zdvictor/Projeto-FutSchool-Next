# FutSchool

Sistema de matrícula online para escola de futebol profissional.

## Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Stripe
- Framer Motion

## Pré-requisitos

- Node.js 18+
- PostgreSQL
- Conta no Stripe

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/futschool.git
cd futschool
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
- Adicione suas chaves do Stripe
- Configure a URL do banco de dados PostgreSQL
- Ajuste a URL base da aplicação

4. Configure o banco de dados:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
src/
  ├── app/                    # Rotas e páginas
  │   ├── api/               # Endpoints da API
  │   ├── matricula/         # Página de matrícula
  │   └── sucesso/          # Página de sucesso
  ├── components/            # Componentes React
  └── lib/                   # Utilitários e configurações
prisma/
  └── schema.prisma         # Schema do banco de dados
```

## Funcionalidades

- ✅ Página inicial com banner interativo
- ✅ Seção de metodologia
- ✅ Galeria de estrutura
- ✅ Planos e preços
- ✅ Sistema de matrícula online
- ✅ Integração com Stripe para pagamentos
- ✅ Banco de dados para gestão de usuários e pedidos

## Desenvolvimento

Para adicionar novas funcionalidades:

1. Crie uma nova branch:
```bash
git checkout -b feature/nova-funcionalidade
```

2. Faça suas alterações e commit:
```bash
git add .
git commit -m "Adiciona nova funcionalidade"
```

3. Envie para o repositório:
```bash
git push origin feature/nova-funcionalidade
```

## Produção

Para fazer deploy em produção:

1. Configure as variáveis de ambiente de produção
2. Execute o build:
```bash
npm run build
```

3. Inicie o servidor:
```bash
npm start
```

## Contribuição

1. Fork o projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.
