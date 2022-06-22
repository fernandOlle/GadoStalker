# GadoStalker
Projeto para cadeira de Desenvolvimento de Software na UFPel ( Universidade Federal de Pelotas )

Desenvolvido usando front-end em Angular e back-end em Java EE (Jakarta EE).

Utilizando docker compose para o SGBD e o banco de dados MySQL8.

# Docker
```docker-compose up -d``` na pasta do arquivo ```docker-compose```

# Para rodar o front-end
Instalar Node 

[Node.js website](https://nodejs.org/en/)

Logo após instale Angular/CLI

```npm install -g @angular/cli```

Rodar os seguintes comandos na pasta ```gadostalker_front```

```npm i```

Windows: ```npx ng s```

Outros: ```ng s```

# Para rodar back-end
Instalar ```Payara Server``` ou ```GlassFish```. Plataforma ```Jakarta EE 8``` com a ```JDK 8```.

Construir o projeto e rodar. Irá fazer download das dependencias.

# Populando o banco de dados
Na pasta ```src/main/resources/db``` existe um script SQL ```gadostalkerdb.sql``` e um script script Python ```gadostalkerdb.py``` para popular o banco de dados com as informações e as imagens. O script Python já executa o script SQL, basta apenas executar ```pip install -r requirements.txt``` para instalar as dependências e depois rodar o script ```gadostalkerdb.py``` dentro do diretório para popular o banco de dados.
