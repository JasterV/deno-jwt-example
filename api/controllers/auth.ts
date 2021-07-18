import { RouterContext } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { User } from "../../types/user.ts";
import { LoginReq } from "../../types/loginRequest.ts";
import { create, getNumericDate } from "https://deno.land/x/djwt@v2.2/mod.ts";
import config from '../../config/mod.ts'

const text = await Deno.readTextFile("data/users.json");
const users: User[] = JSON.parse(text);

// @description Get all products
// @route GET /api/v1/products
const login = async ({ response, request }: RouterContext) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = { success: false, data: "Empty body" };
    return;
  }

  const { username, password }: LoginReq = await body.value;

  const user = users.find((u) =>
    u.name === username && u.password === password
  );

  if (!user) {
    response.status = 401;
    response.body = { success: false, data: "Wrong username/password" };
    return;
  }

  const jwt = await create({ alg: "HS512", typ: "JWT" }, {
    id: user.id,
    role: user.role,
    exp: getNumericDate(60 * 60),
  }, config.SECRET);

  response.body = { success: true, data: jwt };
};

export default { login };
