require('dotenv').config();
const { GatewayIntentBits, Client} = require('discord.js');
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences],
});





const axios = require('axios');

function activeMembersCounter(c) {
    const guild = c.guilds.cache.get('1205319052021469204');
    let onlineMembers = 0;

    // Loop through each member and check if they are online
    guild.members.cache.forEach(member => {
        if (member.presence?.status === 'online' && !member.user.bot) {
            onlineMembers++;
        }
    });

    // Make HTTP request to add activity
    axios.post('http://localhost:5000/users/', { nb_active: onlineMembers })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

client.once('ready', () => {
    activeMembersCounter(client);
    setInterval(() => {
        activeMembersCounter(client);
    }, 3000);
});


client.login(process.env.TOKEN);
