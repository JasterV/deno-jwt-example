import { Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { AuthController } from "./controllers/mod.ts";
import { authMiddleware } from "./middlewares/mod.ts";
import { Role } from "../types/user.ts";

const { login } = AuthController;

const router = new Router();

router.post("/auth/v1/login", login);

router.get("/dummy/v1/user", authMiddleware(Role.User), (ctx) => {
  ctx.response.body = {
    success: true,
    data: "Hi User",
  };
});

router.get("/dummy/v1/admin", authMiddleware(Role.Admin), (ctx) => {
  ctx.response.body = {
    success: true,
    data: "Hi Admin",
  };
});

export default router;
