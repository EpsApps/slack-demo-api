import SlackUser from '../SlackUser';

async function importSlackUsers() {
    try {
        let response = JSON.parse(await SlackUser.getUsersFromSlack());
        let slackUser = new SlackUser();
        await slackUser.deleteMany();
        await slackUser.insertMany(response.members);
        console.log('imported users: ');
        console.log(await slackUser.findMany());
    } catch (e) {
        console.log(e);
    }
}

importSlackUsers();