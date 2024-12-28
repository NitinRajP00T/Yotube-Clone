
const channelschema = require("../model/ChannelSchema")

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