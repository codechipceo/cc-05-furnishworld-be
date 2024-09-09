const DbService = require("../../Service/DbService.js");
const fileUploadUtil = require("../../Utils/fileUpload.js");
const serviceHandler = require("../../Utils/serviceHandler.js");
const ProductsModel = require("./ProductModel.js");
const shortUUID = require("short-uuid");

const model = new DbService(ProductsModel);

const productService = {
  create: serviceHandler(async (data) => {
    const shortId = shortUUID.generate();
    let images;
    const files = data.files;
    if (Array.isArray(files)) {
      images = await Promise.all(
        files.map(async (img) => {
          const imageUrl = await fileUploadUtil(img, "products");
          const imgObj = {
            imageId: shortId,
            imageUrl,
          };
          return imgObj;
        })
      );
      data.productImages = images;
    } else {
      const imageUrl = await fileUploadUtil(files, "products");
      data.productImages = [
        {
          imageId: shortId,
          imageUrl,
        },
      ];
    }
    return await model.save(data);
  }),

  createMany: serviceHandler(async (data) => {
    const isArray = Array.isArray(data);
    if (!isArray) throw new CustomError(400, "Products should be array");
    return await model.saveMany(data);
  }),

  getAll: serviceHandler(async (data) => {
    const { categoryId } = data;

    const query = {};
    if (categoryId) {
      query.categoryId = { $in: [categoryId] };
    }
    const updatedData = {
      ...data,
      populate: [{ path: "categoryId" }],
    };
    const savedData = await model.getAllDocuments(query, updatedData);
    const totalCount = await model.totalCounts(query);

    return { savedData, totalCount };
  }),
  getById: serviceHandler(async (dataId) => {
    const { productId } = dataId;
    const query = { _id: productId };
    const savedDataById = await model.getDocumentById(query);
    return savedDataById;
  }),

  update: serviceHandler(async (updateData) => {
    const { productId } = updateData;
    let filter = { _id: productId };

    if (updateData.categoryId) {
      updateData.categoryId = updateData.categoryId.split(",");
    }

    const updatePayload = { ...updateData };
    await model.updateDocument(filter, updatePayload);

    const savedDataById = await model.getAllDocuments(filter, {
      populate: [{ path: "categoryId" }],
    });

    return savedDataById;
  }),

  updateImage: serviceHandler(async (updateData) => {
    const shortId = shortUUID.generate();
    let images;
    const files = updateData.files;
    if (Array.isArray(files)) {
      images = await Promise.all(
        files.map(async (img) => {
          const imageUrl = await fileUploadUtil(img, "products");
          const imgObj = {
            imageId: shortId,
            imageUrl,
          };
          return imgObj;
        })
      );
      updateData.productImages = images;
    } else {
      const imageUrl = await fileUploadUtil(files, "products");
      updateData.productImages = [
        {
          imageId: shortId,
          imageUrl,
        },
      ];
    }

    const { productId } = updateData;
    const filter = { _id: productId };
    const updatePayload = { ...updateData };
    await model.updateDocument(filter, updatePayload);
    const savedDataById = await model.getAllDocuments(filter, {
      populate: [{ path: "categoryId" }],
    });
    return savedDataById;
  }),

  delete: serviceHandler(async (deleteId) => {
    const { productId } = deleteId;
    const result = await model.deleteDocument({ _id: productId });
    return result;
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
