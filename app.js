const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoClient = require('./mongoClient');
const ObjectId = require('mongodb').ObjectId;
const router = require('./route')

const app = express();

app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.status(200).send('ok');
});

app.post('/contact', async (req, res) => {
    try {
        const doc = {
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            place: req.body.place
        };
        await mongoClient.db('phonebook').collection('contacts').insertOne(doc);
        res.status(201).send(doc);
    } catch (error) {
        console.log('Error while creating contact');
        console.log(error);
        res.status(500).send('Failed to save contact');
    }
});

app.get('/contact/:id', async (req, res) => {
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

app.get('/contact', async (req, res) => {
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

app.patch('/contact/:id', async (req, res) => {
    try {
        const { name, email, number, place } = req.body;
        const updatedContact = {
            ...(name != undefined && { name }),
            ...(email != undefined && { email }),
            ...(number != undefined && { number }),
            ...(place != undefined && { place })
        };

        const result = await mongoClient.db('phonebook').collection('contacts').findOneAndUpdate({ _id: new ObjectId(req.params.id) }, {
            $set: {
                ...updatedContact
            }
        }, {
            returnDocument: 'after'
        });

        res.status(200).send(result)
    } catch (error) {
        console.log('Error while updating contact');
        console.log(error);
        res.status(500).send('Failed to upadate contact');
    }
});

app.delete('/contact/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await mongoClient.db('phonebook').collection('contacts').deleteOne({ _id: new ObjectId(id) });
        if (response.deletedCount == 1) {
            res.status(204).send('contact deleted');
        } else {
            res.status(404).send('No contact found.');
        }
    } catch (error) {
        console.log('Error while updating contact');
        console.log(error);
        res.status(500).send('Failed to upadate contact');
    }
});

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
