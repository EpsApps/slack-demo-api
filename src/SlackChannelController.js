import SlackChannel from './SlackChannel';

export default class SlackChannelController {

    static async findAll(request, response) {
        let slackChannel = new SlackChannel();
        let result = await slackChannel.findMany();
        if (result && !result.error) {
            response.status(200).json(result);
        } else {
            response.status(400).json({ error: result.error });
        }
    }

}