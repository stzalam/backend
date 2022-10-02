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
                stepField.fieldValue = 'localhost:3000/images/' + stepField.fieldValue
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

const getProcessFormData = async (req, res) => {
    const columns = 'PD.id, fields_properties, id_process, name AS process_name, description'
    const response = await pool.query(`SELECT ${columns} FROM sp_process_data PD 
        INNER JOIN sp_process P ON PD.id_process = P.id
        ORDER BY PD.id ASC;`);
    res.json(response.rows);
}

module.exports = {
    createProcessFormData,
    createProcessFormImages,
    getProcessFormData
}