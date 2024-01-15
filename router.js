const express = require('express');
const mongoRepo = require('./mongoRepo');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const contacts = await mongoRepo.getContacts();
        res.status(200).send(contacts);
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to fetch contacts');
    }
});


router.post('/', async (req, res) => {
    try {
        const result = await mongoRepo.addContact(req.body);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to save contact');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const contact = await mongoRepo.getSingleContact(req.params.id);
        res.status(200).send(contact);
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to fetch contact');
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const result = await mongoRepo.updatedContact(req.body, req.params.id);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to upadate contact');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const response = await mongoRepo.deleteContact(req.params.id);
        if (response) {
            res.status(204).send('contact deleted');
        } else {
            res.status(404).send('No contact found.');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to upadate contact');
    }
});

module.exports = router;