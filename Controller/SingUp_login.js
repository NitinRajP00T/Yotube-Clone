//registing-user creating user

const singUp = require("../model/SingUp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser")


require('dotenv').config();
exports.createSingup = async (req, res) => {
    try {
        const { username, email, password, img } = req.body;

        // Validate required fields
        if (!username || !password || !email) {
            return res.status(400).json({
                success: false,
                msg: "Please fill all the required fields",
            });
        }

        // Check if the user already exists
        const isPresent = await singUp.findOne({ email: email });
        if (isPresent) {
            return res.status(400).json({
                success: false,
                msg: "User already exists",
            });
        }

        // Hash the password
        const hashpass = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await singUp.create({
            username,
            password: hashpass,
            email,
            img: img || `https://api.dicebear.com/5.x/initials/svg?seed=${username}`,
        });

        res.status(201).json({
            success: true,
            msg: "User created successfully",
            user: newUser,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });
    }

}

exports.getUser = async (req, res) => {
    try {
        const user = await singUp.find();
        res.status(200).json({
            succes: true,
            msg: "user Find Succesfully",
            user: user
        })

    }
    catch{
res.status(400).json({
    succes:false,
    msg:"User is NOt Found"
})
    }
}



//login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                succes: false,
                msg: "email and pass are required"
            })
        }

        let loginUser = await singUp.findOne({ email:email });
        if (!loginUser) {
            return res.status(400).json({
                succes: false,
                msg: "User are not Registrated"
            })
        }
        // let matchedPass=await bcrypt.compare(password,hasspass)
        let matchedPass = await bcrypt.compare(password, loginUser.password);
        if (matchedPass) {
            const payload = {
                name: loginUser.username,
                email: loginUser.email,
                _id: loginUser._id,
                img: loginUser.img
            }
            const options = {
                httpOnly: true,
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
            }
            let token = jwt.sign(payload, process.env.SCREATE_key);
            res.cookie("token", options, token).status(200).json({
                succes: true,
                msg: "Login Succesfully",
                token: token
            })

        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            succes: false,
            msg: "User are not Registrated"
        })
    }
}