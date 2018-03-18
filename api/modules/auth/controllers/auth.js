import bcrypt from "bcrypt-as-promised";
import jwt from "jsonwebtoken";

import { SECRET } from "../../../config/index";
import { maria } from "../../../connectors";
import validation from "../../../services/auth_validator";

export const sign_in = async (ctx) => {

    const {username, password} = ctx.request.body;

    if (!validation(username, password).isValid){
        ctx.throw(401, {
            message: validation(username, password).error
        });
    }

    const user = await maria.query("select user_id, username, password, role_id from users where username = ?;", [username]).then((rows) => rows);

    if (!user.length){
        ctx.throw(400, {
            message: "user not found"
        });
    }

    try{
        const result = await bcrypt.compare(password, user[0].password);
    } catch(e){
        ctx.throw(400, {
            message: "wrong password"
        });
    }

    const token = jwt.sign({_id: user[0].user_id}, SECRET);
    ctx.body = {token: token, user_role: user[0].role_id};

};

export const sign_up = async (ctx) => {

    const {username, password} = ctx.request.body;
    
    let user;
    
    if (!validation(username, password).isValid){
        ctx.throw(401, {
            message: validation(username, password).error
        });
    }

    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await maria.query("insert into users(username, password, role_id) values(?, ?, ?);", [username, hash, 4]);
        user = await maria.query("select user_id, username, password, role_id from users order by user_id desc limit 1;").then((rows) => rows);
    } catch(error){
        ctx.throw(400, {
            message: error.toString()
        });
    }

    const token = jwt.sign({_id: user[0].user_id}, SECRET);
    ctx.body = {token: token, user_role: user[0].role_id};

};