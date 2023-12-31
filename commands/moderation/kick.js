const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("Select a member and kick them (test).")
		.addUserOption((option) => {
			return option
				.setName("user")
				.setDescription("member to kick")
				.setRequired(true);
		})
		.addStringOption((option) => {
			return option
				.setName("reason")
				.setDescription("Reason for kick")
				.setRequired(true);
		})
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
		.setDMPermission(false),
	async execute(interaction) {
		const user = interaction.options.getUser("user");
		const reason =
			interaction.options.getString("reason") ?? "No reason provided";

		const confirmBtn = new ButtonBuilder()
			.setCustomId("confirm")
			.setLabel("Kick User")
			.setStyle(ButtonStyle.Danger);
		const cancelBtn = new ButtonBuilder()
			.setCustomId("cancel")
			.setLabel("Cancel")
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder().addComponents(cancelBtn, confirmBtn);
		const response = await interaction.reply({
			content: `Are you sure you want to kick ${user.username} for ${reason}?`,
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
				await interaction.guild.members.kick(user);
				await confirmation.update({
					content: `${user.username} has been kicked for: ${reason}`,
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
