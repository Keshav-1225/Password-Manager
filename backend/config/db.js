import mongoose from "mongoose";

export default async function database()
{
    try
    {
        await mongoose.connect(process.env.DB_CONNECTION_URI)
        console.log("MongoDB Connection Established!");
    }catch(err)
    {
        console.log("Error Occured while connecting to the Database[config]");
        console.log("Error Message: ");
        console.log(err);
        process.exit(1); //Stop app on failure
    }
}
