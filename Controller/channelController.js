
const channelschema = require("../model/channelSchema")

exports.createchannel = async (req, res) => {


    const { channelId, channelName, description, subscribers } = req.body;

    if (!channelName || !channelId || !description || !subscribers) {
        return res.status(400).json({ message: "Please fill all the fields" })
    }

    try {
        // Check if ChannelId already exists 
        const existingChannel = await channelschema.findOne({ channelId });
        if (existingChannel) {
            return res.status(400).json({
                message: "ChannelId already exists. Please use a different one."
            });
        }
        const channleDetail = await channelschema.create({
            channelId,
            channelName,
            description,
            subscribers
        })
        res.status(201).json({
            Success: true,
            message: "Channel created successfully",
            channelDetail: channleDetail
        })
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            Success: false,
            message: "Error in creating channel"
        })
    }

}

//fetching the detail of the channel
exports.getchennelById=async(req,res)=>{
    try{
        const channelId=req.params.channelId;

        const id=await channelschema.findOne({channelId:channelId});
        if(!id){
            return res.status(404).json({message:"Channel not found"})
        }
        res.status(200).json({message:"Channel found",
            channelDetail:id})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error in fetching channel detail"})
    }
}







exports.ChannelDetail=async(req,res)=>{
    try{
        const {channelName}=req.body;
        const getChannel=await channelschema.findOne({channelName:channelName})
        if(!getChannel){
            return res.status(404).json({
                Success:false,
                message:"Channel not found"}
            )
        }
        res.status(200).json({
            Success:true,
            msg:"channel found",
            channel:getChannel
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            Success:false,
            msg:"internal server error"
        }
        )
    }
}