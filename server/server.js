const express = require('express')
const app = express()

const port = 5000
const cors = require("cors")
app.use(cors())
const mongoose = require("mongoose");

async function main(){
    mongoose.connect( "mongodb://localhost:27017/Quizapp");

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo Db Connection Successful");
});

connection.on("error", (err) => {
  console.log("Mongo Db Connection Failed");
});
const questionsSchema=new mongoose.Schema({
  prompt:String,
  optionA:String,
  optionB:String,
  optionC:String,
  optionD:String,
  answer:String,
  id:Number

})
const Questions=mongoose.model("question",questionsSchema)

app.route("/quiz/:id").get(async (req,res)=>{
    fetchid=req.params.id
    Questions.find(({id:fetchid}),function(err,val){
        // res.send(val);
        if(err)
        {
            res.send("Error")
        }else{
        if(val.length==0)
        {
            res.send("data does not exists")
        }
        else{
            res.send(val);
        }
    }
    })
})
app.route("/quiz").get(async (req,res) => {
  res.send(await Questions.find({}) )
}

)

}
main().catch(err => console.log(err))




// const dbconfig=require('./config/dbconfig')
// require('dotenv').config();
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})