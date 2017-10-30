/**
 * Created by Rui on 30/10/17.
 */

const Router = require('restify-router').Router

// main object
const routerInstance = new Router()

// constants
const prefix = "common"

routerInstance.get('/', (req, res, next) => {
  res.send({
    status: "OK",
    content: "WELCOME TO SUPER HELPER, PREPARE TO GET HELPED BITCHHHHH"
  })
})

module.exports = ({server}) => routerInstance.applyRoutes(server, prefix)