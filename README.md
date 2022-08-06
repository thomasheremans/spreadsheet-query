## Discord Bot that retrieves cluster info for Athena Public Members

1. `/all_clusters` lists all clusters which have submitted valid deposit files
2. `/cluster` list the name of the cluster of the command submitter
3. `/info <CLUSTER NAME>` list info for that cluster (captain, members, status link and monitoring token)

## Steps:

1. Create a `config.json` file with the following command:

```bash
cp config.sample.json config.json
```

2. Edit the `config.json` by inserting your 
    1. `clientId`: APPLICATION_CLIENT_ID present in the specific application in https://discord.com/developers/applications.
    2. `guildId`: DISCORD_SERVER_ID (right-click on server icon with developer mode activated)
    3. `token`: APPLICATION_BOT_TOKEN is generated on the discord developer portal for the bot.
    4. `spreadsheetid`: GOOGLE_SPREADSHEET_ID is contained in the url of your target google spreadsheet

3. Permissions are generated on developer portal, OAuth2 inside Settings. Mark `bot` and `applications.commands`.

4. Download a `credentials.json` file from Google Cloud Console
    1. Create a new project
    2. Enable APIs and Services > Search for and Install Google Sheets
    3. Credentials > New Service Account > copy the generated email address
    4. Share your spreadsheet with the email address generated
    5. Go back to your Service Account > Keys > Add Keys and Download JSON
    6. Place downloaded JSON in this repository

## How to Run:
# First time only
1. Rune `npm i` to install the dependencies 
2. Run `node deploy_commands.js` to sync the bot with you discord server, which is specified by `guildId`.
# Each time before running the discord commands
1. Run `node index.js`.