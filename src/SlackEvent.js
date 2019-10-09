import SlackUser from './SlackUser';
import SlackChannel from './SlackChannel';

const EVENT_TYPE_USER_CHANGE = 'user_change';
const EVENT_TYPE_TEAM_JOIN = 'team_join';
const EVENT_TYPE_MEMBER_JOINED_CHANNEL = 'member_joined_channel';
const EVENT_TYPE_MEMBER_LEFT_CHANNEL = 'member_left_channel';
const EVENT_TYPE_CHANNEL_CREATED = 'channel_created';

export default class SlackEvent {

    /**
     * returns parameters to authenticate the server with Slack
     * @param {*} body 
     */
    static getAuthentificationParams(body) {
        if (body.challenge) {
            return {
                challenge: body.challenge
            };
        }
        return null;
    }

    static async ingestEvent(body) {
        let event = body.event;
        let slackUser = new SlackUser();
        let slackChannel = new SlackChannel();
        switch (event.type) {
            case EVENT_TYPE_USER_CHANGE:
                return await slackUser.updateOne({ id: { $eq: event.user.id } }, { $set: event.user });
            case EVENT_TYPE_TEAM_JOIN:
                return await slackUser.insertOne(event.user);
            case EVENT_TYPE_MEMBER_JOINED_CHANNEL:
                return await slackUser.findOneAndUpdate({ id: { $eq: event.user } }, { $push: { channels: event.channel } });
            case EVENT_TYPE_MEMBER_LEFT_CHANNEL:
                return await slackUser.findOneAndUpdate({ id: { $eq: event.user } }, { $pull: { channels: event.channel } });  
            case EVENT_TYPE_CHANNEL_CREATED:
                return await slackChannel.insertOne(event.channel);
        }
    }

}