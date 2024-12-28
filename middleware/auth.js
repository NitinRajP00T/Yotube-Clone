//verification ka code

const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = async (req, res) => {
    try {
        const token = req.cookie.body;
        if (!token || token == undefined) {
            return res.status(400).json({
                succes: false,
                msg: "TOkne is missing"
            })
        }
        try {

            const payload = jwt.verify(token, process.env.SCREATE_key);
            req.user = payload;
        }
        catch (err) {
            res.status(400).json({
                succes: false,
                msg: "token is mismatched"
            })
        }
        next();
    }
    catch (err) {
        res.status(500).json({
            succes: false,
            msg: "Internal Server Error"
        })

    }
}