require('dotenv').config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key from the environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Use the correct model name (gemini-pro-1.0)
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const { MessageEmbed } = require('discord.js');


fetch("http://127.0.0.1:5001/get_data_prompt")
  .then(response => response.json())
  .then(data => {
    let dataPrompt = data.data_prompt;
    prompt = 'you are a discord bot assistant writing less then 2000 characters help to organize time for online mettings which are generally after 19:00 or offline mettings which are generally between 08:00 until 15:00, orginize based on these infos ' + dataPrompt +'. don.t forget to add emojis while writing please';    // Use dataPrompt here (now it's accessible)

    async function generateText() {
      try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        return text;
      } catch (error) {
        return "Error generating text:", error;
      }
    }


// Call the function to start the generation process
const { Client,Events,Discord,MessageEmbed,MessageActionRow, GatewayIntentBits, SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Component, Collector, messageLink, EmbedBuilder, setPosition } = require('discord.js');


const client =new Client({
    intents:[
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, 
]
});

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Define slash commands
    const commands = [
        new SlashCommandBuilder().setName('insta').setDescription('instagram time posting'),
        new SlashCommandBuilder().setName('meet').setDescription('best time for meet'),
        new SlashCommandBuilder().setName('help').setDescription('to get help'),
        new SlashCommandBuilder().setName('poll').setDescription('creat a poll').addStringOption(option =>
            option.setName('time1').setDescription('Time 1').setRequired(true)).addStringOption(option =>
                option.setName('time2').setDescription('Time 1').setRequired(true)).addStringOption(option =>
                    option.setName('time3').setDescription('Time 1')),

        new SlashCommandBuilder().setName('tag').setDescription('gnerate hashtags and captions').addStringOption(option =>
            option.setName('prompt').setDescription('prompt to generate caption and hashtags').setRequired(true))

    ];

    // Register slash commands
    try {
        const registeredCommands = await client.application.commands.set(commands);
        console.log('Successfully registered slash commands:', registeredCommands);
    } catch (error) {
        console.error('Failed to register slash commands:', error);
    }

});

