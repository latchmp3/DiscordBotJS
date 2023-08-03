const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("dripdrop")
        .setDescription("Replies with Drop Top."),
    async execute(interaction) {
        await interaction.reply("Drop Top.");
    },
};
