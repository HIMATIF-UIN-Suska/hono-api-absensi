import { Hono } from "hono";
import { cors } from "hono/cors";
import { RegExpRouter } from "hono/router/reg-exp-router";
import { BlankEnv, BlankSchema } from "hono/types";
import GlobalHandler from "./handlers/global.handler";
import globalRoute from "./routes/global.route";
import LogMiddleware from "./middlewares/log.middleware";
import kartuRFIDRoute from "./routes/kartu-rfid.route";
import kegiatanRoute from "./routes/kegiatan.route";

// Init Hono Object and Load environment variables from .env file
const app: Hono<BlankEnv, BlankSchema, "/"> = new Hono({
  router: new RegExpRouter(),
});
const { APP_PORT }: NodeJS.ProcessEnv = process.env;

// Load all available middlewares
app.use("*", LogMiddleware.hanzLogger);

app.use("*", cors());

// Load all default routes for common handling
app.notFound(GlobalHandler.notFound);
app.onError(GlobalHandler.error);

// Load all available routes
app.route("/", globalRoute);
app.route("/", kartuRFIDRoute);
app.route("/", kegiatanRoute)

export default {
  port: APP_PORT || 5000,
  fetch: app.fetch,
};

console.log(`[INFO] Server is on fire at port ${APP_PORT}! 🔥`);
