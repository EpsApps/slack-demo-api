import request from 'request';
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

}