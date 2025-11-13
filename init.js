const mongoose = require("mongoose");
const chat = require("./models/chat")
main().then(() => console.log("Connection success")).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsApp');
}

let allChats = [
    {
        from: "Gopal",
        to: "Suraj",
        message: "Maine dhayan nhi dya",
        created_at: new Date(),
    },
    {
        from: "Naresh",
        to: "Ajeet",
        message: "Mene kuch nhi bola",
        created_at: new Date(),
    },
    {
        from: "Ajeet",
        to: "Naresh",
        message: "You need to pay all money",
        created_at: new Date()
    }
]

chat.insertMany(allChats);