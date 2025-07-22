import { Hono } from "hono";
import { RegExpRouter } from "hono/router/reg-exp-router";
import KartuRfidHandler from "../handlers/kartu-rfid.handler";

const kegiatanRoute = new Hono({ router: new RegExpRouter() });

kegiatanRoute.post("/kegiatan", KartuRfidHandler.postKegiatan);

export default kegiatanRoute;
