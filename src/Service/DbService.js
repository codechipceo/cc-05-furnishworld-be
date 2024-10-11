module.exports = class DatabaseService {
  constructor(dbSchema) {
    this.model = dbSchema;
  }

  async save(data) {
    const savedData = await this.model.create(data);
    return savedData;
  }

  saveMany = async (data) => {
    const documents = await this.model.insertMany(data);
    return documents;
  };
  getDocument = async (query) => {
    const document = await this.model.findOne(query);
    return document;
  };
  getAllDocuments = async (query, options = {}) => {
    const { limit, sort, skip, populate } = options;
    const updatedQuery = { ...query };

    let customQuery =  this.model.find(updatedQuery);

    if (skip !== "" && limit !== "") {
      customQuery = customQuery.skip(skip).limit(limit);
    }

    if (sort) {
      customQuery = customQuery.sort({ [sort]: -1 });
    } else {
      customQuery = customQuery.sort({ createdAt: -1 });
    }
    // if (populate) {
    //   populate.forEach((id) => {

    //     customQuery.populate(id)
    //   })
    // }

    if (populate) {
      const documents = await customQuery.populate(populate).exec();
      return documents;
    }
    const documents = await customQuery.exec();
    return documents;
  };

  updateDocument = async (filter, data, options = { new: true }) => {
    const document = await this.model.findOneAndUpdate(filter, data, options);
    return document;
  };

  getDocumentById = async (query) => {
    const document = await this.model.findOne(query);
    return document;
  };

  deleteDocument = async (data) => {
    const deletedDocumnent = await this.model.findOneAndRemove(data);
    return deletedDocumnent;
  };

  totalCounts = async (query) => {
    const count = await this.model.countDocuments(query);
    return count;
  };
};
