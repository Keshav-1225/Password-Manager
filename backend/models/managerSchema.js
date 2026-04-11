import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const managerSchema = new mongoose.Schema(
    {
        _id:{type:String,default:uuidv4},
        site: { type: String, required: true, trim: true },
        username: { type: String, required: true, trim: true },
        password: { type: String, required: true, trim: true }

    }
);
export default mongoose.model("PasswordManager",managerSchema)