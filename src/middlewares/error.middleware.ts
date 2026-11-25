import type { ErrorRequestHandler } from "express";
import { AppError } from "../shared/AppError.js";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  _next,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      statusCode: error.statusCode,
    });

    return;
  }

  console.log("Unexpected error: ", error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    statusCode: 500,
  });
};
