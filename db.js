const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});


(async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB.');
        return client;
    } catch (error) {
        console.log('Failed to connect to MongoDB');
        console.error(error);
        process.exit(0);
    }
})();

module.exports = client;