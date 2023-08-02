const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dripdrop")
        .setDescription("Replies with Drop Top."),
    async execute(interactiom) {
        await interactiom.reply("Drop Top.");
    },
};
