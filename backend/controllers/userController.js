import managerSchema from "../models/managerSchema.js";

export const createData = async(req,res)=>{
    try
    {
        let data = await managerSchema.create(req.body)
        return res.status(201).json({message:"Data Created",data})
    }catch(err)
    {
        return res.status(500).json({message: "Failed to create data[controllers]",ErrorMessage:err.message})
    }
}

export const fetchData = async (req,res) => {
    try
    {
        let data = await managerSchema.find()
        return res.json({message:"ok",data})
    }catch(err)
    {
        return res.status(500).json({message:"Data not found[controller/fetchData]",ErrorMessage:err.message})
    }
}

export async function updateData(req,res) {
    try
    {
        const updatedData = await managerSchema.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
        if(!updatedData)
        {
            return res.status(404).json({message:"Data not found"})
        }
        return res.status(200).json({message:"Data Updated successfully",updatedData})
    }catch(err)
    {
        return res.status(500).json({message:"Error in update[controllers/updateData]",ErrorMessage:err.message})
    }
}

export async function deleteData(req,res) {
    try
    {
        const deletedData = await managerSchema.findByIdAndDelete(req.params.id)
        if(!deletedData)
        {
            return res.status(404).json({message:"Data not Found"})
        }
        return res.status(200).json({message:"Data deleted successfully",deletedData})
    }catch(err)
    {
        return res.status(500).json({message:"Error while deleting the data [controllers/deleteData]",ErrorMessage:err.message})
    }
}