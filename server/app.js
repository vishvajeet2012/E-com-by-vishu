const { default: mongoose } = require('mongoose');

const app = require('express') ();
const http =require('http').Server(app)
     const user=   require('./model/userModel')


mongoose.connect("mongodb+srv://vishvajeet:uXTojr4GzxugWrfR@e-com.zfi1v.mongodb.net/?retryWrites=true&w=majority&appName=E-com")


    async function insert() {
        await user.create({
        name:'vishu',
        email: "vishu@vishu.com"
         }) }
         insert()

http.listen(5000 ,function(){
    console.log("server is the running ")
})
    