const pool = require('../database/db')

//Crear Paso de un Proceso
const createProcessStep = async (req, res) => {
    const {name, idProcess} = req.body;
    const columnas = '(name, id_process)';
    const values = '($1, $2)';
    const data = [name, idProcess];
    await pool.query('INSERT INTO sp_process_step' + columnas + 'VALUES' + values, data);
    res.json({'message': 'create process step'});
}

//Obtener los Pasos de un Proceso
const getProcessSteps = async (req, res) => {
    const idProcess = req.params.idProcess
    const response = await pool.query(`SELECT id, name FROM sp_process_step WHERE id_process=${idProcess} ORDER BY id ASC`);
    res.json(response.rows);
}

//Obtener un Paso de un Proceso
const getProcessStep = async(req, res) => {
    const id = parseInt(req.params.idStep);
    const response = await pool.query('SELECT * FROM sp_process_step WHERE id = $1', [id]);
    res.json(response.rows[0]);
}

const updateProcessStep = async(req, res) => {
    const id = req.params.idStep
    const {formStructure, fieldsProperties} = req.body
    const columns = 'form_structure=$1, fields_properties=$2'
    const data = [formStructure, JSON.stringify(fieldsProperties)]
    await pool.query('UPDATE sp_process_step SET ' + columns + `WHERE id=${id}`, data)
    res.json({message: 'update process step'})
}

const deleteProcessStep = async(req, res) => {
    const id = req.params.idStep
    await pool.query('DELETE FROM sp_process_step WHERE id = $1', [id]);
    res.json({'message': 'delete process step'});
}

module.exports = {
    createProcessStep,
    getProcessSteps,
    getProcessStep,
    updateProcessStep,
    deleteProcessStep
}