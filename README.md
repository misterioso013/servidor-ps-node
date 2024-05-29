# Servidor Python School em nodejs
Esse será o servidor local para você usar a API do Gemini e ter uma IA para responder suas dúvidas sobre as aulas.

para configurar o servidor, você precisa ter o nodejs instalado na sua máquina.

renomeie o arquivo `.env.example` para `.env` e adicione o token do Gemini.

## Links úteis
- [Nodejs](https://nodejs.org/en/)
- [Chave de API do Google AI](https://aistudio.google.com/app/apikey)

## Como rodar o servidor
Você terá duas formas de rodar o servidor, a primeira é abrindo o terminal na pasta do projeto e rodando o comando `npm start` e a segunda é usando o [PM2](https://pm2.keymetrics.io/), para usar o PM2, você precisa instalar ele globalmente com o comando `npm install -g pm2` e depois rodar o comando `pm2 start index.js --name=python-school` (o nome é opcional, mas é bom para você saber qual processo está rodando).

## Como usar a API
A API será usada como o backend para o site Python School, então você só precisará rodar o servidor e passar o IP e a porta no site.

O IP e a porta serão exibidos no terminal quando você rodar o servidor, mas por padrão, o IP é `localhost` e a porta é `7777`, então você pode acessar a API em `http://localhost:7777`.


## Passo a passo para rodar o servidor

1. [Instale o Nodejs](https://nodejs.org/) na sua máquina.
2. Clone o repositório na sua máquina. (Caso você não saiba como clonar um repositório, [clique aqui](https://docs.github.com/pt/github/creating-cloning-and-archiving-repositories/cloning-a-repository) ou simplesmente baixe o repositório em formato zip).
3. Abra o terminal na pasta do projeto.
4. Rode o comando `npm install` para instalar as dependências.
5. Renomeie o arquivo `.env.example` para `.env` e adicione o token do Gemini. (Caso você não saiba como adicionar o token, [clique aqui](https://aistudio.google.com/app/apikey)).
6. Rode o comando `npm start` para rodar o servidor.
7. Acesse a API em `http://localhost:7777`.

### Como usar o PM2
Se você seguiu o passo a passo acima, você já rodou o servidor, mas se você quer rodar o servidor em background, ou seja, sem precisar deixar o terminal aberto, você pode usar o PM2.

1. Instale o PM2 globalmente com o comando `npm install -g pm2`.
2. Rode o comando `pm2 start index.js --name=python-school` na pasta do projeto para rodar o servidor.
3. Para ver os processos rodando, rode o comando `pm2 list`.
4. Para parar o processo, rode o comando `pm2 stop python-school`.

> Você poderá configurar o PM2 para rodar o servidor automaticamente quando a máquina ligar, mas isso é opcional.

## Dúvidas
Se você tiver alguma dúvida, você pode abrir uma issue no repositório, tentarei responder o mais rápido possível.