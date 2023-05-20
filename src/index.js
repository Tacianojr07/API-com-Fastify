
//instanciando o fastify
const Fastify = require("fastify");

const fastify = Fastify ({
    logger:true
});

//conexão com o banco de dados
fastify.register(require("@fastify/postgres"), {
    connectionString: "postgres://postgres:044T@j155Y@localhost/postgres"
});


//criando as rotas da aplicação
//GET
fastify.get("/products", function(req,reply) {
    fastify.pg.query(
        "SELECT id,name,price FROM products", 
        function onResult (err, result) {
            reply.send(err || result)
        }
    )
});

//GET POR ID
fastify.get("/products/:id", function(req,reply) {
    fastify.pg.query(
        `SELECT id,name,price FROM products WHERE products.id = ${Number(req.params.id)}`,
        function onResult (err, result) {
            reply.send (err || result) 
        }
    )
});


//POST
fastify.post("/products" , function (req, reply) {
    fastify.pg.query(
        `INSERT INTO products VALUES('${req.body.id}', '${req.body.name}', '${req.body.price}')`,
        function onResult (err, result) {
            reply.send(err || result)
        }
    )
});

//PUT 
fastify.put("/products/:id", function (req,reply){
    fastify.pg.query(
        `UPDATE products SET name = '${req.body.name}', price = '${req.body.price}' WHERE products.id=${req.params.id}`,
        function onResult(err, result) {
            reply.send(err || result)
        }
    )
});

//DELETE

fastify.delete("/products/:id", function(req,reply) {
    fastify.pg.query(
        `DELETE FROM products WHERE products.id = ${Number(req.params.id)}`,
        function onResult(err, result) {
            reply.send(err || result)
        }
    )
})

//definindo rota e rodando o servidor
fastify.listen({ port:3000}, function(error,address) {
    if (error) {
        console.log(error)
        process.exit(1)
    }
    console.log("servidor rodando", address);

});