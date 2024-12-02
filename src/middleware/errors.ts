import type { Context, ErrorHandler, NotFoundHandler } from "hono";

const serverError: ErrorHandler = (err, c: Context) => {
	return c.json({ success: false, message: "Internal Server Error" }, 500);
};

const notFoundError: NotFoundHandler = (c: Context) => {
	return c.json({ success: false, message: "Not Found" }, 404);
};

const unauthorizedError: ErrorHandler = (err, c: Context) => {
	return c.json({ success: false, message: "Unauthorized" }, 401);
};

export { serverError, notFoundError, unauthorizedError };
