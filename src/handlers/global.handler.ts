import { Context } from "hono";
import { BlankEnv, BlankInput, HTTPResponseError } from "hono/types";
import GlobalService from "../services/global.service";
import { GlobalServiceHealthResponse, GlobalServiceIntroduceResponse } from "../types/global.type";

export default class GlobalHandler {

    public static async introduce(c: Context<BlankEnv, "/", BlankInput>) {
        const introduceMessage: GlobalServiceIntroduceResponse = await GlobalService.introduce();
        return c.json(introduceMessage, 200);
    }

    public static async health(c: Context<BlankEnv, "/", BlankInput>) {
        const healthMessage: GlobalServiceHealthResponse = await GlobalService.health();
        return c.json(healthMessage, 200);
    }

    public static async notFound(c: Context<BlankEnv, any, {}>) {
        return c.json(
            {
                response: false,
                message: "Waduh, mau nyari apa kamu mas? 😅",
            },
            404
        );
    }
    
    public static async error(err: Error | HTTPResponseError | any, c: Context<BlankEnv, any, {}>) {
        if (!err.statusCode) {
            console.error(`🤯 [ERROR] - [${(new Date()).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB] ${err.message}`);
            console.error(`😫 [LOG] ${err.stack}`);
            return c.json(
                {
                    response: false,
                    message: "Waduh, ada yang error nih di-server kami! 😭",
                },
                500
            );
        }
        return c.json(
            {
                response: false,
                message: err.message,
            },
            err.statusCode || 500
        );
    }

}