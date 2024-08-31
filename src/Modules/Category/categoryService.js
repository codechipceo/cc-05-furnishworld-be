const Category = require("./CategoryModel.js");
const DbService = require("../../Service/DbService.js");
const serviceHandler = require("../../Utils/serviceHandler.js");
const CustomError = require("../../Errors/CustomError.js");
const fileUploadUtil = require("../../Utils/fileUpload.js");
const model = new DbService(Category);

const categoryService = {
  create: serviceHandler(async (data) => {

    const url = await fileUploadUtil(data?.files?.categoryImage, 'category');
    data.categoryImage = url
    return await model.save(data);
  }),

  getAll: serviceHandler(async (data) => {
    const query = { isDelete: false };
    const savedData = await model.getAllDocuments(query, data);
    const totalCount = await model.totalCounts({ isDelete: false });
    return { savedData, totalCount };
  }),
  getById: serviceHandler(async (dataId) => {
    const { categoryId } = dataId;
    const query = { isDelete: false, _id: categoryId };
    const savedDataById = await model.getDocumentById(query);
    return savedDataById;
  }),
  update: serviceHandler(async (updateData) => {
    const { categoryId , categoryTitle, categoryImage} = updateData;
    const filter = { _id: categoryId };
    console.log(categoryTitle, categoryImage);
    const updatePayload = {...updateData };
    const updatedDoc = await model.updateDocument(filter, updatePayload);
    console.log(updatedDoc)
    return updatedDoc;
  }),
  delete: serviceHandler(async (deleteId) => {
    const { categoryId } = deleteId;
    const deletedDoc = await model.deleteDocument(
      { _id: categoryId },

    );
    return deletedDoc;
  }),
};

const CategoryService = categoryService;

module.exports = CategoryService;
