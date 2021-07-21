const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./Socket');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //Http server
        this.server = http.createServer(this.app);

        //Configuración sockets
        this.io = socketio(this.server, {
            cors: {
                methods: ["GET", "POST"]
            }
        });
    }

    initSockets() {
        new Sockets(this.io);
    }

    exucute() {
        //this.middlewares();
        this.initSockets();
        this.server.listen(this.port, () => {
            console.log('Server run puerto ', this.port)
        });
        this.app.get('/', (req,res)=>{
            res.send('Hola Pedro')
        });
    }

}

module.exports = Server;