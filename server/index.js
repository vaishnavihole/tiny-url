import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import shortId from 'shortid';

import UrlRecord from './models/UrlRecord.js';

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

app.post('/UrlRecord', async (req, res) => {
    const { url } = req.body;

    const urlRecord = new UrlRecord({
        fullUrl: url,
        shortUrl: shortId()
    })

    const result = await urlRecord.save();
    res.json({
        success: true,
        data: result,
        message: 'Short url created successfully'
    })
})

app.get('/:shortUrl', async (req, res) => {

    const {shortUrl} = req.params;

    const urlRecord = await UrlRecord.findOne({shortUrl});


    urlRecord.visitCount = urlRecord.visitCount + 1;

    await urlRecord.save();

    
    res.redirect(urlRecord.fullUrl);
})

app.put('/UrlRecord/:shortUrl', async (req, res) => {

    const {shortUrl} = req.params;
    const {newShortUrl} = req.body;

   await UrlRecord.updateOne({shortUrl}, {$set: {shortUrl: newShortUrl}});

   res.json({
    success: true,
    message: 'UrlRecord updated successfully'
})
})


app.listen(PORT, () => {
    console.log(`Server started listening on ${PORT}`);
})
