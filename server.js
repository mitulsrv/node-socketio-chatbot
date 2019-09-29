var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


users = [];
connections = [];

server.listen(3000);
console.log('Server is Running ---------------------------------');
console.log('PORT 3000  ----------------------------------------');
app.get('/', (req, res) => {

    res.sendfile(__dirname + '/index.html');
})

app.get('/shree', (req, res) => {
    res.sendFile(__dirname + '/bot.html');
})
io.sockets.on('connection', (socket) => {
    
    
    //connect
    connections.push(socket);
    console.log('Connected: %s Socket is Connected', connections.length);
    io.sockets.emit('get Welcome', {msg: 'Welcome, my name is Shree - How can i help you?'});

    //disconnect
    socket.on('disconnect', (data) => {
        // if(!socket.username) return;
        users.splice(users.indexOf(socket.username), 1);
        updateUsername();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected to Socket');
        console.log('%s Sockets are connected', connections.length);
    })

    //send message
    socket.on('send message', (data) =>{
        console.log(data);
        io.sockets.emit('new message', {msg: data, user: socket.username});
    })
    
    //new user
    socket.on('new user', (data, callback) => {
        console.log(data);
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsername();
    })

    function updateUsername(){
        console.log(users);
       io.sockets.emit('get users', users); 
    }  

    socket.on('send messages', (data) => {
        values = [];
        console.log(data);
        console.log(values.length);
        var Message = '';
        io.sockets.emit('new messages', {msg: data, username: 'You'});
        if(data == 'Hello' || data == 'Hii' || data == 'Hi' || data == 'Hey' || data == 'Hola' || data == 'Hi!' || data == 'Hiii' || data == 'Hey dude' || data == 'Heyy'){
            Message = 'Welcome to Shree Tours and Traves, How can i help you ?';
            io.sockets.emit('new messages', {msg: Message, username: 'Shree'});
            console.log(Message);
        }

        else if(data == 'Which type of service you provide ?' || data == 'Services' || data == 'services'){
            Message = 'I can book ticket for you';
            io.sockets.emit('new messages', {msg: Message, username: 'Shree'});
            console.log(Message);
        }

        else if(data == 'I want to book tickets for flights' || data == 'I want to book tickets for train' || data == 'I want to book tickets for bus' 
        || data == 'tickets' || data == 'book something' || data == 'want to book'){
            Message = 'Okay, tell me your destination as FROM - TO ?';
            values.push(data);
            io.sockets.emit('new messages', {msg: Message, username: 'Shree'});
            console.log(Message);
        }

        else if(data.includes('-')){
            Message = 'Okay, Tell me dates ? as dd/MMM/yyyy';
            values.push(data);
            io.sockets.emit('new messages', {msg: Message, username: 'Shree'});
            console.log(Message);
        }

        else if(data.includes('/')){
            values.push(data);
            Message = 'Okay your trip is booked on ' + values.toString();
            
            io.sockets.emit('new messages', {msg: Message, username: 'Shree'});
            console.log(Message);
        }else if(values.length < 1 || data.length > 0){
            Message = 'Okay, tell me your destination as FROM - TO ?';
            value.push(data);
            io.sockets.emit('new messages', {msg: Message, username: 'Shree'});
            console.log(Message);
        }
        else if(values.length == 1 || data.length > 0){
            Message = 'Okay, Tell me dates ? as dd/MMM/yyyy';
            values.push(data);
            io.sockets.emit('new messages', {msg: Message, username: 'Shree'});
            console.log(Message);
        }
    })
})