import SlackUser from './SlackUser';

export default class SlackUserController {

    static async findAll(request, response) {
        let slackUser = new SlackUser();
        let userResult = await slackUser.aggregateWithChannels();
        if (userResult && !userResult.error) {
            response.status(200).json(userResult);
        } else {
            response.status(400).json({ error: userResult.error });
        }
    }

}