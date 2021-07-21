const palabras = ["clavo","coche","comarca","agua","adulto","niño","negro","mujer","abrigo","anciano","cuaderno",
    "pan","nube","pez","perro","pintura","forma","fuego","fuego","bolsa","puerta","camino","mano","viejo","tela",
    "silla","libro","manguera","vecino","manta","ventana","verde","mantel","cigarro","carro"]


class Sockets {

    constructor(io) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        this.io.on("connection", socket => {
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
    }

}

module.exports = Sockets;