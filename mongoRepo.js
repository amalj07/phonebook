const mongoClient = require('./mongoClient');
const db = mongoClient.db('phonebook');

async function addContact(data) {
    try {
        const doc = {
            name: data.name,
            email: data.email,
            number: data.number,
            place: data.place
        };
        await db.collection('contacts').insertOne(doc);
        return doc;
    } catch (error) {
        console.log('addContact: Error while creating contact');
        throw error;
    }
}

async function getContacts() {
    try {
        const contacts = await db.collection('contacts').find({}).toArray();
        console.log(contacts);
        return contacts;
    } catch (error) {
        console.log('Error while fetching contacts');
        throw error;
    }
};


async function getSingleContact() {
    try {
        const id = req.params.id;
        const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
        console.log(contact);
        return contact;
    } catch (error) {
        console.log('Error while fetching contact');
        throw error;
    }
}

async function updatedContact(data) {
    try {
        const { name, email, number, place } = data;
        const updatedContact = {
            ...(name != undefined && { name }),
            ...(email != undefined && { email }),
            ...(number != undefined && { number }),
            ...(place != undefined && { place })
        };

        const result = await db.collection('contacts').findOneAndUpdate({ _id: new ObjectId(req.params.id) }, {
            $set: {
                ...updatedContact
            }
        }, {
            returnDocument: 'after'
        });

        return result;
    } catch (error) {
        console.log('Error while updating contact');
        throw error;
    }
}

async function deleteContact(id) {
    try {
        const response = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });
        if (response.deletedCount == 1) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log('Error while updating contact');
        throw error;
    }
}

module.exports = {
    addContact,
    getContacts,
    getSingleContact,
    updatedContact,
    deleteContact
};