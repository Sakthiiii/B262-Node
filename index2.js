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

  const users=[
    {
    "createdAt": "2021-10-01T00:49:47.780Z",
    "name": "Bennie Aufderhar",
    "avatar": "https://cdn.fakercloud.com/avatars/d_kobelyatsky_128.jpg",
    "age": 59,
    "color": "silver",
    "id": "5"
    },
    {
    "createdAt": "2021-09-30T14:22:51.638Z",
    "name": "Lana Witting",
    "avatar": "https://cdn.fakercloud.com/avatars/afusinatto_128.jpg",
    "age": 77,
    "color": "olive",
    "id": "6"
    },
    {
    "createdAt": "2021-09-30T18:01:06.642Z",
    "name": "Vickie Brekke",
    "avatar": "https://cdn.fakercloud.com/avatars/carlyson_128.jpg",
    "age": 80,
    "color": "tan",
    "id": "7"
    },
    {
    "createdAt": "2021-09-30T09:39:22.586Z",
    "name": "Al Runolfsdottir",
    "avatar": "https://cdn.fakercloud.com/avatars/areus_128.jpg",
    "age": 28,
    "color": "orange",
    "id": "8"
    },
    {
    "createdAt": "2021-09-30T18:22:41.955Z",
    "name": "Sam Orn",
    "avatar": "https://cdn.fakercloud.com/avatars/itolmach_128.jpg",
    "age": 49,
    "color": "indigo",
    "id": "9"
    },
    {
    "createdAt": "2021-09-30T18:30:05.224Z",
    "name": "Grace Grimes",
    "avatar": "https://cdn.fakercloud.com/avatars/smalonso_128.jpg",
    "age": 72,
    "color": "yellow",
    "id": "10"
    },
    {
    "createdAt": "2021-09-30T11:26:57.667Z",
    "name": "Cindy Reinger",
    "avatar": "https://cdn.fakercloud.com/avatars/vimarethomas_128.jpg",
    "age": 30,
    "color": "yellow",
    "id": "11"
    },
    {
    "createdAt": "2021-10-01T06:26:55.203Z",
    "name": "Beth Koelpin",
    "avatar": "https://cdn.fakercloud.com/avatars/anatolinicolae_128.jpg",
    "age": 0,
    "color": "purple",
    "id": "12"
    },
    {
    "createdAt": "2021-09-30T12:28:17.426Z",
    "name": "Doug Mayer",
    "avatar": "https://cdn.fakercloud.com/avatars/nerrsoft_128.jpg",
    "age": 25,
    "color": "cyan",
    "id": "13"
    },
    {
    "createdAt": "2021-10-01T01:09:41.654Z",
    "name": "Mrs. Garrett Becker",
    "avatar": "https://cdn.fakercloud.com/avatars/increase_128.jpg",
    "age": 20,
    "color": "yellow",
    "id": "14"
    }
    ]

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