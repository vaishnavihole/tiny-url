import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import shortId from 'shortid';

import UrlShorts from './models/UrlShorts.js';


dotenv.config();

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 5000
async function connectDB() {
    const connection = await mongoose.connect(process.env.MONGO_DB_URL)
    if (connection) {
        console.log('connected to mongoDB');
    }
}
connectDB();

app.get('/shortUrls', async (req, res) => {
    const shortUrls =  await UrlShorts.find();

    res.json({
      success: true,
      message: "shortUrls fetched successfully",
      data: shortUrls
    })
 
 })

 app.post('/shortUrls', async (req, res) => {
    const { full } = req.body;

    const newUrl  = new UrlShorts({
      full,
    })

    const savedUrls = await newUrl.save();

    res.json({
        success: true,
       message: "shortUrls created successfully",
       data: savedUrls
        
 })
})
 

app.listen(PORT, () => {
    console.log(`Server started listening on ${PORT}`);
})