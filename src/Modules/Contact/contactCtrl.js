const successResponse = require("../../Utils/apiResponse.js");
const asyncHandler = require("../../Utils/asyncHandler.js");
const contactService = require("./contactService.js");

const contactCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const categoryDTO = req.body;

    const savedCategory = await contactService.create(categoryDTO);

    return successResponse({
      res: res,
      data: savedCategory,
      msg: "Category created Successfully",
    });
  }),

  getAll: asyncHandler(async (req, res, next) => {
    const contactDTO = req.body;

    const { savedData, totalCount } = await contactService.getAll(contactDTO);

    return successResponse({
      res: res,
      data: savedData,
      count: totalCount,
      msg: "All contacts",
    });
  }),
  delete: asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedDoc = await contactService.delete(id);
    return successResponse({
      res,
      data: deletedDoc,
      msg: "contact Deleted Successfully",
    });
  }),
};

module.exports = contactCtrl;
