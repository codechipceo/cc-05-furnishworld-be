const CustomError = require("../../Errors/CustomError");
const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const CategoryService = require("./categoryService");

const categoryCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const categoryDTO = req.body;
    categoryDTO.files = req.files

    const savedCategory = await CategoryService.create(categoryDTO);

    return successResponse({
      res: res,
      data: savedCategory,
      msg: "Category created Successfully",
    });
  }),

  getAll: asyncHandler(async (req, res, next) => {
    const categoryDTO = req.body;
    const { savedData, totalCount } = await CategoryService.getAll(
      categoryDTO
    );
    return successResponse({
      res,
      data: savedData,
      count: totalCount,
      msg: "All subcategories",
    });
  }),

  getById: asyncHandler(async (req, res, next) => {
    const docId = req.body;
    const docById = await CategoryService.getById(docId);
    return successResponse({ res, data: docById, msg: "category By Id" });
  }),

  update: asyncHandler(async (req, res, next) => {
    const docDTO = req.body;
    const updatedDoc = await CategoryService.update(docDTO);
    return successResponse({
      res,
      data: updatedDoc,
      msg: "Updated Category successfully",
    });
  }),

  delete: asyncHandler(async (req, res, next) => {
    const docId = req.body;
    const deletedDoc = await CategoryService.delete(docId);
    return successResponse({
      res,
      data: deletedDoc,
      msg: "category Deleted Successfully",
    });
  })
};

module.exports = categoryCtrl;
