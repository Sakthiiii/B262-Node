//const { response } = require("express");
///const express = require ("express");
import  express  , {response} from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv"

//const { request } = require("http");
const app =express ();
dotenv.config();
const PORT = process.env.PORT;


app.get ("/",(response,request)=>{
    request.send ("Hello sakthi");
});

app .use (express.json());

// 

async function createConnection(){
    const MONGO_URL= process.env.MONGO_URL;
    const client = new MongoClient (MONGO_URL);
    await client .connect();
    console.log ("Successfully complete");
   const insert =await client .db ("users").collection ("people").insertMany(users);
     return client;
     //const user = await client .db ("users").collection ("people").findOne ({id :"8"});
     //console.log (user);
}
 //createConnection();

app.get ("/users",(response, request)=>{
    request.send (users); 
});
app.get ("/users/:id", async (request,response)=>{
   console.log (request.params);
   const { id } = request .params ;
 const client = await createConnection()
   const user = await client .db ("users").collection("people").findOne ({id:id});

    console.log (user);
    response.send (user);

});
app.delete ("/users/:id", async (request,response)=>{
    console.log (request.params);
    const { id } = request .params ;
  const client = await createConnection();

    const user = await client .db ("users")
    .collection("people")
    .deleteOne ({id:id});
 
     console.log (user);
     response.send (user);
 
 });
 app.patch ("/users/:id", async (request,response)=>{
    console.log (request.params);
    const { id } = request .params ;
  const client = await createConnection();
  console.log (id,request .body);
    const newdata =request.body;

    const user = await client .db ("users")
    .collection("people")
    .updateOne ({id:id}, {$set :newdata});
 
     console.log (user);
     response.send (user);
 
 });
app.get ("/users", async (request,response)=>{

  const client = await createConnection();
    const users = await client .db ("users").collection("people").find ({}).toArray;
 
     console.log (users);
     response.send (users);
    
});

app.post ("/users", async (request,response)=>{

 const client = await createConnection();
    
const addUsers =request .body ;
console.log(addUsers)

     const result = await client .db ("users").collection("people").insertMany(addUsers);
 
     console.log (addUsers,result);
     response.send (result);
    
});



//     const { color,age  } = request.query;
//     console.log (request.query,color,age);

// if(!color && !age){
//     response.send(users);
// }
// else if (color && !age){
//     response.send (users.filter((user)=> user.color === color));
// }
// else if (!color && age){
//     response.send (users.filter((user)=> user.age >= age));
// } else {
//     response.send (users.filter((user)=> user.color === color && user.age >= age));
// }
    
 


app.listen (PORT,()=> console.log ("Successfully Complete",PORT));