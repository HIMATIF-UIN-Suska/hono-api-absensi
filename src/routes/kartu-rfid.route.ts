import { Hono } from "hono";
import { RegExpRouter } from "hono/router/reg-exp-router";
import { zodError } from "../utils/zod-error.util";
import { zValidator } from "@hono/zod-validator";
import { postRfidSchema, rfidIdSchema } from "../validators/rfid.validator";
import KartuRFIDHandler from "../handlers/kartu-rfid.handler";

const kartuRfidRoute = new Hono({ router: new RegExpRouter() });

kartuRfidRoute.get("/rfid/:id", KartuRFIDHandler.get);
kartuRfidRoute.post("/kartu-rfid", zValidator("json", postRfidSchema, zodError), KartuRFIDHandler.post);
kartuRfidRoute.post("/rfid/absensi", zValidator("json", rfidIdSchema, zodError), KartuRFIDHandler.absensi);
kartuRfidRoute.get("/aktivasi-kartu/:id", KartuRFIDHandler.verify);
kartuRfidRoute.get("/daftar-absensi", KartuRFIDHandler.getAbsensi);

export default kartuRfidRoute;