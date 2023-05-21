
const {productsRoutes} = require("./products")

module.exports = fastify => {
    productsRoutes(fastify)
}