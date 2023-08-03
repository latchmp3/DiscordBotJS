const { SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("echo")
		.setDescription("Replies with your input.")
		.addStringOption((option) => {
			return option
				.setName("input")
				.setDescription("Input to echo back")
				// formatting for optional embed descriptions
				.setMaxLength(2000);
		})
		.addChannelOption((option) => {
			return option
				.setName("channel")
				.setDescription("Channel to echo into")
				// display server channels
				.addChannelTypes(ChannelType.GuildText);
		})
		.addBooleanOption((option) => {
			return option.setName("embed").setDescription("Embed echo?");
		}),
};
