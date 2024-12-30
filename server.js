const io = require('socket.io')(3000, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  const users={}
  
  io.on('connection', socket => {
    socket.on('new-user',user=>{
        users[socket.id]=user
        socket.broadcast.emit('user-connected',user)
    })
    socket.on('send-chat-message',message=>{
        socket.broadcast.emit('chat-message',{message:message,user : users[socket.id]})
    })
  });