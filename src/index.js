const http = require('http')
const Hookah = require('./entities/hookah')
const HookahFactory = require('./factories/hookahFactory')
const hookahService = HookahFactory.generateInstance()
const PORT = 3000

const DEFAULT_HEADER = { 'Content-Type': 'application/json' }

const routes = {
  'hookahs:get': async (request, response) => {
    const { param } = request.queryString
    const id = Number(param)

    const hookahs = await hookahService.find(id)
    response.write(JSON.stringify({results: hookahs}))

    return response.end()
  },
  'hookahs:post': async (request, response) => {
    for await (const data of request) {
      const item = JSON.parse(data)
      const hookah = new Hookah(item)
      const { error, valid } = hookah.isValid()

      if ( !valid ) {
        response.writeHead(400, DEFAULT_HEADER)
        response.write(JSON.stringify({ error: error.join(',') }))
      }

      const id = await hookahService.create(hookah)
      response.writeHead(201, DEFAULT_HEADER)
      response.write(JSON.stringify({ success: 'Hookah Created with success', id }))

      return response.end()
    }
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
