const { v4: uuid } = require('uuid');
const pgClient = require('./pgClient');

async function addContact(data) {
    try {
        const id = uuid();
        const statement = 'INSERT INTO contacts(name, email, number, place) VALUES($1, $2, $3, $4) RETURNING *;';
        const values = [id, ...data];
        const response = await pgClient.query(statement, values);
        return response.rows;
    } catch (error) {
        console.log('addContact: Error while creating contact');
        throw error;
    }
}

async function getContacts() {
    try {
        const statement = 'SELECT * FROM contacts;';
        const response = await pgClient.query(statement);
        return response.rows;
    } catch (error) {
        console.log('Error while fetching contacts');
        throw error;
    }
};


async function getSingleContact() {
    try {
        const statement = 'SELECT * FROM contacts WHERE id = $1';
        const values = [req.params.id];
        const response = await pgClient.query(statement, values);
        return response.rows;
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