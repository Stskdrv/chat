const io = require('socket.io') (9800, {
    cors: {
        origin: 'http://localhost:5173'
    },
});

io.on('connection', (soket) => {
    console.log('User Connected');
})