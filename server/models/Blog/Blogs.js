import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        blogName : {
            type: String,
            require:true,
        },
        blogBody:{
            type: String,
            require: true,
        },
        userId :{
            type: String,
            require:true,
        }
    },{
        timestamps: true,
    }
)

const blogModel = new mongoose.model("blogs", blogSchema);

export default blogModel;