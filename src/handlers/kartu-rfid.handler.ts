import { Context } from "hono";
import { APIError } from "../utils/api-error.util";
import KartuRfidService from "../services/kartu-rfid.service";

export default class KartuRfidHandler {
	
    public static async post(c: Context) {
        const { id, nim } = await c.req.json();
		return c.json(await KartuRfidService.post(id, nim), 201);
	}

}
