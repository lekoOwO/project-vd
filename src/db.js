const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = require("../config.json")

const COLLECTION = {
    STATUS: "status",
    UPLOADED: "uploaded",
    IP_STATUS: "ipStatus"
}
const URL = config.db.url;
const DB_NAME = config.db.name;

var client, db;

const init = (async function () {
    client = await MongoClient.connect(URL, {useUnifiedTopology: true});
    db = client.db(DB_NAME);
})()

async function insertStatus(status) {
    await init;
    const collection = db.collection(COLLECTION.STATUS);

    const result = await collection.insertOne(status)
    return result.insertedId;
}

async function getStatus() {
    await init;
    const collection = db.collection(COLLECTION.STATUS);

    const options = {
        sort: { _id: -1 },
        limit: 1,
    };

    const status = await collection.findOne({}, options);
    return status
}

async function insertUploaded(uploaded) {
    await init;

    const collection = db.collection(COLLECTION.UPLOADED);

    const result = await collection.insertOne(uploaded)
    return result.insertedId;
}

async function getUploaded(limit = 10) {
    await init;
    const collection = db.collection(COLLECTION.UPLOADED);

    const options = {
        sort: { _id: -1 },
        limit,
    };

    const status = await collection.find({}, options);
    return new Promise((resolve, reject) => {
        status.toArray((err, arr) => {
            if (err) reject(err)
            else resolve(arr)
        })
    })
}

async function deleteUploaded(id) {
    await init;

    const collection = db.collection(COLLECTION.UPLOADED);
    return new Promise((resolve, reject) => {
        collection.deleteOne({_id: new mongodb.ObjectID(id)}, function(err, results){
            if (err) return reject(err)
            resolve()
        })
    })
}

async function insertIPStatus(status) {
    await init;
    const collection = db.collection(COLLECTION.IP_STATUS);

    const result = await collection.insertOne(status)
    return result.insertedId;
}

async function getIPStatus() {
    await init;
    const collection = db.collection(COLLECTION.IP_STATUS);

    const options = {
        sort: { _id: -1 },
        limit: 1,
    };

    const status = await collection.findOne({}, options);
    return status
}


module.exports = {
    insertStatus,
    getStatus,
    insertUploaded,
    getUploaded,
    insertIPStatus,
    getIPStatus
}