import { Hono } from "hono";
import { RegExpRouter } from "hono/router/reg-exp-router";
import { zodError } from "../utils/zod-error.util";
import { zValidator } from "@hono/zod-validator";
import MahasiswaHandler from "../handlers/kartu-rfid.handler";
import { postRfidSchema } from "../validators/rfid.validator";


const kartuRfidRoute = new Hono({ router: new RegExpRouter() });

kartuRfidRoute.post("/kartu-rfid", zValidator("json", postRfidSchema, zodError), MahasiswaHandler.post);

export default kartuRfidRoute;