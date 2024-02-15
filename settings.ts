import Trashplugin from "main";
import { App, Notice, PluginSettingTab, Setting } from "obsidian";
let loaded = false;
export class TrashSettings extends PluginSettingTab {
	plugin: Trashplugin;

	constructor(app: App, plugin: Trashplugin) {
		super(app, plugin);

		this.plugin = plugin;
	}
	async display() {
		let { containerEl } = this;

		if (loaded == false) {
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
					item.setValue(this.plugin.settings.NameFileFolder).onChange(
						(value) => {
							this.plugin.settings.NameFileFolder = value;
							this.plugin.saveSettings();
						}
					);
				});
			new Setting(containerEl)
				.setName("Note File name")
				.setDesc("Izberi začetno ime Note fijlou za sortirati")
				.addText((item) => {
					item.setValue(this.plugin.settings.FilePrefix).onChange(
						(value) => {
							this.plugin.settings.FilePrefix = value;
							this.plugin.saveSettings();
						}
					);
				});
			new Setting(containerEl)
				.setName("Note File destination")
				.setDesc("Izberi destinacijo note fajlou")
				.addText((item) => {
					item.setValue(this.plugin.settings.NameNoteFolder).onChange(
						(value) => {
							this.plugin.settings.NameNoteFolder = value;
							this.plugin.saveSettings();
						}
					);
				});
			loaded = true;
		}
	}
}
// async function display(): boolean {
// 	let { containerEl } = this;

// 	containerEl.createEl("h1", { text: "Traash settings" });

// 	new Setting(containerEl)
// 		.setName("File extenšon")
// 		.setDesc("Izberi kakšne fajle boš sortiral")
// 		.addText((item) => {
// 			item.setValue(this.plugin.settings.FileExtension).onChange(
// 				(value) => {
// 					this.plugin.settings.FileExtension = value;
// 					this.plugin.saveSettings();
// 				}
// 			);
// 		});

// 	new Setting(containerEl)
// 		.setName("File destination")
// 		.setDesc("Izberi ime mape, katero boš sortiral")
// 		.addText((item) => {
// 			item.setValue(this.plugin.settings.NameFolder).onChange((value) => {
// 				this.plugin.settings.NameFolder = value;
// 				this.plugin.saveSettings();
// 			});
// 		});
// 	return true;
//}
