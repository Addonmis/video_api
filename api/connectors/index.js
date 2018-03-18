import maria_connector, { maria } from "./mariadb";
import mongo_connector from "./mongodb";
import server from "../server";

async function connectors(){
    try{
        await maria_connector();
        await mongo_connector();
    } catch(err){
        server.close();
        console.log(err);
    }
};

export { maria, mongo_connector };

export default connectors;