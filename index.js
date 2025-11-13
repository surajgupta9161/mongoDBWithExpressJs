const express = require("express")
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const chat = require("./models/chat")
const methodOverride = require("method-override");

main().then(() => console.log("Connection success")).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsApp');
}
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))

app.listen(8080, () => {
    console.log("Listing by port 8080");
})

app.get("/", (req, res) => {
    res.send("Root is working")
})

//index route

app.get("/chats", async (req, res) => {
    let chats = await chat.find();
    // console.log(chats);
    res.render("index.ejs", { chats })
})

//new route

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

//save chat in db
app.post("/chats", (req, res) => {
    let { from, message, to } = req.body;
    // console.log(from, message, to);
    let newChat = new chat({
        from: from,
        to: to,
        message: message,
        created_at: new Date(),
    })
    newChat.save().then(data => { console.log("Saved") }).catch(err => { console.log(err) })
    res.redirect("/chats")
})

//Edit route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let editChat = await chat.findById(id);
    res.render("edit.ejs", { editChat })
})

//update route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { message } = req.body;
    let updatedChat = await chat.findByIdAndUpdate(id, { message: message }, { runValidators: true, new: true })
    console.log(updatedChat);
    res.redirect("/chats");
})

//delete route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedChat = await chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

// const chat1 = new chat({
//     from: "Suraj",
//     to: "Gopal",
//     message: "Change The room",
//     created_at: new Date(),
// });

// chat1.save().then(data => console.log(data)).catch(err => console.log(err))

// chat.findOneAndUpdate({ from: "Suraj" }, { message: "Change The Room" }).then(data => console.log(data)).catch(err => console.log(err));