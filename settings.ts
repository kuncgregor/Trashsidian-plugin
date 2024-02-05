import Trashplugin from "main";
import { App, Notice, PluginSettingTab, Setting } from "obsidian";

export class TrashSettings extends PluginSettingTab {
	plugin: Trashplugin;
	constructor(app: App, plugin: Trashplugin) {
		super(app, plugin);

		this.plugin = plugin;
	}
	display() {
		let { containerEl } = this;

		containerEl.createEl("h1", { text: "Traash settings" });

		new Setting(containerEl)
			.setName("File extenšon")
			.setDesc("Izberi kakšne fajle boš sortiral")
			.addText((item) => {
				item.setValue(this.plugin.settings.FileExtension).onChange(
					(value) => {
						this.plugin.settings.FileExtension = value;
						this.plugin.saveSettings();
					}
				);
			});

		new Setting(containerEl)
			.setName("File destination")
			.setDesc("Izberi ime mape, katero boš sortiral")
			.addText((item) => {
				item.setValue(this.plugin.settings.NameFolder).onChange(
					(value) => {
						this.plugin.settings.NameFolder = value;
						this.plugin.saveSettings();
					}
				);
			});
	}
}