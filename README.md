# Projeto Angular UserManage

Bem-vindo ao projeto Angular UserManage! Este repositório contém um aplicativo web desenvolvido em Angular que faz gerenciamento de usuarios.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- Node.js e npm (ou Yarn)
- Angular CLI
- Git

## Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Fleishmann/UserManage.git
   cd UserManage
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn
   ```

3. **Configuração do ambiente:**

   altere o arquivo de ambiente `src/environments/environment.ts` com as configurações apropriadas. Aqui está um exemplo básico:

   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000/api',
   };
   ```

   Substitua `apiUrl` com a URL da sua API.

## Rodando o servidor de desenvolvimento

Execute `ng serve` para rodar o servidor de desenvolvimento. Navegue para `http://localhost:4200/`. O aplicativo irá recarregar automaticamente se você fizer alguma alteração nos arquivos fonte.

```bash
ng serve
```

## Contato

Se precisar de ajuda ou tiver alguma dúvida, sinta-se à vontade para entrar em contato através do email ou abrindo uma issue aqui no GitHub.
