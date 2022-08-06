// Require the necessary classes
const { Client, GatewayIntentBits } = require('discord.js');
const {guildId, token, spreadsheetid} = require("./config.json");
const { google } = require("googleapis");

// Create a new Discord client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages ] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

//Retrieves data based on team name
findData();
async function findData() {
    // Auth with Google Cloud
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    
    // Create googleclient instance for auth
    const googleclient = await auth.getClient();
    
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: googleclient });

    //Reply to command
    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;
        
        const { commandName } = interaction;
    
        if (commandName === 'info') {

            //Get command input
            const input = interaction.options.get("cluster").value;

            //Read data from spreadsheet
            const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId: spreadsheetid,
            range: "Teams!A:E"
            });

            //Store Data
            const data = getRows.data.values

            //Find index of user-submitted cluster name
            const firstCol = (arr, n) => arr.map(x => x[n]);
            const index = firstCol(data,0).indexOf(input)

            //Error if cluster not found
            if (index == -1) {
                await interaction.reply("Not found :confused:");
            } else {

                //Save cluster info
                const captain = data[index][1]
                const members = data[index][2]
                const status = data[index][3]
                const monitoringToken = data[index][4]
                
                //Reply
                await interaction.reply("**Captain: **"+captain+"\n**Members: **"+members+"\n**Status: **"+status+"\n**Monitoring Token: **"+monitoringToken);
            }
        }

        if (commandName === 'cluster') {
            //Read data from spreadsheet
            const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId: spreadsheetid,
            range: "Individuals!A:B"
            });

            //Store data
            const data = getRows.data.values

            //Find index of corresponding team
            const firstCol = (arr, n) => arr.map(x => x[n]);
            const index = firstCol(data,0).indexOf(interaction.user.username+"#"+interaction.user.discriminator)

            //Error if user not found
            if (index == -1) {
                await interaction.reply("Not found :confused:");
            } else {
                //Save info
                const name = data[index][1]
                const captain = data[index][2]

                //Reply
                await interaction.reply("**Cluster Name: **"+name);
            }
        }

        if (commandName === 'all_clusters') {

            //Read data from spreadsheet
            const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId: spreadsheetid,
            range: "Teams!A2:A"
            });

            //Store data
            const data = getRows.data.values
            console.log(data)

            //Create list of all clusters
            var clusters = "**All cluster names:**"
            for (i in data) {
                clusters = clusters+"\n"+data[i] 
            }
            
            //Reply
            await interaction.reply(clusters);
        }

    });
}

// Login to Discord with your client's token
client.login(token);