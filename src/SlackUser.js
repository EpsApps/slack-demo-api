import request from 'request';
import { MongoClient } from 'mongodb';
import * as config from './config';
import { INTERAL_SERVER_ERROR } from './error';
import MongoDBObject from './MongoDBObject';


export default class SlackUser extends MongoDBObject {

    collection = 'slack-users';

    /**
     * @todo add functionality to query all users if initial payload returns only a subset of users
     */
    static getUsersFromSlack() {
        return new Promise((resolve, reject) => {
            request.get('https://slack.com/api/users.list', {
                auth: {
                    bearer: config.SLACK_BEARER_TOKEN
                }
            }, (error, response, body) => {
                if (error) {
                    reject({ error: INTERAL_SERVER_ERROR });
                } else {
                    resolve(body);
                }
            });
        });
    }

    aggregateWithChannels() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, (error, client) => {
                if (error) {
                    client.close();
                    reject({ error: INTERAL_SERVER_ERROR });
                }
                const db = client.db(this.dbName);
                const collection = db.collection(this.collection);
                collection.aggregate([
                    {
                        $unwind: {
                            path: '$channels',
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup:
                        {
                            from: 'slack-channels',
                            localField: 'channels',
                            foreignField: 'id',
                            as: 'channelData',
                        }
                    },
                    {
                        $sort: { 'channelData.name': 1 }
                    },
                    {
                        $unwind: {
                            path: '$channelData',
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $group:
                        {
                            _id: '$_id',
                            id: { $first: '$id' },
                            name: { $first: '$name' },
                            real_name: { $first: '$real_name' },
                            tz: { $first: '$tz' },
                            profile: { $first: '$profile' },
                            channels: { $addToSet: '$channelData' },
                        }
                    },
                    {
                        $sort: { 'name': 1 }
                    }
                    
                ]).toArray((error, objects) => {
                    if (error) {
                        client.close();
                        console.log(error);
                        reject({ error: INTERAL_SERVER_ERROR });
                    } else {
                        client.close();
                        resolve(objects);
                    }
                });
            });
        });
    }


}