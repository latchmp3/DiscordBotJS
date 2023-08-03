const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Select a member and ban them.")
		.addUserOption((option) => {
			return option
				.setName("user")
				.setDescription("member to ban")
				.setRequired(true);
		})
		.addStringOption((option) => {
			return option
				.setName("reason")
				.setDescription("Reason for ban")
				.setRequired(true);
		})
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
	async execute(interaction) {
		const user = interaction.options.getUser("user");
		const reason =
			interaction.options.getString("reason") ?? "No reason provided";

		const confirmBtn = new ButtonBuilder()
			.setCustomId("confirm")
			.setLabel("Ban User")
			.setStyle(ButtonStyle.Danger);
		const cancelBtn = new ButtonBuilder()
			.setCustomId("cancel")
			.setLabel("Cancel")
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder().addComponents(cancelBtn, confirmBtn);
		const response = await interaction.reply({
			content: `Are you sure you want to ban ${user.username} for ${reason}?`,
			components: [row],
		});

		// only user who triggered interaction can use buttons
		const collectorFilter = (i) => i.user.id === interaction.user.id;
		
		try {
			const confirmation = await response.awaitMessageComponent({
				filter: collectorFilter,
				time: 60000,
			});

			if (confirmation.customId === "confirm") {
				await interaction.guild.members.ban(user);
				await confirmation.update({
					content: `${user.username} has been banned for: ${reason}`,
					components: [],
				});
			} else if (confirmation.customId === "cancel") {
				await confirmation.update({
					content: "Action cancelled",
					components: [],
				});
			}
		} catch (e) {
			await interaction.update({
				content: "Confirmation timed out. cancelling",
				components: [],
			});
		}
	},
};
