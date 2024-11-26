export const errorHandler = (err, req, res, next) => {
  const errorCode = err.status || 500;
  const errorMessage = err.message || "Ocorreu algo inesperado.";

  return res.status(errorCode).json({
    status: errorCode,
    message: errorMessage,
    stack: "development" ? err.stach : null,
  });
};
