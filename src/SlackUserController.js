import SlackUser from './SlackUser';

export default class SlackUserController {

    static async findAll(request, response) {
        let slackUser = new SlackUser();
        let result = await slackUser.findMany();
        if (result && !result.error) {
            response.status(200).json(result);
        } else {
            response.status(400).json({ error: result.error });
        }
    }

}