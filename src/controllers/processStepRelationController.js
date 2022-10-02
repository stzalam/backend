const pool = require('../database/db')

const createUpdateStepsRelation = async (req, res) => {
    let {idStepsRelation, idProcess} = req.body;
    idStepsRelation = JSON.stringify(idStepsRelation)
    await pool.query(`CALL create_update_steps_relation('${idStepsRelation}', ${idProcess});`);
    res.json({'message': 'create/update steps relation'});
}

const getStepsRelation = async (req, res) => {
    const idProcess = req.params.idProcess
    const response = await pool.query('SELECT * FROM sp_process_step_relation WHERE id_process = $1', [idProcess]);
    res.json(response.rows);
}

module.exports = {
    createUpdateStepsRelation,
    getStepsRelation
}