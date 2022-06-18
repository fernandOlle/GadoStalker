# GadoStalker
Projeto para cadeira de Desenvolvimento de Software na UFPel ( Universidade Federal de Pelotas )

Desenvolvido usando front-end em Angular e back-end em Java.

Utilizando docker compose para o SGBD e o banco de dados MySQL8.

# Docker
```docker-compose up -d``` na pasta do arquivo ```docker-compose```

# Para rodar o front-end
Instalar Node.
Rodar os seguintes comandos na pasta ```gadostalker_front```

```npm i```

Windows: ```npx ng s```

Outros: ```ng s```

# Para rodar back-end
Instalar Payara Server ou GlassFish. Plataforma ```Jakarta EE 8``` com a ```JDK 8```.

Construir o projeto e rodar. Irá fazer download das dependencias.

# Populando o banco de dados
Na pasta ```src/main/resources/db``` existe um script SQL ```gadostalkerdb.sql``` para popular o banco de dados. Tal script deve ser executado primeiro.

Executar ```pip install -r requirements.txt``` e depois rodar o script ```gadostalkerdb_imageupload.py``` para popular o banco de dados com as imagens dos anuncios.
