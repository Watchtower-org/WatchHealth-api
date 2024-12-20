

<div align="center">
 <img src="logo.jpg" width="400px" alt="FreePick Drinks Image"/>
</div>

<h3 align="center">Um hub completo de informações, notícias e resumos legais sobre saúde, com suporte à inteligência artificial. Tecnologia a serviço da saúde e das leis.</h3>

<p align="center">
WatchHealth é uma plataforma inovadora que centraliza informações relevantes na área da saúde. Além de fornecer notícias confiáveis, através de uma newsletter enviada por e-mail, a aplicação utiliza inteligência artificial para gerar resumos claros e objetivos de leis e regulamentações. Com foco na acessibilidade e qualidade da informação, o projeto visa facilitar o acesso a dados importantes para profissionais, pesquisadores e cidadãos.

</p>

<h2 align="center">✨ Principais Funcionalidades</h2>

<ul>
  <li><strong>Notícias de Saúde:</strong> Agregação de notícias confiáveis e atualizadas sobre temas relevantes na área da saúde.</li>
  <li><strong>Resumos de Leis:</strong> Utilização de inteligência artificial para criar resumos claros e objetivos de leis e regulamentações.</li>
  <li><strong>Filtragem Inteligente:</strong> Algoritmos que priorizam notícias mais relevantes e confiáveis com base em critérios predefinidos.</li>
  <li><strong>API Pública:</strong> Acesso programático para desenvolvedores interessados em consumir os dados.</li>
  <li><strong>Integração Front-End:</strong> Interface moderna desenvolvida em TypeScript para fácil navegação e acesso às informações.</li>
</ul>

<h2 align="center" id="tecnologias">🛠 Tecnologias Utilizadas</h2>


<h3><strong> Front-End: </strong></h3>

- Next.js: Framework React para construção da interface de usuário.
- TypeScript: Para garantir a tipagem estática e segurança no código.
- React.js: Biblioteca para renderização eficiente e criação de interfaces interativas.

<h3><strong> Back-End: </strong></h3>

- TypeScript: Framework robusto e escalável para desenvolvimento de APIs.
- Inteligência Artificial**: Utilizada para processar informações de forma mais didática e acessível.
- APIs de Terceiros**: Integração com fontes externas para obter dados confiáveis.
- Prisma: ORM para facilitar a interação com o banco de dados.
- Docker: Containerização da aplicação para facilitar a implantação e escalabilidade.
- Swagger: Para documentar e testar a API de forma eficiente.



🌟 **Inspirado por...**

"Think deeply about things. Don’t just go along because that’s the way things are or that’s what your friends say. Consider the effects, consider the alternatives, but most importantly, just think."
— Aaron Swartz

🌟 **Propósito.**

Este projeto foi inspirado pela necessidade de informações confiáveis e torná-las acessíveis a todos de forma clara e organizada. Por meio da integração com tecnologia e inteligência artificial, o WatchHealth API democratiza o acesso à informação.

💡 **Contribua**

Contribuições são bem-vindas!

<h3><strong> Como rodar o projeto? </strong></h3>

Para rodar o projeto localmente, você irá precisar dos seguintes programas
instalados:

- [Node.js](https://nodejs.org/pt)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

Primeiramente crie um arquivo .env na raiz do projeto e adicione as seguintes
variáveis de ambiente. Subistitua `<bluesky_username>` e `<bluesky_password>`
pelo seu usuário e senha do bot do Bluesky, caso vá testar essa funcionalidade.

```
# URL da conexão com o banco de dados
DATABASE_URL="postgresql://root:root@localhost:5432/watchtower?schema=public"

# Porta da aplicação
PORT="5533"

# BSKY
BLUESKY_USERNAME=<bluesky_username>
BLUESKY_PASSWORD=<bluesky_password>
```

Em seguida instale as dependências e suba o banco de dados:

```
# Instale as dependências
npm install

# Suba o banco de dados no docker
docker compose up -d

# Crie as tabelas no banco de dados
npx prisma migrate dev --name init
```

Agora, para executar o servidor, utilize o comando:

```
npm run start
```

Acesse o endereço `http://localhost:5533/api` no seu navegador, para ver a
documentação da API.

Você também pode executar `npm run start:dev` para reiniciar o sservidor
automaticamente sempre que um arquivo for modificado.
