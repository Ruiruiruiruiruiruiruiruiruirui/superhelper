/**
 * Created by Rui on 30/10/17.
 */

const name = 'Super Helper'

const host = ''
const port = process.env.PORT || 8088

// create server
const restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')

const server = restify.createServer({name})

// register pluginsnpm
server.use(restify.plugins.queryParser())
// server.use(restify.CORS({
//   //credentials: true,                 // defaults to false
//   origins: ['http://localhost:8080'],
//   methods: ['GET','POST','OPTIONS']
// }))

//enable cors for now
const cors = corsMiddleware({
  origins: ['*']
})

server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.bodyParser({mapParams: false, defer: true}))
server.use(restify.plugins.authorizationParser())
// add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
// enable preflight (for chrome)
const preflightEnabler = require('se7ensky-restify-preflight')
preflightEnabler(server, {'headers': 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type'})

// ===============================
// register routers
require('./routes').forEach(router => router({server}))

// server.server.setTimeout(60000*5)

// ===============================
// start server
server.listen(port, host, () => {
  console.log(`${server.name} is listening at ${server.url}`)
})