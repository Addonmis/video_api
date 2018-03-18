import Router from "koa-router";
import * as auth_controller from "./controllers/auth";
// import check_user from "../../middlewares/check_user";

const router = new Router({prefix: "/auth"});

router
    .post("/signin", auth_controller.sign_in)
    .post("/signup", auth_controller.sign_up)
    // .post("/token", check_user(), (ctx) => {ctx.body = ctx.state.user;})

export default router.routes();