const mongoose = require('mongoose');


require('dotenv').config();
const url = process.env.Mongoose_URL;
const dbConnect = () => {
    mongoose.connect(url)
        .then(() => console.log("DB are Connected"))
        .catch((err) => console.log(err))

}

module.exports = dbConnect;