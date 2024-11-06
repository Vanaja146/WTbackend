// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/bubbleGameDB', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("MongoDB connected");
//     } catch (error) {
//         console.error("MongoDB connection failed", error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/bubbleGameDB');
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed", error);
        process.exit(1);
    }
};

module.exports = connectDB;

