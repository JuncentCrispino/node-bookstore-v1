const catchAsync = (fn) => async (req, res, next) => {
  try {
    return await Promise.resolve(fn(req, res, next));
  } catch (err) {
    return next(err);
  }
};

export default catchAsync;