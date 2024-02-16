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
import * as fileSystem from "fs";
import { TrashSettings } from "settings";
import { mkdir, stat } from "fs";
let settingsknof;
let test;
interface TrashsidaianPluginSetting {
	NameFileFolder: string;
	FileExtension: string;
	NameNoteFolder: string;
	FilePrefix: string;
}

const DEFAULT_SETTINGS: Partial<TrashsidaianPluginSetting> = {
	NameFileFolder: "PDFs",
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

		this.addRibbonIcon("beer", "žeja", () => {
			//new Notice("Sem sortiral Na zdravje!");
			const trezor = this.app.vault.getFiles();
			if (trezor != null) {
				this.moveFiles();
				this.moveNoteFiles();
			} else {
				new Notice("Prazen volt");
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

	async moveNoteFiles() {
		const FolderName = this.settings.NameNoteFolder;
		const fajli = this.app.vault.getFiles();
		const Files = fajli.filter((file) =>
			file.path.startsWith(this.settings.FilePrefix)
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
		} else {
			new Notice("Sem sortiral Na zdravje!");
		}
		for (const filename of Files) {
			await this.app.vault.rename(
				filename,
				`${destinationFolderPath}/${filename.name}`
			);
		}
		console.log(Files);
	}
	async moveFiles() {
		const FolderName = this.settings.NameFileFolder;
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
			// new Notice("ni nastavljenga folderja");
			// return;
			this.createFolder(FolderName);
		} else {
			new Notice("Sem sortiral Na zdravje!");
		}
		for (const filename of Files) {
			await this.app.vault.rename(
				filename,
				`${destinationFolderPath}/${filename.name}`
			);
		}
		console.log(Files);
	}

	createFolder(folderPath: string): void {
		stat(folderPath, (err, stats) => {
			if (err) {
				if (err.code === "ENOENT") {
					mkdir(folderPath, { recursive: true }, (err) => {
						if (err) {
							console.error(`Error creating folder: ${err}`);
						} else {
							console.log(
								`Folder "${folderPath}" created successfully.`
							);
						}
					});
				} else {
					console.error(`Error checking folder existence: ${err}`);
				}
			} else {
				console.log(`Folder "${folderPath}" already exists.`);
			}
		});
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
