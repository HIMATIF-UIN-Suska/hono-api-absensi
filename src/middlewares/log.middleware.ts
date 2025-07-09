import { Context, Next } from "hono";
import { getConnInfo } from "hono/bun";
import LogHelper from "../helpers/log.helper";

export default class LogMiddleware {
	private static async extractRequest(c: Context) {
		const conn = getConnInfo(c);
		const ip =
			c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
			conn.remote.address;
		const user_agent = c.req.header("user-agent");
		const method = LogHelper.colorMethod(c.req.method);
		const path = c.req.path;

		return { ip, user_agent, method, path };
	}

	public static async extractNetworkInformation(c: Context, next: Next) {
		// retrieve all network information
		const { ip, user_agent } = await LogMiddleware.extractRequest(c);

		// set network_log_data to context
		c.set("network_log_data", { ip, user_agent });
		return next();
	}

	public static async hanzLogger(c: Context, next: Next) {
		const start = Date.now();
		const { ip, method, path } = await LogMiddleware.extractRequest(c);
	
		const time = LogHelper.formatDate(new Date());
	
		console.log(`--\n${time} <-- 🤯 Request dari IP: ${ip}`);
		console.log(`${time} <-- [REQ] ${method} ${path}`);
		
		await next();

		const duration = LogHelper.colorDuration(Date.now() - start);
		const status = LogHelper.colorStatus(c.res.status);
		const after = LogHelper.formatDate(new Date());
		
		console.log(`${after} --> [RES] ${status} ~ ${duration}`);
	};
}
