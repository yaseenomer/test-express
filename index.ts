import express, { json } from "express";
import mongoose from "mongoose";

import cors from "cors"


import { todoRouter } from "./routes/todo";

 
const MONGO_PASSWORD = "1jv2SZxLjrxo25wW"

const MONGO = `mongodb+srv://nft-test:${MONGO_PASSWORD}@nft-test.ykhf7.mongodb.net/?retryWrites=true&w=majority`


const app = express();

app.use(cors())

app.use(json())

const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello from test-express");
});


app.use('/todos', todoRouter)


const start = async  () => {
    

   

    try {
      await mongoose.connect(MONGO)
      console.log("mongo db conected sussfull")
    } catch (err) {

      console.log("error conect mongo")
          }


  app.listen(port, () => {
    console.log(`test-express listening at http://localhost:${port}`);
  });
  
}

start()


