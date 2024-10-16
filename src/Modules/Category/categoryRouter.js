const { verifyToken, checkAccess } = require('../../Utils/utils.js');
const { categoryValidationSchema, validateRequestBody } = require('../../validators/Validation.js');
const categoryCtrl = require('./categoryCtrl.js')

const router = require('express').Router();

router.post("/create" , validateRequestBody, categoryCtrl.create)
router.post("/getall" ,  categoryCtrl.getAll)
router.post("/getbyid" , categoryCtrl.getById)
router.post("/delete" , categoryCtrl.delete)
router.post("/update", categoryCtrl.update)
router.post("/updateImage", categoryCtrl.updateCategoryImg);

const categoryRouter = router

module.exports= {categoryRouter}
