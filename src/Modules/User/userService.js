const User = require("./userModel");
const DbService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const CustomError = require("../../Errors/CustomError");
const { hashPassword, comparePasswords, generateToken } = require('../../Utils/utils');
const bcrypt = require("bcryptjs");

const model = new DbService(User);

const userService = {
  create: serviceHandler(async (data) => {
    const { password, ...userData } = data;
    const hashedPassword = await hashPassword(password);

    const savedData = await model.save({ ...userData, password: hashedPassword });

    return savedData;
  }),

  getAll: serviceHandler(async (data) => {
    const query = { isDelete: false };
   const savedData=await model.getAllDocuments(query,data)
   const totalCount=await model.totalCounts({isDelete:false})
  
   return{savedData,totalCount}
  }),
  getById: serviceHandler(async (dataId) => {
    const { userId } = dataId;
    const query = { isDelete: false, _id: userId };
    const savedDataById = await model.getDocumentById(query);
    return savedDataById;
  }),
  update: serviceHandler(async (updateData) => {
    const { userId } = updateData;
    const filter = { _id: userId };
    const updatePayload = { ...updateData };
    const updatedDoc = await model.updateDocument(filter, updatePayload);
    return updatedDoc;
  }),
  delete: serviceHandler(async (deleteId) => {
    const { userId } = deleteId;
    const deletedDoc = await model.updateDocument(
      { _id: userId },
      { isDelete: true }
    );
    return deletedDoc;
  }),
  signIn:serviceHandler(async(email,password)=>{
    const filter={email}
    const user = await model.getDocument(filter);

    if (!user) {
      throw new CustomError(404, "User not found");
    }
    const isPasswordMatch = await comparePasswords(password, user.password);

    if (!isPasswordMatch) {
      throw new CustomError(401, "Incorrect password");
    }
const token=generateToken(user)
    return {token}
  }  )
};
const UserService=userService
module.exports = UserService;
