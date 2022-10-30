const {Router} = require('express')
const router = Router()

const userController = require('../controllers/userController')
const processController = require('../controllers/processController')
const processStepController = require('../controllers/processStepController')
const processStepRelationController = require('../controllers/processStepRelationController')
const processFormDataController = require('../controllers/processFormDataController')

router.get('/user', userController.getUsers);
router.post('/user', userController.createUser);
router.get('/user/:id', userController.getUser);
router.post('/login', userController.login);

router.post('/process', processController.createProcess)
router.get('/process/published/:published', processController.getProcessesPublished)
router.get('/process/:idProcess', processController.getProcess)
router.get('/process/:idProcess/form', processController.getPublishedProcessForm)
router.put('/process/:idProcess', processController.updateProcess)
router.delete('/process/:idProcess', processController.deleteProcess)

router.post('/processStep', processStepController.createProcessStep)
router.get('/processStep/idProcess/:idProcess', processStepController.getProcessSteps)
router.get('/processStep/:idStep', processStepController.getProcessStep)
router.put('/processStep/:idStep', processStepController.updateProcessStep)
router.delete('/processStep/:idStep', processStepController.deleteProcessStep)

router.post('/processStepRelation', processStepRelationController.createUpdateStepsRelation)
router.get('/processStepRelation/idProcess/:idProcess', processStepRelationController.getStepsRelation)

router.post('/processFormData', processFormDataController.createProcessFormData)
router.post('/processFormImages', processFormDataController.createProcessFormImages)
router.get('/processFormData', processFormDataController.getProcessesFormData)
router.get('/processFormData/:idProcessData', processFormDataController.getProcessFormData)
router.get('/processFormData-count', processFormDataController.getCountProcessFormData)
router.put('/processFormData/:idProcessData', processFormDataController.updateProcessFormData)

module.exports = router