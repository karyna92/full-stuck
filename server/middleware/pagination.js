
const pagination = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(process.env.PAGINATION_LIMIT) || 10;
  const skip = (page - 1) * limit;

  req.pagination = { limit, skip, page };
  next();
};

module.exports = pagination;
