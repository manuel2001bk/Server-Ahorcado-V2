const express = require("express")
const app = express();

const http = require('http')
const server = http.createServer(app);

const {Server} = require('socket.io');

const palabras = ["clavo","coche","comarca","agua","adulto","niño","negro","mujer","abrigo","anciano","cuaderno",
    "pan","nube","pez","perro","pintura","forma","fuego","fuego","bolsa","puerta","camino","mano","viejo","tela",
    "silla","libro","manguera","vecino","manta","ventana","verde","mantel","cigarro","carro"]

const io = new Server (server,{
    cors: {
        methods: ["GET", "POST"]
    }
});

io.on("connection", socket => {
    console.log('Nueva conexión', socket.id);
    socket.on('message', (data) =>{
        console.log(data);
        socket.emit('Server:message',data);
    }),
    socket.on('getPalabra', (data) =>{
        const palabra = palabras[Math.floor(Math.random()*palabras.length)];
        console.log(palabra);
        socket.emit('Server:palabra', palabra);
    })
});
app.get('/', (req,res)=>{
    res.send('Hola Pedro')
})

server.listen(3000, ()=>{
    console.log('Servidor inicializado')
});