import app from "./app";
import { PORT } from "../config";

const server = app.listen(PORT, err => {
    if (err) console.log(err);
    console.log(`serv running on: ${PORT}`);
});

export default server;