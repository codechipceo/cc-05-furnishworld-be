const roleCtrl = require('./roleCtrl')

const router = require('express').Router();

router.post("/create" , roleCtrl.create)
router.post("/getAll" , roleCtrl.getAll)
router.post("/getRole" , roleCtrl.getById)
router.post("/delete" , roleCtrl.delete)
router.post("/update" , roleCtrl.update)

const roleRouter = router

module.exports= {roleRouter}