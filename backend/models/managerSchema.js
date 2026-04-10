import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const managerSchema = new mongoose.Schema(
    {
        _id:{type:String,default:uuidv4()},
        site: String,
        username: String,
        password: String
    }
);
export default mongoose.model("PasswordManager",managerSchema)