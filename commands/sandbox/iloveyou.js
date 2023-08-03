const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder().setName("iloveyou").setDescription("???"),
	async execute(interaction) {
		await interaction.reply("I love you too :)");
		await wait(1000);
		await interaction.editReply("I love YouTube* :)");
	},
};
