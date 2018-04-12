var restify = require('restify');
var mysql = require('mysql'); // MS Sql Server client


var server = restify.createServer();


// server.use(restify.plugins.queryParser({
//     mapParams: true
// }));
// server.use(restify.plugins.bodyParser({
//     mapParams: true
// }));


// String de conexão do SQL
let sqlConfig = {
    user: 'root',
    password: 'vsadmin',
    host: '10.40.0.37',
    database: 'db_test'
}

//cria conexão sql e conecta
var connection = mysql.createConnection(sqlConfig);




// função de teste
function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

function conn(req, res, next) {
    connection.connect();
    
    connection.query('SELECT * FROM noticias', function (error, results, fields) {
        if (error) throw error;
            // console.log('>> results: ', results );
            // let string=JSON.stringify(results);
            // console.log('>> string: ', string );
            // let json =  JSON.parse(string);
            // console.log('>> json: ', json);
        connection.end();
    res.send('Teste MySQL ' + JSON.stringify(results[0]));
    });
    next();
  }


//END POINTS

// Endpoint para test
server.get('/hello/:name', respond);

// Endpoint para test conexao sql
server.get('/testesql', conn)

server.get('/', function(req, res, next) {
    const moment = require('moment')
    let now = moment()
    res.json(200, {
        status: 200,
        now: now.toString(),
        unix_now: now.unix()
    })
})


// Setar porta e rodar servidor
let port = 8080;

server.listen(port, function() {
    console.log('API Conexo rodando. porta: ', port);
  });
  