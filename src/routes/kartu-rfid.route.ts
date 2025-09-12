import { Hono } from "hono";
import { RegExpRouter } from "hono/router/reg-exp-router";
import { zodError } from "../utils/zod-error.util";
import { zValidator } from "@hono/zod-validator";
import { postRfidSchema, rfidIdSchema } from "../validators/rfid.validator";
import KartuRFIDHandler from "../handlers/kartu-rfid.handler";

const kartuRFIDRoute = new Hono({ router: new RegExpRouter() });

// for IoT
kartuRFIDRoute.get("/iot/rfid/:id", KartuRFIDHandler.get);
kartuRFIDRoute.post("/iot/rfid", zValidator("json", postRfidSchema, zodError), KartuRFIDHandler.post);
kartuRFIDRoute.post("/iot/rfid/absensi", zValidator("json", rfidIdSchema, zodError), KartuRFIDHandler.absensi);

// for web-based-public
kartuRFIDRoute.get("/public/web/rfid/aktivasi/:id", KartuRFIDHandler.verify);

// for web-based-protected
kartuRFIDRoute.get("/web/rfid/absensi", KartuRFIDHandler.getAbsensi);

export default kartuRFIDRoute;