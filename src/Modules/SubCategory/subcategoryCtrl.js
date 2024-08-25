const asyncHandler = require("../../Utils/asyncHandler");
const subcategoryService = require("./subcategoryService");
const successResponse = require("../../Utils/apiResponse");

const subcategoryCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const subcategoryDTO = req.body;
    let savedData;
    if (Array.isArray(subcategoryDTO)) {
      savedData = await subcategoryService.createMany(subcategoryDTO);
    } else {
      savedData = await subcategoryService.create(subcategoryDTO);
    }
    return successResponse({
      res,
      data: savedData,
      msg: "Subcategory created successfully",
    });
  }),

  getAll: asyncHandler(async (req, res, next) => {
    const subcategoryDTO = req.body;
    const { savedData, totalCount } = await subcategoryService.getAll(
      subcategoryDTO
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
    const docById = await subcategoryService.getById(docId);
    return successResponse({ res, data: docById, msg: "Subcategory By Id" });
  }),

  update: asyncHandler(async (req, res, next) => {
    const docDTO = req.body;
    const updatedDoc = await subcategoryService.update(docDTO);
    return successResponse({
      res,
      data: updatedDoc,
      msg: "Updated Subcategory successfully",
    });
  }),

  delete: asyncHandler(async (req, res, next) => {
    const docId = req.body;
    const deletedDoc = await subcategoryService.delete(docId);
    return successResponse({
      res,
      data: deletedDoc,
      msg: "Subcategory Deleted Successfully",
    });
  }),
};

module.exports = subcategoryCtrl;
