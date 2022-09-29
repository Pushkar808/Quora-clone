class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5555');

        if (this.userEmail) {
            this.connectionHandler();
        }

    }


    connectionHandler() {
        let self = this;

        this.socket.on('connect', function () {
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {//sending the room information to the server inside the join_room
                user_email: self.userEmail,
                chatroom: 'RoomName'
            });

            self.socket.on('user_joined', function (data) {//getting data from server if it emits
                console.log('a user joined!', data);
            })


        });

        //send a message on clicking the send message button
        $('#send-message').click(function () {
            let msg = $('#message-input').val();//getting the message

            if (msg != '') {//if msg in not emty the emit send_message event to the server
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'RoomName'
                });
            }
        });
        //recieving a message from sever receive_message event
        self.socket.on('receive_message', function (data) {//data is sent by the server
            console.log('message received', data.message);
            let newMessage = $('<div>');

            let messageType = 'from-user-chat';//type of class for styling

            if (data.user_email == self.userEmail) {
                messageType = 'to-user-chat';//if user email and sender email is same
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));
            newMessage.addClass(messageType);
            $('#chats').append(newMessage);
        })
    }
}


function showchatBox() {//to toggle the comment bar
    if ($('#chat-container').css('visibility') == 'hidden')
        $('#chat-container').css('visibility', 'visible')
    else
        $('#chat-container').css('visibility', 'hidden')
}

function showComments() {
    if ($('#user-comment-container').css('display') == 'none'){
        $('#comment').css('color','#fc8d8d')
        $('#user-comment-container').css('display', 'inline');
    }
    else{
        $('#user-comment-container').css('display', 'none')
        $('#comment').css('color','#000000')
    }
}