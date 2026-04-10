import managerSchema from "../models/managerSchema.js";

export const createData = async(req,res)=>{
    try
    {
        let data = await managerSchema.create(req.body)
        return res.status(201).json({message:"Data Created",data})
    }catch(err)
    {
        return res.status(500).json({message: "Failed to create data[controllers]",err})
    }
}

export const fetchData = async (req,res) => {
    try
    {
        let data = await managerSchema.find()
        return res.json({message:"ok"})
    }catch(err)
    {
        console.log(err);
    }
}

export async function updateData(req,res) {
    
}