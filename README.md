# Content Management System (CMS)
## O CMS (Content Management System) é um software que permite criar, publicar e editar conteúdos em uma plataforma de forma segura, sem que o usuário tenha conhecimentos em programação.

### Instalação
Após fazer o clone do repositório, executar o seguinte comando para instalar as bibliotecas npm:
```
npm i
```
Logo após a instalação das bibliotecas, devemos configurar nossas variáveis de ambiente. Para isso, deixei disponibilizado um arquivo chamado `.env`, onde está configurado nossas variáveis.

Em seguida, vamos inicializar o servidor com:
```
npm run dev
```
### Funcionalidades
* Criar e acessar sua conta.
* Publicar um conteúdo.
* Editar, modificar e excluir um conteúdo.
* Visualizar o seus conteúdos e de outros usuários.

### Biliotecas npm utilizadas
* express
* nodemon
* bcrypt
* jsonwebtoken
* knex
* pg
* joi
* dotenv
