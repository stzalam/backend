const pool = require('../database/db')

const fs = require('fs');

//Crear Formulario de Datos de un proceso publicado
const createProcessFormData = async (req, res) => {
    const {fieldsProperties, idProcess} = req.body;
    const columnas = '(fields_properties, id_process)';
    const values = '($1, $2)';
    
    fieldsProperties.forEach(step => {
        step.fieldsProperties.forEach(stepField => {
            if(stepField.fieldType == "file" && stepField.fieldValue !== ""){
                //stepField.fieldValue = 'http://localhost:3000/images/' + stepField.fieldValue
                stepField.fieldValue = process.env.API_URL + `/images/${stepField.fieldValue}`
            }
        })
    })
    const data = [JSON.stringify(fieldsProperties), idProcess];
    await pool.query('INSERT INTO sp_process_data' + columnas + 'VALUES' + values, data);
    res.json({'message': 'create process form data'});
}

const createProcessFormImages = async (req, res) => {
    const imagesName = req.body.imagesName.split(',')
    const files = req.files

    if(files !== undefined){
        for(let i = 0; i < files.length; i++){
            const newPath = files[i].destination + `/${imagesName[i]}`
            fs.rename(files[i].path, newPath, (err) => {
                if(err) console.log('ERROR: ', err);
            })
        }
    }
    res.json({'message': 'create process form images'});
}

const getProcessesFormData = async (req, res) => {
    const columns = 'PD.id, fields_properties, id_process, name AS process_name, description'
    const response = await pool.query(`SELECT ${columns} FROM sp_process_data PD 
        INNER JOIN sp_process P ON PD.id_process = P.id
        ORDER BY PD.id ASC;`);
    res.json(response.rows);
}

const getProcessFormData = async (req, res) => {
    const id = req.params.idProcessData
    const columns = 'PD.id, fields_properties, name AS process_name'
    const response = await pool.query(`SELECT ${columns} FROM sp_process_data PD 
        INNER JOIN sp_process P ON PD.id_process = P.id
        WHERE PD.id = ${id}`);
    res.json(response.rows[0]);
}

const getCountProcessFormData = async (req, res) => {
    const columns = 'PD.id_process, P.name, COUNT(*) AS total'
    const response = await pool.query(`SELECT ${columns} FROM sp_process_data PD 
        INNER JOIN sp_process P ON PD.id_process = P.id
        GROUP BY PD.id_process, P.name`);

    res.json(response.rows);
    console.log(response.rows)
}

const updateProcessFormData = async(req, res) => {
    const id = req.params.idProcessData
    const {fieldsProperties} = req.body
    const columns = 'fields_properties=$1'
    const data = [JSON.stringify(fieldsProperties)]
    await pool.query('UPDATE sp_process_data SET ' + columns + `WHERE id=${id}`, data)
    res.json({message: 'update process data'})
}

module.exports = {
    createProcessFormData,
    createProcessFormImages,
    getProcessesFormData,
    getProcessFormData,
    getCountProcessFormData,
    updateProcessFormData
}