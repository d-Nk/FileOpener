'use strict';

import {window, workspace, Range, commands} from 'vscode';

export function execute()
{
    let word = _getCurrentWord();
    if(word === ""){return;}

    _getFilePathOnWorkSpace(word);
}

function _getCurrentWord():string
{
    let editor = window.activeTextEditor;
    if(!editor){return "";}
    
    let doc = editor.document;

    let wordRange : Range | undefined;
    if(editor.selection.isEmpty)
    {
        wordRange = doc.getWordRangeAtPosition(editor.selection.start);
    }
    else
    {
        wordRange = new Range(editor.selection.start, editor.selection.end);
    }

    return doc.getText(wordRange);
}

function _getFilePathOnWorkSpace(word : string)
{
    const config = workspace.getConfiguration("fileopener");
    const extentions = config.get("extentionFileSearch");
    if(extentions === undefined){return;}
    if(!Array.isArray(extentions)){return;}

    let flg = false;
    let files = workspace.findFiles(`**/${word}.*`);
    files.then((uris)=>
    {
        if(flg){return;}
        if(uris.length === 0)
        {
            window.showWarningMessage("There are not: " + word);
            return;
        }
        
        extentions.forEach(extention => {
            if(flg){return;}
            let uri = uris.find(u => u.path.toLowerCase().endsWith(extention.toLowerCase()));
            if(uri === undefined )
            {
                return;
            }
            flg = true;
            // Open
            let success = commands.executeCommand('vscode.open', uri);
        });
        if(!flg)
        {
            window.showWarningMessage("There are not: " + word);
            return;
        }
    });
    return;
    
}