const { RTMClient } = require('@slack/rtm-api');
const { WebClient } = require('@slack/web-api');
const connectDB = require('./utils/connectDB');
const startExpressServer = require('./server/server');
const { shorten } = require('./controllers/urlController');
const {isValidURL} = require('./utils/isValidURL');

const rtm = new RTMClient(process.env.BOT_USER_OAUTH_TOKEN);
const web = new WebClient(process.env.BOT_USER_OAUTH_TOKEN);


const start = async () => {
    try {
        startExpressServer();
        await connectDB();
        rtm.start().then(() => {
            console.log("RTM started");
        }).catch(() => { console.log("Error", error) })

    } catch (error) {
        console.log(error);
    }
}
start();

rtm.on('ready', async () => {
    console.log("Bot got started!");
    sendMessage('#url-shortner-channel', "Hey I am url-shortener bot use me to simplify your urls.")
})

rtm.on('slack_event', async (eventType, event) => {
    if (event && event.type === 'message') {
        if (event.text.startsWith('!short')) {
            const matches = event.text.match(/<(.*?)\|.*?>/);
            const url = matches ? matches[1] : event.text.replace('!short', '').trim();
            if (isValidURL(url)) {
                shortURL(event.channel, url);
            } else {
                sendMessage(event.channel, "Invalid URL. Please provide a valid URL.");
            }
        }
    }
});

const shortURL = async (channelId, actual_url) => {
    const short_url = await shorten(actual_url);
    console.log(short_url);
    sendMessage(channelId, `Here is you short url : ${short_url}`);
}

const sendMessage = async (channel, message) => {
    const result = await web.chat.postMessage({ text: message, channel });
    console.log(result)
}