import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import SlackEventController from '../SlackEventController';
import SlackUserController from '../SlackUserController';
import SlackChannelController from '../SlackChannelController';

function server() {

    let app = express();
    app.use(cors())

    let port = process.env.PORT || 8081;

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.post('/slack/event', SlackEventController.ingestEvent);
    app.get('/slack/user', SlackUserController.findAll);
    app.get('/slack/channel', SlackChannelController.findAll);

    app.listen(port, () => console.log(`Server is listening on port: ${port}`));

}

server();