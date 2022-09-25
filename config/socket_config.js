module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{
        cors: {//used for authentication and cors
            origin: "http://localhost:8000",
            optionsSuccessStatus: 200,
            methods: ["GET", "POST"],
            transports: ['websocket', 'polling'],
            credentials: true
          },
          allowEIO3: true
    });

    io.sockets.on('connection', function(socket){//if user connects to sockets then
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        //if user joins the room created
        socket.on('join_room', function(data){//data is recieved from client side
            console.log('joining request rec.', data);
            socket.join(data.chatroom);//join the chatroom
            io.in(data.chatroom).emit('user_joined', data);//emit the information to client that user has been joined
        });

        //detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){//data is recieved from client side
            io.in(data.chatroom).emit('receive_message', data);
        });

    });

}