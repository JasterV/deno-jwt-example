import { config } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";

const env = config({ safe: true });

env.PORT = env.PORT || "3000";

export default env;
