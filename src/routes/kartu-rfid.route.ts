import { Hono } from "hono";
import { RegExpRouter } from "hono/router/reg-exp-router";
import { zodError } from "../utils/zod-error.util";
import { zValidator } from "@hono/zod-validator";
import { postRfidSchema, rfidIdSchema } from "../validators/rfid.validator";
import KartuRfidHandler from "../handlers/kartu-rfid.handler";


const kartuRfidRoute = new Hono({ router: new RegExpRouter() });

kartuRfidRoute.post("/kartu-rfid", zValidator("json", postRfidSchema, zodError), KartuRfidHandler.post);
kartuRfidRoute.get("/aktivasi-kartu/:id", KartuRfidHandler.verify);
kartuRfidRoute.get("/rfid/:id", KartuRfidHandler.get);
kartuRfidRoute.get("/daftar-absensi", KartuRfidHandler.getAbsensi);
kartuRfidRoute.post("/rfid/absensi", zValidator("json", rfidIdSchema, zodError), KartuRfidHandler.absensi);


export default kartuRfidRoute;