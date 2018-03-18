import Koa from "koa";

import connectors from "./connectors";

connectors();

const app = new Koa();

app.use(async ctx => {
    ctx.body = "default context";
});

export default app;