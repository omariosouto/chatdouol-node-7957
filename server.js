const express = require('express')
const app = express()
const http = require('http').Server(app) // consigurando o http://
const io = require('socket.io')(http)// configurando o ws://
const port = 3000



app.get('/', (request, response) => {
    response.render('home.ejs')
})

http.listen(port, () => {
    console.log(`
        App subiu na porta: ${port}
        http://localhost:3000
    `)
})



io.on('connection', (socket) => {
    console.log('Usuario conectou')

    socket.on('CLIENT_SENDMESSAGE', (dadoDoClient) => {
        console.log(dadoDoClient)
        io.emit('SERVER_SENDMESSAGE', dadoDoClient)
    })

    socket.on('disconnect', () => {
        console.log('Usuario saiu :(')
    })
})