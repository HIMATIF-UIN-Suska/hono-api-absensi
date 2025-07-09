import { Context, Next } from "hono";
import AuthHelper from "../helpers/auth.helper";
import { APIError } from "../utils/api-error.util";

export default class AuthMiddleware {
	public static async JWTBearerTokenExtraction(c: Context, next: Next) {
		const authHeader = c.req.header("Authorization");

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			throw new APIError("Hadeh, format authorization header-nya salah mas! 😡", 401);
		}

		const token = authHeader.split(" ")[1];

		try {
			const payload = AuthHelper.decodeJwtPayload(token);
			c.set("user", payload);
			await next();
		} catch (error) {
			throw new APIError("Waduh, token-nya salah mas, kagak valid, heker kamu yah! 😡", 401);
		}
	}
}
