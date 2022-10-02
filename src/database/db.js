const {Pool} = require('pg')

//Conexion a la base de datos, se exporta la constante 'pool' para poder utilizarla en los controladores
/*const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: '123',
    database: 'agente-seguros',
    port: '5432'
});*/

const pool = new Pool ({
    host: 'ls-cfc704b47c174483fd6283d4584f16514c03db17.c62qf9nzcxce.us-east-2.rds.amazonaws.com',
    user: 'dbmasteruser',
    password: '(-LEKss[ih[NW#^vEQjEqfu05W+asY[Z',
    database: 'postgres',
    port: '5432'
});

module.exports = pool