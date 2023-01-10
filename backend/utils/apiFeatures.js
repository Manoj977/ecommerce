class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  //search products
  search() {
    let keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i', //case insensitive
          },
        }
      : {};
    this.query.find({ ...keyword });
    return this;
  }
  //filter products
  filter() {
    // need to modify some of the section so we destructor it
    const queryStrCopy = { ...this.queryStr };

    //remove fields from query
    const removeFields = ['keyword', 'limit', 'page'];
    removeFields.forEach((field) => delete queryStrCopy[field]);
    //price filter
    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, (match) => `$${match}`);
    this.query.find(JSON.parse(queryStr));
    return this;
  }
  //pagination
  pagination(resPerPage) {
    //it gives in string but we want in number , so use number class
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
