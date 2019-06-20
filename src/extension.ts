'use strict';

import * as vscode from 'vscode';
import * as fileOpener from './fileOpener';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand("fileopener.openFile", () => {
		fileOpener.execute();
		});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
