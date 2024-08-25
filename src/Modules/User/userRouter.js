const userCtrl = require('./userCtrl')

const router = require('express').Router();

router.post("/create" , userCtrl.create)
router.post("/getAll" , userCtrl.getAll)
router.post("/getUser" , userCtrl.getById)
router.post("/delete" , userCtrl.delete)
router.post("/update" , userCtrl.update)
router.post("/sigIn" , userCtrl.signIn)

const userAdminRouter = router

module.exports= {userAdminRouter}