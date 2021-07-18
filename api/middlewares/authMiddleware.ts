import { RouterContext } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { Payload, verify } from "https://deno.land/x/djwt@v2.2/mod.ts";
import { BEARER } from "../../constants.ts";
import { Role } from "../../types/user.ts";
import config from '../../config/mod.ts'

export default (expectedRole: Role) =>
  async (
    { response, request }: RouterContext,
    next: () => Promise<unknown>
  ) => {
    const authHeader: string | null = request.headers.get("authorization");

    if (!authHeader) {
      response.status = 403;
      response.body = { success: false, msg: "Unauthorized" };
      return;
    }

    const token = authHeader.split(BEARER)[1];

    const payload: Payload | null = await verify(token, config.SECRET, "HS512")
      .catch(() => null);

    if (!payload) {
      response.status = 403;
      response.body = { success: false, msg: "Unauthorized" };
      return;
    }

    const role = payload["role"];

    if (role != Role.Admin && role != expectedRole) {
      response.status = 403;
      response.body = { success: false, msg: "Unauthorized" };
      return;
    }

    await next();
  };
