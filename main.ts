import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	TFile,
} from "obsidian";
import { TrashSettings } from "settings";
let settingsknof;
let test;
interface TrashsidaianPluginSetting {
	NameFolder: string;
	FileExtension: string;
}

const DEFAULT_SETTINGS: Partial<TrashsidaianPluginSetting> = {
	NameFolder: "PDFs",
	FileExtension: ".pdf",
};

export default class Trashplugin extends Plugin {
	settings: TrashsidaianPluginSetting;

	async onload() {
		await this.loadSettings();
		settingsknof = false;

		this.addCommand({
			id: "menjan tebe",
			name: "TabSwitcher",
			checkCallback: (checking: boolean) => {
				const leaf = this.app.workspace.activeLeaf;
				if (leaf) {
					if (!checking) {
						const leafs =
							this.app.workspace.getLeavesOfType("markdown");
						const index = leafs.indexOf(leaf);
						if (index == leafs.length - 1) {
							this.app.workspace.setActiveLeaf(leafs[0]);
						} else {
							this.app.workspace.setActiveLeaf(leafs[index + 1]);
						}
					}
					return true;
				}
				return false;
			},
		});

		this.addCommand({
			id: "znaki",
			name: "označvanje",
			editorCallback: (editor, view) => {
				const value = editor
					.getValue()
					.replace(/^\#(.*)$/gm, (match) => match + "BRUUH");

				editor.setValue(value);
			},
		});

		this.addRibbonIcon("beer", "žeja", () => {
			//new Notice("Sem sortiral Na zdravje!");
			const trezor = this.app.vault.getFiles();
			if (trezor != null) {
				this.movePdfFiles();
			}
		});

		if (settingsknof) {
			console.log("settings knof je gor");
		} else {
			this.addSettingTab(new TrashSettings(this.app, this));
			settingsknof = true;
			console.log("bruuh");
		}
	}
	async movePdfFiles() {
		const FolderName = this.settings.NameFolder;
		const fajli = this.app.vault.getFiles();
		const Files = fajli.filter((file) =>
			file.path.endsWith(this.settings.FileExtension)
		);
		console.log(Files.length);
		if (Files.length <= 0) {
			console.error(`Files '${Files}' not found.`);
			new Notice("ni nastavljenga fileextentiona");
			return;
		}
		const destinationFolderPath =
			this.app.vault.getAbstractFileByPath(FolderName)?.path;
		if (!destinationFolderPath) {
			console.error(`Folder '${FolderName}' not found.`);
			new Notice("ni nastavljenga folderja");
			return;
		}
		for (const filename of Files) {
			await this.app.vault.rename(
				filename,
				`${destinationFolderPath}/${filename.name}`
			);
		}
		console.log(Files);
	}

	onunload() {
		console.log("unloading plugin");
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
