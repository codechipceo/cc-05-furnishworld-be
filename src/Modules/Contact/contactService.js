const Contact = require("./contactModel.js");
const DbService = require("../../Service/DbService.js");
const serviceHandler = require("../../Utils/serviceHandler.js");
const CustomError = require("../../Errors/CustomError.js");

const model = new DbService(Contact);

const contactService = {
  create: serviceHandler(async (data) => {
    return await model.save(data);
  }),

  getAll: serviceHandler(async (data) => {
    const query = { isDelete: false };
    const savedData = await model.getAllDocuments({}, data);

    const totalCount = await model.totalCounts(query);
    return { savedData, totalCount };
  }),

  delete: serviceHandler(async (contactId) => {
    const deletedDoc = await model.deleteDocument({ _id: contactId });
    return deletedDoc;
  }),
};

module.exports = contactService;
