const express = require("express")
const app = express();

const http = require('http')
const server = http.createServer(app);

const {Server} = require('socket.io');

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
    })
});

app.get('/', (req,res)=>{
    res.send('Hola Pedro')
})

server.listen(3000, ()=>{
    console.log('Servidor inicializado')
});