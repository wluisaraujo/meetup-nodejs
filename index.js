const http = require('http')
const PORT = 3000


const handler = (request, response) => {
    response.end('Hello')
}

http.createServer(handler)
    .listen(PORT, () => console.log('server running at', PORT))
