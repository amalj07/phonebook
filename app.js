const express = require('express');
require('dotenv').config();
const mongoClient = require('./mongoClient');
const ObjectId = require('mongodb').ObjectId;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('ok');
});

app.post('/items', async (req, res) => {
    try {
        const doc = {
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            place: req.body.place
        };
        await mongoClient.db('phonebook').collection('contacts').insertOne(doc);
        res.status(201).send('Contact created successfully');
    } catch (error) {
        console.log('Error while creating contact');
        console.log(error);
        res.status(500).send('Failed to save contact');
    }
});

app.get('/items/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const contact = await mongoClient.db('phonebook').collection('contacts').findOne({ _id: new ObjectId(id) });
        console.log(contact);
        res.status(200).send(contact);
    } catch (error) {
        console.log('Error while fetching contact');
        console.log(error);
        res.status(500).send('Failed to fetch contact');
    }
});

app.get('/items', async (req, res) => {
    try {
        const contacts = await mongoClient.db('phonebook').collection('contacts').find({}).toArray();
        console.log(contacts);
        res.status(200).send(contacts);
    } catch (error) {
        console.log('Error while fetching contacts');
        console.log(error);
        res.status(500).send('Failed to fetch contacts');
    }
});

app.put('/items/:id', async (req, res) => {
    try {

    } catch (error) {
        console.log('Error while updating contact');
        console.log(error);
        res.status(500).send('Failed to upadate contact');
    }
});

app.delete('/items/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await mongoClient.db('phonbook').collection('contacts').deleteOne({ _id: new ObjectId(id) });
        console.log(response);
        res.status(204).send();
    } catch (error) {
        console.log('Error while updating contact');
        console.log(error);
        res.status(500).send('Failed to upadate contact');
    }
});

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
