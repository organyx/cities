const { ZodError } = require('zod');
const { StatusCodes } = require('http-status-codes');

function validate(schema) {
  return (req, res, next) => {
    try {
      const input = {
        params: req.params,
        query: req.query,
        body: req.body
      };
      schema.parse(input);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'fail',
          errors: error.errors
        });
      }
    }
  };
}

module.exports = validate;