client.on('interactionCreate', async interaction => {
    
    if (!interaction.isCommand()) return;
   
    const { commandName } = interaction;
  
  
    if (commandName === 'insta') {
        const firstButton_insta = new ButtonBuilder()
            .setLabel('time')
            .setStyle(ButtonStyle.Primary)
            .setEmoji({ name: '⏰' })
            .setCustomId('first-button-instagram')

         const Embed = new EmbedBuilder()
         .setColor('Green')
         .setTitle(`Welcome to the Instagram Assistant Bot! 📸 `)
         .setDescription(' /tag: Upon entering /tag followed by a prompt, users receive generated captions and hashtags based on the provided input. Content creators, marketers, and social media enthusiasts can leverage this command to enhance their online content effortlessly.\n time  find best time for posting .\n ')
        const buttonsRow_insta = new ActionRowBuilder().addComponents(firstButton_insta);

      await interaction.reply({ embeds: [Embed] ,components : [buttonsRow_insta]});

    
    }
    if (commandName === 'meet') {
        const firstButton = new ButtonBuilder()
            .setLabel('time')
            .setStyle(ButtonStyle.Primary)
            .setEmoji({ name: '⏰' })
            .setCustomId('first-button')
        
        
        const buttonsRow = new ActionRowBuilder().addComponents(firstButton,);

        const Embed_meet = new EmbedBuilder()
         .setColor('Green')
         .setTitle(`Effortless Scheduling: Unleashing the Potential of Meetings ! 🤝  `)
         .setDescription(' /meet: Invoking /meet enables users to obtain suggestions for the best time to schedule a meeting based on specified parameters. This feature facilitates seamless coordination of group activities, ensuring maximum participation and productivity.')
      await interaction.reply({ embeds: [Embed_meet], components: [buttonsRow] });
    }


   else if(commandName === 'help'){

        const Embed_help = new EmbedBuilder()
         .setColor('Green')
         .setTitle(`Welcome to help `)
         .setDescription(`Description:
         🤖📱🔧 This Discord bot serves as a comprehensive tool for managers to streamline their social media management tasks, optimize posting strategies, coordinate meetings efficiently, and enhance the effectiveness of their online presence.
         
         🕒 /insta: By typing /insta, users can access functionalities related to Instagram time posting. Whether scheduling posts, managing posting times, or performing other Instagram-related actions, this command simplifies social media management tasks.
         
         📅 /meet: Invoking /meet enables users to obtain suggestions for the best time to schedule a meeting based on specified parameters. This feature facilitates seamless coordination of group activities, ensuring maximum participation and productivity.
         
         ℹ️ /help: Typing /help provides users with guidance or instructions tailored to their needs. Whether navigating server features, resolving queries, or seeking assistance with commands, this command offers prompt and personalized support.
         
         📊 /poll: Users can initiate a poll by typing /poll and specifying multiple options. This interactive feature allows others to vote using reactions, facilitating collaborative decision-making processes within Discord servers.
         
         📝 /tag: Upon entering /tag followed by a prompt, users receive generated captions and hashtags based on the provided input. Content creators, marketers, and social media enthusiasts can leverage this command to enhance their online content effortlessly.`)

   await interaction.reply({ embeds: [Embed_help]});

    }
    else if (commandName === 'poll') {
      const a = interaction.options.get('time1').value;
      const b = interaction.options.get('time2').value;
      const c = interaction.options.get('time3') ? interaction.options.get('time3').value : null;
      
      let choices, emojis;
      
      if (c !== null) {
          choices = [a, b, c];
          emojis = ['1️⃣', '2️⃣', '3️⃣'];
      } else {
          choices = [a, b];
          emojis = ['1️⃣', '2️⃣'];
      }
      
      const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle('Poll Time!')
      .setDescription(`React with your choice!\n\n${choices.map((option, index) => `${emojis[index]}: ${option}`).join('\n')}`);
      await interaction.reply("@everyone " + "please vote ⬇️")

  const pollMessage = await interaction.channel.send({ embeds: [embed] });

  // React with emojis
  emojis.forEach(async (emoji) => {
      await pollMessage.react(emoji);
  });

  }


    else if (commandName === 'tag')
    { interaction.reply(" still generating")
       const description1 = interaction.options.get('prompt')
       console.log(description1.value);
       const description=description1.value;
       
        // Generate hashtags based on the provided description
        
        prompt2= 'You are a Discord bot assistant that give the best hashtags in instagram or linkedin to reach to as many people as possible based on the following information:'+description+' generate best hashtags.';
    
        const result2 = await model.generateContent(prompt2);
        const response2 = result2.response;
        text2 = response2.text();
        console.log(text2);
        captionPrompt = 'You are a creative genius tasked with generating a captivating caption for the provided information: '+description+' Add emojis to make it more engaging.remove the hashtags';
      
        const captionResult = await model.generateContent(captionPrompt);
        const captionResponse = captionResult.response;
        text = captionResponse.text();
        console.log(text);

       const maxLength = 800;
       text2 = text2.substring(0, maxLength);
       text = text.substring(0, maxLength);

    const Embed_meet = new EmbedBuilder()
         .setColor('Green')
         .setTitle(`GDG STAT`)
         .setDescription(`Generated hashtags: ${text2} \n \n Generated Caption is\n :${text}`)

         interaction.editReply({ embeds: [Embed_meet]});
               }
        

  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'first-button') {
        interaction.reply(" still generating")
        let text= await generateText();
        const Embed_help = new EmbedBuilder()
         .setColor('Green')
         .setTitle(`Best time for meeting is :`)
         .setDescription(text)

         interaction.editReply({ embeds: [Embed_help]}); 
           }
    
    else if(interaction.customId ==='first-button-instagram'){
        const now = new Date();
        interaction.reply(" still generating")

        time_for_posts = 'Monday: 5 AM, 11 AM, 12 PM, 1 PM. Tuesday: 7 AM, 8 AM, 9 AM, 10 AM. Wednesday: 5 AM, 6 AM, 9 AM, 10 AM, 11 AM. Thursday: 6 AM, 11 AM, 12 PM, 1 PM. Friday: 7 AM, 2 PM, 3 PM, 4 PM. Saturday: 6 AM, 8 AM, 9 AM, 10 AM. Sunday: 1 AM, 6 PM, 7 PM, 8 PM.'

prompt = 'you are a discord bot assistant help to alert /n'  +
'when curente time : '+ now +' is in '+ time_for_posts +
', Start your conversation with : ⏰ Alert Time to Post in Social media 😁:';

async function generateTextt() {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  } catch (error) {
    return "Error generating text:", error;
  }
}
let text= await generateTextt();

        const Embed_help = new EmbedBuilder()
         .setColor('Green')
         .setTitle('GDG STAT')
         .setDescription(text)
         interaction.editReply({ embeds: [Embed_help]});   
         }
   });



client.login(process.env.TOKEN);


});

