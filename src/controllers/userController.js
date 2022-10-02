const pool = require('../database/db')

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT *FROM sp_user');
    res.status(200).json(response.rows);
}
 
const createUser = async(req, res) => {
    const {nombre, apellido, correo, password, puesto, tipo} = req.body;
    const columnas = '(name, last_name, email, password, position, type)';
    const values = '($1, $2, $3, $4, $5, $6)';
    const data = [nombre, apellido, correo, password, puesto, tipo];
    await pool.query('INSERT INTO sp_user' + columnas + 'VALUES' + values, data);
    res.json({'message': 'usuario creado'});
}
 
const getUser = async(req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM sp_user WHERE id = $1', [id]);
    res.json(response.rows[0]);
}
 
const login = async(req, res) =>{
    const {email, password} = req.body;
    const response = await pool.query('SELECT * FROM sp_user WHERE email = $1 AND password = $2', [email, password]);
    if(response.rows[0]){
        console.log('Exito');
        res.json({
            'message': 'success',
            'idUsuario': response.rows[0].id,
            'tipoUsuario': response.rows[0].type
        });
    } else{
        console.log('Error');
        res.json({'message': 'error auth'});
    }
}

module.exports = {
    getUsers,
    createUser,
    getUser,
    login
}