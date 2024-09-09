const { categoryRouter } = require("./Modules/Category/categoryRouter.js");
const orderRouter = require("./Modules/Order/orderRouter.js");
const productRouter = require("./Modules/Products/ProductRouter.js");
const { roleRouter } = require("./Modules/Roles/roleRouter.js");
const subcategoryRouter = require("./Modules/SubCategory/subcategoryRouter.js");
const { userAdminRouter } = require("./Modules/User/userRouter.js");
const { contactRouter } = require("./Modules/Contact/contactRouter.js");

const adminRouter = require("express").Router();
const userRouter = require("express").Router();

// ADMIN ROUTES
adminRouter.use("/category", categoryRouter);
adminRouter.use("/subcategory", subcategoryRouter);
adminRouter.use("/user", userAdminRouter);
adminRouter.use("/userRole", roleRouter);
adminRouter.use("/product", productRouter);
adminRouter.use("/order", orderRouter);
adminRouter.use("/contacts", contactRouter);

// USER ROUTES

module.exports = { adminRouter, userRouter };
