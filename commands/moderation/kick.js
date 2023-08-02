const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Select a member and kick them (test).")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("member to kick")
                .setRequired(true)
        ),
    async execute(interaction) {
        const member = interaction.options.getMember("target");
        return interaction.reply({
            content: `You wanted to kick: ${member.user.username}`,
            ephemeral: true,
        });
    },
};
