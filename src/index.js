
//instanciando o fastify
const Fastify = require("fastify");

const fastify = Fastify ({
    logger:true
});

//conexão com o banco de dados
fastify.register(require("@fastify/postgres"), {
    connectionString: "postgres://postgres:044T@j155Y@localhost/postgres"
});

require("./routes/indexRoutes")(fastify);


//definindo rota e rodando o servidor
fastify.listen({ port:3000}, function(error,address) {
    if (error) {
        console.log(error)
        process.exit(1)
    }
    console.log("servidor rodando", address);

});