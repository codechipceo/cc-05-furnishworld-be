const CustomError = require("../../Errors/CustomError");
const successResponse = require("../../Utils/apiResponse");
const asyncHandler = require("../../Utils/asyncHandler");
const UserService = require("./userService");

const userCtrl = {
  create: asyncHandler(async (req, res, next) => {
    const userData = req.body;

    const savedUser = await UserService.create(userData);

    return successResponse({
      res: res,
      data: savedUser,
      msg: "user created Successfully",
    });
  }),

  getAll: asyncHandler(async (req, res, next) => {
    const roleDTO = req.body;
    const{savedData,totalCount}=await UserService.getAll(roleDTO)
   
   console.log(savedData)
    return successResponse({
     res,
    data:savedData,
    count:totalCount,
    msg:"All Users fetched successfully"
    })

  }),

  getById: asyncHandler(async (req, res, next) => {
    const docId = req.body;
    const docById = await UserService.getById(docId);
    return successResponse({ res, data: docById, msg: "User fetched by Id" });
  }),
  update: asyncHandler(async (req, res, next) => {
    const docDTO = req.body;
    const updatedDoc = await UserService.update(docDTO);
    return successResponse({
      res,
      data: updatedDoc,
      msg: "Updated user successfully",
    });
  }),

  delete: asyncHandler(async (req, res, next) => {
    const docId = req.body;
      const deletedDoc = await UserService.delete(docId);
      return successResponse({
        res,
        data: deletedDoc,
        msg: "User  Deleted Successfully",
      });
    }),
  signIn: asyncHandler(async (req, res, next) => {
    const { email,password } = req.body;
    const {user,token} = await UserService.signIn(email,password);
    return successResponse({
      res,
      data: {user,token},
      msg: " login successful",
    });
  }),
};

module.exports = userCtrl;
