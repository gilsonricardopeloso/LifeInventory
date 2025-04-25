# LifeInventory

Acompanhamento completo e reflexivo da vida, indo além do simples controle de hábitos ou metas diárias.

## ✨ Visão Geral

O **LifeInventory** é uma aplicação web para acompanhamento de hábitos, metas e estatísticas pessoais, com interface moderna, responsiva e recursos avançados de usabilidade. O projeto foi desenvolvido com React, TypeScript e TailwindCSS, utilizando componentes acessíveis e hooks customizados.

## 🚀 Funcionalidades

- Cadastro, edição e exclusão de hábitos
- Visualização de hábitos em cards responsivos (dashboard e lista)
- Estatísticas de progresso e streaks
- Calendário de hábitos
- Conquistas e gamificação
- Perfil do usuário e configurações
- Tema claro/escuro com persistência
- Notificações e feedbacks via toast
- Interface responsiva (mobile e desktop)
- Sidebar e header fixos para navegação fluida

## 🖥️ Tecnologias & Bibliotecas

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) (componentes acessíveis)
- [React Router DOM](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/) (validação)
- [Lucide React](https://lucide.dev/) (ícones)
- [date-fns](https://date-fns.org/) (datas)
- [TanStack React Query](https://tanstack.com/query/latest)
- [Vite](https://vitejs.dev/) (build e dev server)

## 📁 Estrutura do Projeto

```
src/
  components/    # Componentes reutilizáveis (UI, layout, habits, dashboard, etc)
  pages/         # Páginas principais (Dashboard, Habits, Profile, etc)
  hooks/         # Hooks customizados (ex: useThemeSettings, useUnifiedButton)
  contexts/      # Contextos globais (ex: idioma)
  services/      # Serviços e mock de autenticação
  types/         # Tipagens TypeScript
  mock-data/     # Dados mockados para desenvolvimento
  lib/           # Utilitários e helpers
  index.css      # Estilos globais (Tailwind)
  App.tsx        # Composição de rotas e layout principal
```

## 🛠️ Scripts

- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera build de produção
- `npm run preview` — Visualiza build de produção localmente
- `npm run lint` — Analisa o código com ESLint
- `npm run format` — Formata o código com Prettier

## ⚡ Como rodar localmente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/lifeinventory.git
   cd lifeinventory
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Acesse:**  
   Abra [http://localhost:5173](http://localhost:5173) no navegador.

## 📷 Screenshots

> Adicione aqui prints da dashboard, lista de hábitos, modo escuro, etc.

## 👨‍💻 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## �� Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
