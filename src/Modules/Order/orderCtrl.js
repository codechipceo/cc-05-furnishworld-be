const CustomError = require("../../Errors/CustomError");
const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const orderService = require("./orderService");
const OrderService = require("./orderService");

const orderCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const orderData = req.body;
    const savedOrder = await OrderService.create(orderData);
    savedOrder.populate("")
    return successResponse({
      res: res,
      data: savedOrder,
      msg: "Order created successfully",
    });
  }),

  getAll: asyncHandler(async (req, res, next) => {
    const orderDTO = req.body;
    const { savedData, totalCount } = await orderService.getAll(orderDTO);
    console.log(savedData)
    return successResponse({
      res: res,
      data: savedData,
      count: totalCount,
      msg: "All orders",
    });
  }),

  getById: asyncHandler(async (req, res, next) => {
    const docId = req.body;
    const docById = await orderService.getById(docId);
    return successResponse({
      res: res,
      data: docById,
      msg: "Order by id fetched",
    });
  }),

  update: asyncHandler(async (req, res, next) => {
    const docId=req.body;
    const updatedDoc=await orderService.update(docId)
    return successResponse({
      res,
      data: updatedDoc,
      msg: "Updated order successfully",
    })
  }),

  delete: asyncHandler(async (req, res, next) => {
    const docId=req.body;
    const deletedDoc=await orderService.delete(docId)
    return successResponse({
      res,
      data: deletedDoc,
      msg: "order Deleted Successfully",
    });
  }),
};
module.exports = orderCtrl;
