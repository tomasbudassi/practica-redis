# Practica REDIS - Tomas Budassi

### 1) Iniciar el servicio de redis en docker
```
docker run -p 6379:6379 --name some-redis -d redis
```
### 2) Abrir la api en un IDE e instalar dependencias
npm install

### 3) Ejecutar la api
npm run dev

### 4) Iniciar panel de control de Redis
reddis-commander -> Este se inicia en http://127.0.0.1:8081

### 5) Acceder a las URL
```
GET http://localhost:3000/character

GET http://localhost:3000/character/1
```
