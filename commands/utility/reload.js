const { SlashCommandBuilder } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("reload")
		.setDescription("Reloads a command.")
		.addStringOption((option) =>
			option
				.setName("command")
				.setDescription("The command to reload.")
				.setRequired(true)
		),
	async execute(interaction) {
		// check if command exists
		const commandName = interaction.options
			.getString("command", true)
			.toLowerCase();
		const command = interaction.client.commands.get(commandName);

		const foldersPath = path.join("./", "commands");
		const commandsFolders = fs.readdirSync(foldersPath);
		let commandSubFolder = "";
		for (const folder of commandsFolders) {
			const commandsPath = path.join(foldersPath, folder);
			fs.readdirSync(commandsPath).filter((file) => {
				if (file.includes(commandName)) {
					commandSubFolder = folder;
				}
			});
		}

		console.log("command name: " + commandName);
		console.log("command: " + JSON.stringify(command));
		console.log("subfolder: " + commandSubFolder);

		if (!command) {
			return interaction.reply(`${commandName} does not exist.`);
		}

		delete require.cache[
			require.resolve(`../${commandSubFolder}/${command.data.name}.js`)
		];

		try {
			interaction.client.commands.delete(command.data.name);
			const newCommand = require(`../${commandSubFolder}/${command.data.name}.js`);
			interaction.client.commands.set(newCommand.data.name, newCommand);
			await interaction.reply(
				`Command \`${newCommand.data.name}\` was reloaded successfully.`
			);
		} catch (error) {
			console.error(error);
			await interaction.reply(
				`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``
			);
		}
	},
};
