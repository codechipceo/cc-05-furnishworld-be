const orderCtrl=require("./orderCtrl")

const orderRouter=require("express").Router()

orderRouter.post("/create",  orderCtrl.create);
orderRouter.post("/getAll", orderCtrl.getAll);
orderRouter.post("/getById", orderCtrl.getById);
orderRouter.post("/update", orderCtrl.update);
orderRouter.post("/delete", orderCtrl.delete);

module.exports = orderRouter;