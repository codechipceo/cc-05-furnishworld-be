const productCtrl = require("./ProductCtrl.js");

const productRouter = require("express").Router();

productRouter.post("/create", productCtrl.create);
productRouter.post("/createMany", productCtrl.create);
productRouter.post("/getAll", productCtrl.getAll);
productRouter.post("/getById", productCtrl.getById);
productRouter.post("/update", productCtrl.update);
productRouter.post("/delete", productCtrl.delete);

productRouter.post("/updateImage", productCtrl.updateImage);
productRouter.post("/deleteProductImage", productCtrl.deleteImage);

module.exports = productRouter;
