const asyncHandler = require("../../Utils/asyncHandler.js");
const productService = require("./ProductService.js");
const successResponse = require("../../Utils/apiResponse.js");

const productCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const productDTO = { ...req.body, files: req.files.productImages };
    const savedData = await productService.create(productDTO);

    return successResponse({
      res,
      data: savedData,
      msg: "Product created successfully",
    });
  }),

  updateImage: asyncHandler(async (req, res, next) => {
    const productDTO = { ...req.body, files: req.files.productImages };
    const savedData = await productService.updateImage(productDTO);

    return successResponse({
      res,
      data: savedData,
      msg: "Product Images Updated successfully",
    });
  }),

  getAll: asyncHandler(async (req, res, next) => {
    const productDTO = req.body;
    const { savedData, totalCount } = await productService.getAll(productDTO);
    return successResponse({
      res,
      data: savedData,
      count: totalCount,
      msg: "All Products",
    });
  }),

  getById: asyncHandler(async (req, res, next) => {
    const docId = req.body;
    const docById = await productService.getById(docId);
    return successResponse({ res, data: docById, msg: "Subcategory By Id" });
  }),

  update: asyncHandler(async (req, res, next) => {
    const docDTO = req.body;
    const updatedDoc = await productService.update(docDTO);
    return successResponse({
      res,
      data: updatedDoc[0],
      msg: "Updated Product successfully",
    });
  }),

  delete: asyncHandler(async (req, res, next) => {
    const docId = req.body;
    const deletedDoc = await productService.delete(docId);
    return successResponse({
      res,
      data: deletedDoc,
      msg: "Product Deleted Successfully",
    });
  }),

  getBySubcategoryId: asyncHandler(async (req, res, next) => {
    const productDto = req.body;
    const { savedData, totalCount } = await productService.getBySubcategoryId(
      productDto
    );
    return successResponse({
      res,
      data: savedData,
      count: totalCount,
      msg: "Products by subcategory Id",
    });
  }),
};

module.exports = productCtrl;
