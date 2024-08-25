const DbService = require("../../Service/DbService");
const fileUploadUtil = require("../../Utils/fileUpload");
const serviceHandler = require("../../Utils/serviceHandler");
const ProductsModel = require("./ProductModel");

const model = new DbService(ProductsModel);

const productService = {
  create: serviceHandler(async (data) => {
    const files = data.files;

    const images =await Promise.all( files.map(async (img, i) => {
      const imageUrl = await fileUploadUtil(img, 'products');
      const imgObj = {
        imageId: i,
        imageUrl,
      };
      return imgObj
    }))

    console.log(images)
    data.productImages = images

    return await model.save(data);
  }),

  createMany: serviceHandler(async (data) => {
    const isArray = Array.isArray(data);
    if (!isArray) throw new CustomError(400, "Products should be array");
    return await model.saveMany(data);
  }),

  getAll: serviceHandler(async (data) => {
    const query = {};
    const updatedData = {
      ...data,
     populate:[{path:"categoryId"}]
    };
    const savedData = await model.getAllDocuments(query, updatedData);
    const totalCount = await model.totalCounts({ isDelete: false });
    return { savedData, totalCount };
  }),
  getById: serviceHandler(async (dataId) => {
    const { productId } = dataId;
    const query = { isDelete: false, _id: productId };
    const savedDataById = await model.getDocumentById(query);
    return savedDataById;
  }),
  update: serviceHandler(async (updateData) => {
    const { productId } = updateData;
    const filter = { _id: productId };
    const updatePayload = { ...updateData };
    const updatedDoc = await model.updateDocument(filter, updatePayload);
    return updatedDoc;
  }),
  delete: serviceHandler(async (deleteId) => {
    const { productId } = deleteId;
    const deletedDoc = await model.updateDocument(
      { _id: productId },
      { isDelete: true }
    );
    return deletedDoc;
  }),

  getBySubcategoryId: serviceHandler(async (subcategory) => {
    const { subcategoryId } = subcategory;
    const query = { isDelete: false, subcategoryId };
    const savedData = await model.getAllDocuments(query, subcategory);
    const totalCount = await model.totalCounts(query);
    return { savedData, totalCount };
  }),
};

module.exports = productService;
