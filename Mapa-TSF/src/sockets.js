module.exports = io => {
    io.on('connection', socket => {

        console.log('nueva conexión realizada');

        socket.on('userCoordinates', (coords) => {
            console.log(coords);
            socket.broadcast.emit('newUserCoordinates', coords);
        });
    });
};