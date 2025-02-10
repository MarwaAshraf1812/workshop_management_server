export class WorkshopError extends Error {
  constructor(message, status = 500, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export const errorHandler = (err, req, res, next) => {
  if (err instanceof WorkshopError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
      errors: err.errors
    });
  }

  // Log unexpected errors
  console.error(err);
  return res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
};
