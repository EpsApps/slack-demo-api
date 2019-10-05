import * as config from './config';

export default class SlackAPI {

    static async tokenIsValid(body) {
        if (body.token && body.token === config.SLACK_TOKEN) {
            return true;
        } else {
            return false;
        }
    }

}