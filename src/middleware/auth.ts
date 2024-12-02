import type { Context, Next } from "hono";

export const authMiddleware = async (ctx: Context, next: Next) => {
	const token = ctx.req.header("Authorization");
	if (!token) {
		return ctx.json({ success: false, message: "Unauthorized" }, 401);
	}
	await next();
};
