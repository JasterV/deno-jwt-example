import app from './api/server.ts'
import config from './config/mod.ts'

await app.listen(`127.0.0.1:${config.PORT}`);