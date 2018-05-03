var mysql = require('mysql'); // MS Sql Server client

// String de conexão do SQL
let sqlConfig = {
    user: 'root',
    password: 'vsadmin',
    host: '10.40.0.37',
    database: 'db_test'
}


module.exports = function(){
    //cria conexão sql e conecta
    var connection = mysql.createConnection(sqlConfig);
}
