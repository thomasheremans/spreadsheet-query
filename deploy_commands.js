const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { clientId, guildId, token } = require("./config.json");

//Deploys discord slash commands
const commands = [
  new SlashCommandBuilder()
    .setName('info')
    .setDescription("Retrieves cluster info")
    .addStringOption((option) =>
    option.setName("cluster").setDescription("Cluster Name").setRequired(true)),
  new SlashCommandBuilder()
    .setName('cluster')
    .setDescription("Retrieves cluster name based on your discord name"),
  new SlashCommandBuilder()
    .setName('all_clusters')
    .setDescription("Lists all cluster names")
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch((err) => {
    console.log("problem");
    console.error(err);
  });
