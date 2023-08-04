const express = require("express");
const cors = require("cors");

const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const app = express();


app.use(express.json());
app.use(cors());

const configuration= new Configuration({
  apiKey:process.env.OPENAI_API_KEY
})
const openai= new OpenAIApi(configuration)

app.post("/keyword",async(req,res)=>{
  const {input}=req.body
  try {
    const response =await openai.createCompletion({
      model:"text-davinci-003",
      prompt:`Write a joke on ${input}`
    })
    return res.status(200).json({
      success:true,
      data:response.data.choices[0].text
    })
  } catch (error) {
    return res.status(400).json({
      error:error.response?error.response.data:"There is no issue with server"
    })
  }
})


const port = process.env.PORT||2020;
app.listen(port,()=>console.log(`server listening to ${port}`))