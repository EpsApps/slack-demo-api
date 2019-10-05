import { MongoClient } from 'mongodb';
import { INTERAL_SERVER_ERROR } from './error';

export default class MongoDBObject {

    url = 'mongodb://localhost:27017';
    dbName = 'workos-demo';
    /**
     * set the collection name
     * @override
     */
    collection = 'documents';

    insertMany(objects) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, (error, client) => {
                if (error) {
                    client.close();
                    reject({ error: INTERAL_SERVER_ERROR });
                }
                const db = client.db(this.dbName);
                const collection = db.collection(this.collection);
                collection.insertMany(objects, (error, result) => {
                    if (error) {
                        client.close();
                        reject({ error: INTERAL_SERVER_ERROR });
                    } else {
                        client.close();
                        resolve(result);
                    }
                });
            });
        });
    }

    insertOne(object) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, (error, client) => {
                if (error) {
                    client.close();
                    reject({ error: INTERAL_SERVER_ERROR });
                }
                const db = client.db(this.dbName);
                const collection = db.collection(this.collection);
                collection.insertOne(object, (error, result) => {
                    if (error) {
                        client.close();
                        reject({ error: INTERAL_SERVER_ERROR });
                    } else {
                        client.close();
                        resolve(result);
                    }
                });
            });
        });
    }

    findOne(query = {}) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, (error, client) => {
                if (error) {
                    client.close();
                    reject({ error: INTERAL_SERVER_ERROR });
                }
                const db = client.db(this.dbName);
                const collection = db.collection(this.collection);

                collection.findOne(query).toArray( (error, objects) => {
                    if (error) {
                        client.close();
                        reject({ error: INTERAL_SERVER_ERROR });
                    } else {
                        client.close();
                        resolve(objects);
                    }
                });
            });
        });
    }

    findMany(query = {}) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, (error, client) => {
                if (error) {
                    client.close();
                    reject({ error: INTERAL_SERVER_ERROR });
                }
                const db = client.db(this.dbName);
                const collection = db.collection(this.collection);
                collection.find(query).toArray( (error, objects) => {
                    if (error) {
                        client.close();
                        reject({ error: INTERAL_SERVER_ERROR });
                    } else {
                        client.close();
                        resolve(objects);
                    }
                });
            });
        });
    }

    updateOne(query = {}, object = {}) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, (error, client) => {
                if (error) {
                    client.close();
                    reject({ error: INTERAL_SERVER_ERROR });
                }
                const db = client.db(this.dbName);
                const collection = db.collection(this.collection);
                collection.updateOne(query, object, (error, result) => {
                    if (error) {
                        client.close();
                        reject({ error: INTERAL_SERVER_ERROR });
                    } else {
                        client.close();
                        resolve(result);
                    }
                });
            });
        });
    }

    deleteMany(query = {}) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, (error, client) => {
                if (error) {
                    client.close();
                    reject({ error: INTERAL_SERVER_ERROR });
                }
                const db = client.db(this.dbName);
                const collection = db.collection(this.collection);
                collection.deleteMany(query, (error, result) => {
                    if (error) {
                        client.close();
                        reject({ error: INTERAL_SERVER_ERROR });
                    } else {
                        client.close();
                        resolve(result);
                    }
                });
            });
        });
    }

}