const pool = require('../database/db')

const createProcess = async (req, res) => {
    const {name, description} = req.body;
    const columnas = '(name, description, published)';
    const values = '($1, $2, $3)';
    const data = [name, description, false];
    await pool.query('INSERT INTO sp_process' + columnas + 'VALUES' + values, data);
    res.json({'message': 'create process'});
}

const getProcesses = async (req, res) => {
    const response = await pool.query('SELECT * FROM sp_process ORDER BY id ASC');
    res.status(200).json(response.rows);
}

const getProcessesPublished = async (req, res) => {
    const published = req.params.published      //published : boolean = true | false
    const response = await pool.query(`SELECT * FROM sp_process WHERE published=${published} ORDER BY id ASC`);
    res.status(200).json(response.rows);
}

const getProcess = async(req, res) => {
    const id = parseInt(req.params.idProcess);
    const response = await pool.query('SELECT * FROM sp_process WHERE id = $1', [id]);
    res.json(response.rows[0]);
}

const getPublishedProcessForm = async (req, res) => {
    const idProcess = req.params.idProcess
    const resStepsRelation = await pool.query('SELECT * FROM sp_process_step_relation WHERE id_process = $1', [idProcess]);
    const resSteps = await pool.query(`SELECT id, name, fields_properties FROM sp_process_step WHERE id_process=${idProcess} ORDER BY id ASC`);

    let publishedProcessForm = resStepsRelation.rows[0].id_steps_relation.map(stepRelation => {
        return resSteps.rows.find(step => step.id == stepRelation.idStep)
    })
    res.json(publishedProcessForm);
}

const updateProcess = async(req, res) => {
    const id = req.params.idProcess
    const {published} = req.body
    const columns = 'published=$1'
    const data = [published]
    await pool.query('UPDATE sp_process SET ' + columns + `WHERE id=${id}`, data)
    res.json({'message': 'update process'});
}

const deleteProcess = async(req, res) => {
    const id = req.params.idProcess
    await pool.query('DELETE FROM sp_process WHERE id = $1', [id]);
    res.json({'message': 'delete process'});
}

module.exports = {
    createProcess,
    getProcessesPublished,
    getProcess,
    getPublishedProcessForm,
    updateProcess,
    deleteProcess
}