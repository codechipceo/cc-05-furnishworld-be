const Role = require("./roleModel");
const DbService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const CustomError = require("../../Errors/CustomError");

const model = new DbService(Role);

const roleService = {
  create: serviceHandler(async (data) => {
      return await model.save(data);
  }),

  getAll: serviceHandler(async (data) => {
    const query = { isDelete: false };
   const savedData=await model.getAllDocuments(query,data)
   const totalCount=await model.totalCounts({isDelete:false})
   return{savedData,totalCount}
  }),
  getById: serviceHandler(async (dataId) => {
    const { roleId } = dataId;
    const query = { isDelete: false, _id: roleId };
    const savedDataById = await model.getDocumentById(query);
    return savedDataById;
  }),
  update: serviceHandler(async (updateData) => {
    const { roleId } = updateData;
    const filter = { _id: roleId };
    const updatePayload = { ...updateData };
    const updatedDoc = await model.updateDocument(filter, updatePayload);
    return updatedDoc;
  }),
  delete: serviceHandler(async (deleteId) => {
    const { roleId } = deleteId;
    const deletedDoc = await model.updateDocument(
      { _id: roleId },
      { isDelete: true }
    );
    return deletedDoc;
  })
  
};
const RoleService = roleService;

module.exports = RoleService;
