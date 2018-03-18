import mongoose from "mongoose";

import { URI_MONGO } from "../../config";

mongoose.Promise = Promise;

async function mongo_connector(){
    if (!URI_MONGO){
        throw Error("mongo uri is not defined");
    }
    
    return mongoose
        .connect(URI_MONGO).then((mongodb) => {
            console.log("mongo connect"); 
            return mongodb
        })
};

export default mongo_connector;