import dotenv from "dotenv";

dotenv.config();

const ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 8080;
const SECRET = process.env.SECRET;

const URI_MONGO = process.env.URI_MONGO;

export { URI_MONGO, ENV, PORT, SECRET }