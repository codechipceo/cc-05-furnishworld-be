const { verifyToken, checkAccess } = require('../../Utils/utils');
const { categoryValidationSchema, validateRequestBody } = require('../../validators/Validation');
const categoryCtrl = require('./categoryCtrl')

const router = require('express').Router();

router.post("/create" , validateRequestBody, categoryCtrl.create)
router.post("/getall" ,  categoryCtrl.getAll)
router.post("/getbyid" , categoryCtrl.getById)
router.post("/delete" , categoryCtrl.delete)
router.post("/update" , categoryCtrl.update)

const categoryRouter = router

module.exports= {categoryRouter}
