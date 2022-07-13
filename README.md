# Next.js OpenJira App

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- El -d, significa **detache**

- MOngoDB URL Local:

```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entrono

Renombrar el archivo **.env.templante** a **.env**

##Llenar la base de datos de informacion de prueba

llamar a:

```
http://localhost:3000/api/seed
```
