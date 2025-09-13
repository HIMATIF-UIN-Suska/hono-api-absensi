import { Hono } from "hono";
import { RegExpRouter } from "hono/router/reg-exp-router";
import KegiatanHandler from "../handlers/kegiatan.handler";

const kegiatanRoute = new Hono({ router: new RegExpRouter() });

kegiatanRoute.post("/web/kegiatan", KegiatanHandler.postKegiatan);
kegiatanRoute.get("/web/kegiatan", KegiatanHandler.getKegiatan);

export default kegiatanRoute;
