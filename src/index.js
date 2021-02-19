const http = require('http')
const PORT = 3000

const DEFAULT_HEADER = { 'Content-Type': 'application/json' }

const routes = {
    'hookahs:get': async (request, response) => {
        response.end(hookahs:get)
    },
    default: async (request, response) => {
        response.writeHead(404, DEFAULT_HEADER)
        return response.end()
    },
}

const handler = (request, response) => {
    const { url, method } = request
    const [first, route, param] = url.split('/')
    request.queryString = { param }

    const key = `${route}:${method.toLowerCase()}`

    response.writeHead(200, DEFAULT_HEADER)

    const chosen = routes[key] || routes.default

    return chosen(request, response)
}

http.createServer(handler)
    .listen(PORT, () => console.log('server running at', PORT))
