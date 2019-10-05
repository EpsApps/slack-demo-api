import SlackAPI from './SlackAPI';
import SlackEvent from './SlackEvent';
import * as ERROR from './error';

export default class SlackEventController {

    static async ingestEvent(request, response) {
        try {
            if (!request || !request.body) {
                response.status(400).json({ error: ERROR.INTERNAL_SERVER_ERROR });
                return;
            }
            let body = request.body;
            if (!SlackAPI.tokenIsValid(body)) {
                response.status(400).json({ error: ERROR.INVALID_TOKEN });
                return;
            }
            let authentificationParams = SlackEvent.getAuthentificationParams(body);
            if (authentificationParams) {
                response.status(200).json(authentificationParams);
                return;
            }
            let ingestionResult = await SlackEvent.ingestEvent(body);
            if (ingestionResult && !ingestionResult.error) {
                response.status(200).json({ success: true });
                return;
            } else {
                response.status(400).json({ error: ingestionResult.error });
                return;
            }
        } catch (e) {
            response.status(400);
        }
    }

}