import express from 'express'
import path from 'path'
// import cors from 'cors'

import mongoose from 'mongoose';

// const cors = require("cors");


import cors from 'cors'




const app = express();
app.use(express.json());

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions)) 
 
const port = process.env.PORT || 3000 ;



const mongodbUri = 'mongodb+srv://bijo:TfE68elk91rxn7zV@cluster0.gbjr68m.mongodb.net/gamedata';

mongoose.connect(mongodbUri);

const sch = {
    name:String,
    email:String,
    id:Number,
}

const monmodel = mongoose.model("NEWCOL",sch);

app.post("/post",async(req,res)=>{
    console.log("inside post function");

    const data = new monmodel({
        name:req.body.name,
        email:req.body.email,
        id:req.body.id,
    })

    const val = await data.save();
    res.json(val);


})






// const sch={
// name:String,
// email: String,
// id:Number,
// }


// let gameSchema = new mongoose.Schema({
//     name:String,
//     email: String,
//     id:Number
// })

// const monmodel = model("NEWCOL",gameSchema);

// app.post('/post', (req, res) => {

//     const body = req.body;

//     if(
//         !body.name ||
//         !body.email ||
//         !body.id
//     ){
//         res.status(400).send(`required parameter missing`)
//         return;
//     }

//     monmodel.create({

//         name:body.name,
//         email: body.email,
//         id:body.id,
//     },
//         (err, saved) => {
//             if (!err) {
//                 console.log(saved);

//                 res.send({
//                     message: "your data is saved"
//                 })
//             } else {
//                 res.status(500).send({
//                     message: "server error"
//                 })
//             }
//         })

        // app.get('/getdatas', (req, res) => {

        //     monmodel.find({}, (err, data) => {
        //         if (!err) {
        //             res.send({
        //                 message: "here is you todo list",
        //                 data: data
        //             })
        //         } else {
        //             res.status(500).send({
        //                 message: "server error"
        //             })
        //         }
        //     });
        // })


        // app.get('/getdata/:id', (req, res) => {

        //     const id = req.params.id;

        //     monmodel.findOne({_id:id}, (err, data) => {
        //         if (!err) {

        //             if(data){
        //                 res.send({
        //                     message: "here is you todo list",
        //                     data: data
        //                 })
        //             }else{
        //                 res.status(404).send({
        //                     message: "id not found"
        //                 })
        //             }
                    

        //         } else {
        //             res.status(500).send({
        //                 message: "server error"
        //             })
        //         }
        //     });
        // })


        

// })





// app.get('/water', (req, res) => {
//   console.log(`${req.ip} is asking for water`);
//   res.send('Have some water');
// })

// app.get('/food', (req, res) => {
//     console.log(`${req.ip} is asking for food`) ;
//     res.send('Have some food');
//   })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

// 10.187.27.14

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////