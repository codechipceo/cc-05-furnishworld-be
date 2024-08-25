const CustomError = require("../../Errors/CustomError");
const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const RoleService = require("./roleService");

const roleCtrl = {
    create: asyncHandler(async (req, res, next) => {
      const roleData = req.body;

    const savedRole = await RoleService.create(roleData);

    return successResponse({
      res: res,
      data: savedRole,
      msg: "user created Successfully",
    });
    }),
  
    getAll: asyncHandler(async (req, res, next) => {
      const roleDTO = req.body;
     const{savedData,totalCount}=await RoleService.getAll(roleDTO)
     return successResponse({
      res,
     data:savedData,
     count:totalCount,
     msg:"All Roles"
     })

    }),
  
    getById: asyncHandler(async (req, res, next) => {
      const docId = req.body;
      const docById = await RoleService.getById(docId);
      return successResponse({ res, data: docById, msg: "User Role by Id" });
    }),
    update: asyncHandler(async (req, res, next) => {
      const docDTO = req.body;
      const updatedDoc = await RoleService.update(docDTO);
      return successResponse({
        res,
        data: updatedDoc,
        msg: "Updated role successfully",
      });
    }),
  
    delete: asyncHandler(async (req, res, next) => {
      const docId = req.body;
      const deletedDoc = await RoleService.delete(docId);
      return successResponse({
        res,
        data: deletedDoc,
        msg: "User Role Deleted Successfully",
      });
    })
  };
  
  module.exports = roleCtrl;
  