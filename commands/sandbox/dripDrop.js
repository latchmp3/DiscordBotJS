const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	cooldown: 3,
	data: new SlashCommandBuilder()
		.setName("dripdrop")
		.setDescription("Replies with Drop Top."),
	async execute(interaction) {
		await interaction.reply("Drop");
		await wait(1000);
		await interaction.followUp("Top.");
	},
};
