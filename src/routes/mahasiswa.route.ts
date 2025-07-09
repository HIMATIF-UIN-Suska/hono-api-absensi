import { Hono } from "hono";
import { RegExpRouter } from "hono/router/reg-exp-router";
import { zodError } from "../utils/zod-error.util";
import { zValidator } from "@hono/zod-validator";
import MahasiswaHandler from "../handlers/mahasiswa.handler";
import AuthMiddleware from "../middlewares/auth.middleware";
import { postMahasiswaSchema } from "../validators/mahasiswa.validator";

const mahasiswaRoute = new Hono({ router: new RegExpRouter() });

mahasiswaRoute.get("/me/mahasiswa", AuthMiddleware.JWTBearerTokenExtraction,MahasiswaHandler.getMe);
mahasiswaRoute.get("/mahasiswa", MahasiswaHandler.getAll);
mahasiswaRoute.get("/mahasiswa/:nim", MahasiswaHandler.get);
mahasiswaRoute.post("/mahasiswa", zValidator("json", postMahasiswaSchema, zodError), MahasiswaHandler.post);
mahasiswaRoute.put("/mahasiswa/:nim", MahasiswaHandler.put);
mahasiswaRoute.delete("/mahasiswa/:nim", MahasiswaHandler.delete);

export default mahasiswaRoute;