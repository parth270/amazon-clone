const functions = require("firebase-functions");

const express = require("express");

const cors=require("cors");

const stripe=require("stripe")('sk_test_51J8OruSAJSO5Ac0ItvJ2bsUvAGYhxRIwrzMGQuzggjUh7gaxW4Zf0O2IiQ8dlaPy9YIIiFQPgMNJXklE7Tc2gmk500m7WvGDzi');

//api 

//app config

const app=express();

//middlewasres
app.use(cors({origin:true}));
app.use(express.json());
//API routes
app.get('/',(request,response) => response.status(200).send('Namaste World'));

app.post('/payments/create',async(request,response)=>{
    const total=request.query.total;

    console.log('payment request recieved BOOM!!',total);

    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,//subunits of the currency
        currency:'usd',
    });
    //ok- created
    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
});

//listen command
exports.api = functions.https.onRequest(app);

//example endpoint
//http://localhost:5001/clone-8e97f/us-central1/api